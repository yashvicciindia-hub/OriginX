import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise RuntimeError("API Key is missing")

BASE_DIR = Path(__file__).resolve().parent

KNOWLEDGE_FILE = BASE_DIR / "knowledge.txt"

CHROMA_DIR = BASE_DIR / "chroma_db"

def load_knowledge():
    if not KNOWLEDGE_FILE.exists():
        raise FileNotFoundError(
            f"File not found {KNOWLEDGE_FILE}"
        )
    text = KNOWLEDGE_FILE.read_text( encoding= "utf-8")

    return text



def create_documents(): 
    knowledge = load_knowledge() 
    document = Document( page_content=knowledge, metadata={ "source": "OriginX Knowledge Base" } )


    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500, 
        chunk_overlap=50, 
        separators=[ "\n\n", "\n", ". ", " ", "" ]
    )

    documents = text_splitter.split_documents([document])

    return documents


embeddings = GoogleGenerativeAIEmbeddings(
    model = "gemini-embedding-001",
    google_api_key=GOOGLE_API_KEY
)


def get_vectorstore():

    documents = create_documents()

    vectorstore = Chroma(
        collection_name="originx_knowledge",
        embedding_function=embeddings,
        persist_directory=str(CHROMA_DIR)
    )
    
    existing = vectorstore.get()

    if not existing["ids"]:

        vectorstore.add_documents(
            documents
        )

    return vectorstore


vectorstore = get_vectorstore()


retriever = vectorstore.as_retriever(
    search_kwargs={
        "k": 4
    }
)

llm = ChatGoogleGenerativeAI(
    model= os.getenv(
        "GEMINI_MODEL",
        "gemini-2.5-flash"
    ),

    temperature=0.2,

    google_api_key=GOOGLE_API_KEY
)



prompt = ChatPromptTemplate.from_messages([

    (
        "system",
        """
You are the official OriginX Trust Assistant.

OriginX is India's product trust and traceability
infrastructure.

Your role is to help users understand OriginX,
product traceability, authenticity, digital product
passports, compliance, QR verification,
supply-chain transparency and related OriginX
capabilities.

IMPORTANT RULES:

1. Use ONLY the provided OriginX context.

2. Never invent product information.

3. Never invent batch IDs.

4. Never claim a product is verified unless the
   provided context explicitly contains that
   verification information.

5. Never invent certifications.

6. Never invent manufacturing locations.

7. Never invent compliance credentials.

8. Never invent sustainability claims.

9. If the context does not contain enough
   information, say:

   "I don't have enough verified OriginX
   information to answer that."

10. Clearly distinguish between capabilities that
    OriginX is designed to support and information
    that is actually available.

11. Keep answers concise and premium.

12. Do not call yourself ChatGPT.

13. You represent OriginX.

14. When appropriate, use short bullet points.

ORIGINX CONTEXT:

{context}
"""
    ),

    (
        "human",
        "{question}"
    )

])




def ask_originx(question: str):

    question = question.strip()

    if not question:

        return "Please enter a question about OriginX."


    documents = retriever.invoke(
        question
    )


    if not documents:

        return (
            "I don't have enough verified OriginX "
            "information to answer that."
        )


    context = "\n\n".join(
        document.page_content
        for document in documents
    )


 

    formatted_prompt = prompt.format_messages(
        context=context,
        question=question
    )


    response = llm.invoke(
        formatted_prompt
    )


    return response.content
    