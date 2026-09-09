from fastapi import FastAPI, HTTPException

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field

from chatbot import ask_originx


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="OriginX Trust Intelligence API",
    description="AI assistant backend for OriginX",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000",

        # Your deployed OriginX website
        "https://origin-x-c56f.vercel.app/"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# REQUEST MODEL
# =========================================================

class ChatRequest(BaseModel):

    message: str = Field(
        ...,
        min_length=1,
        max_length=2000
    )


# =========================================================
# RESPONSE MODEL
# =========================================================

class ChatResponse(BaseModel):

    answer: str


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/")
async def root():

    return {
        "status": "ok",
        "service": "OriginX Trust Intelligence",
        "version": "1.0.0"
    }


# =========================================================
# CHAT ENDPOINT
# =========================================================

@app.post(
    "/chat",
    response_model=ChatResponse
)
async def chat(request: ChatRequest):

    try:

        answer = ask_originx(
            request.message
        )

        return {
            "answer": answer
        }

    except Exception as error:

        print(
            "OriginX chatbot error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to process the request."
        )