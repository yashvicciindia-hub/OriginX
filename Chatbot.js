/* =========================================================
   ORIGINX TRUST ASSISTANT
   Premium Frontend Chatbot
   ========================================================= */

const ORIGINX_API_URL = "https://originx-ti4t.onrender.com";


/* =========================================================
   LOAD CHATBOT CSS
   ========================================================= */

(function loadOriginXStyles() {

    const existing = document.querySelector(
        'link[data-originx-chatbot-style]'
    );

    if (existing) return;

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = "Chatbot.css";

    link.dataset.originxChatbotStyle = "true";

    document.head.appendChild(link);

})();


/* =========================================================
   CHATBOT HTML
   ========================================================= */

const chatbotHTML = `

    <!-- Floating Chat Button -->

    <button
        class="originx-chat-button"
        id="originxChatButton"
        aria-label="Open OriginX Trust Assistant"
    >

        <!-- White Chat Bubble -->

        <svg
            class="originx-chat-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >

            <path
                d="M20 11.5C20 16.1944 16.1944 20 11.5 20C9.93108 20 8.45994 19.5753 7.19255 18.8314L3.5 20L4.6691 16.3075C3.92474 15.0399 3.5 13.5689 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20 6.80558 20 11.5Z"
                stroke="white"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <circle
                cx="8"
                cy="12"
                r="0.8"
                fill="white"
            />

            <circle
                cx="12"
                cy="12"
                r="0.8"
                fill="white"
            />

            <circle
                cx="16"
                cy="12"
                r="0.8"
                fill="white"
            />

        </svg>

    </button>


    <!-- Chat Window -->

    <section
        class="originx-chat-window"
        id="originxChatWindow"
        aria-label="OriginX Trust Assistant"
    >

        <!-- Header -->

        <header class="originx-chat-header">

            <div class="originx-assistant-logo">

                <svg
                    class="originx-header-chat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                        d="M19.5 11.5C19.5 15.6421 16.1421 19 12 19C10.6051 19 9.2955 18.6258 8.16938 17.972L4.5 19L5.528 15.3306C4.87418 14.2045 4.5 12.8949 4.5 11.5C4.5 7.35786 7.85786 4 12 4C16.1421 4 19.5 7.35786 19.5 11.5Z"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <circle
                        cx="8.5"
                        cy="11.5"
                        r="0.7"
                        fill="currentColor"
                    />

                    <circle
                        cx="12"
                        cy="11.5"
                        r="0.7"
                        fill="currentColor"
                    />

                    <circle
                        cx="15.5"
                        cy="11.5"
                        r="0.7"
                        fill="currentColor"
                    />

                </svg>

            </div>


            <div class="originx-assistant-info">

                <h3 class="originx-assistant-name">
                    OriginX Trust Assistant
                </h3>

                <div class="originx-assistant-status">

                    <span class="originx-status-dot"></span>

                    Trust Intelligence

                </div>

            </div>


            <!-- Clear Chat -->

            <button
                class="originx-clear-chat"
                id="originxClearChat"
                aria-label="Clear chat"
                title="Clear chat"
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                        d="M4 7H20"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />

                    <path
                        d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />

                    <path
                        d="M18 7L17.3 18.2C17.25 19.21 16.41 20 15.4 20H8.6C7.59 20 6.75 19.21 6.7 18.2L6 7"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <path
                        d="M10 10.5V16"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />

                    <path
                        d="M14 10.5V16"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />

                </svg>

            </button>


            <!-- Close -->

            <button
                class="originx-chat-close"
                id="originxChatClose"
                aria-label="Close chatbot"
            >
                ×
            </button>

        </header>


        <!-- Chat Body -->

        <div
            class="originx-chat-body"
            id="originxChatBody"
        >

            <!-- Welcome Content -->

            <div class="originx-welcome">

                <div class="originx-welcome-label">
                    ORIGINX
                </div>

                <h2 class="originx-welcome-title">
                    Product trust, explained.
                </h2>

                <p class="originx-welcome-description">
                    Ask me about traceability, authenticity,
                    digital product passports, compliance,
                    or the OriginX platform.
                </p>

            </div>


            <!-- Initial Bot Message -->

            <div class="originx-message bot">

                <div class="originx-message-bubble">

                    Hello 👋<br><br>

                    I'm the OriginX Trust Assistant.
                    How can I help you?

                </div>

            </div>


            <!-- Quick Questions -->

            <div id="originxQuickSection">

                <div class="originx-quick-title">
                    Explore OriginX
                </div>

                <div class="originx-quick-actions">

                    <button
                        class="originx-quick-button"
                        data-question="What is OriginX?"
                    >
                        What is OriginX?
                    </button>

                    <button
                        class="originx-quick-button"
                        data-question="How does product verification work?"
                    >
                        How does product verification work?
                    </button>

                    <button
                        class="originx-quick-button"
                        data-question="What is a Digital Product Passport?"
                    >
                        What is a Digital Product Passport?
                    </button>

                    <button
                        class="originx-quick-button"
                        data-question="Which industries does OriginX serve?"
                    >
                        Which industries does OriginX serve?
                    </button>

                </div>

            </div>

        </div>


        <!-- Input -->

        <div class="originx-chat-input-area">

            <div class="originx-chat-input-wrapper">

                <input
                    type="text"
                    id="originxChatInput"
                    class="originx-chat-input"
                    placeholder="Ask about OriginX..."
                    autocomplete="off"
                />

                <button
                    id="originxSendButton"
                    class="originx-send-button"
                    aria-label="Send message"
                >
                    ↑
                </button>

            </div>

            <div class="originx-powered">
                OriginX Trust Intelligence
            </div>

        </div>

    </section>

`;


/* =========================================================
   INSERT CHATBOT
   ========================================================= */

document.body.insertAdjacentHTML(
    "beforeend",
    chatbotHTML
);


/* =========================================================
   ELEMENTS
   ========================================================= */

const chatButton =
    document.getElementById("originxChatButton");

const chatWindow =
    document.getElementById("originxChatWindow");

const chatClose =
    document.getElementById("originxChatClose");

const clearChatButton =
    document.getElementById("originxClearChat");

const chatBody =
    document.getElementById("originxChatBody");

const chatInput =
    document.getElementById("originxChatInput");

const sendButton =
    document.getElementById("originxSendButton");

const quickSection =
    document.getElementById("originxQuickSection");


/* =========================================================
   OPEN / CLOSE
   ========================================================= */

chatButton.addEventListener("click", () => {

    chatWindow.classList.add("open");

    setTimeout(() => {
        chatInput.focus();
    }, 250);

});


chatClose.addEventListener("click", () => {

    chatWindow.classList.remove("open");

});


/* =========================================================
   ADD MESSAGE
   ========================================================= */

function addMessage(message, type = "bot") {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        `originx-message ${type}`;

    const bubble =
        document.createElement("div");

    bubble.className =
        "originx-message-bubble";

    bubble.textContent =
        message;

    wrapper.appendChild(bubble);

    chatBody.appendChild(wrapper);

    scrollChatToBottom();
}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollChatToBottom() {

    chatBody.scrollTop =
        chatBody.scrollHeight;

}


/* =========================================================
   TYPING INDICATOR
   ========================================================= */

function showTyping() {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "originx-message bot";

    wrapper.id =
        "originxTypingMessage";

    wrapper.innerHTML = `

        <div class="originx-typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;

    chatBody.appendChild(wrapper);

    scrollChatToBottom();
}


function removeTyping() {

    const typing =
        document.getElementById(
            "originxTypingMessage"
        );

    if (typing) {
        typing.remove();
    }

}


/* =========================================================
   CLEAR CHAT
   ========================================================= */

function clearChat() {

    /*
        Restore the original welcome screen.
    */

    chatBody.innerHTML = `

        <div class="originx-welcome">

            <div class="originx-welcome-label">
                ORIGINX
            </div>

            <h2 class="originx-welcome-title">
                Product trust, explained.
            </h2>

            <p class="originx-welcome-description">
                Ask me about traceability, authenticity,
                digital product passports, compliance,
                or the OriginX platform.
            </p>

        </div>


        <div class="originx-message bot">

            <div class="originx-message-bubble">

                Hello 👋<br><br>

                I'm the OriginX Trust Assistant.
                How can I help you?

            </div>

        </div>


        <div id="originxQuickSection">

            <div class="originx-quick-title">
                Explore OriginX
            </div>

            <div class="originx-quick-actions">

                <button
                    class="originx-quick-button"
                    data-question="What is OriginX?"
                >
                    What is OriginX?
                </button>

                <button
                    class="originx-quick-button"
                    data-question="How does product verification work?"
                >
                    How does product verification work?
                </button>

                <button
                    class="originx-quick-button"
                    data-question="What is a Digital Product Passport?"
                >
                    What is a Digital Product Passport?
                </button>

                <button
                    class="originx-quick-button"
                    data-question="Which industries does OriginX serve?"
                >
                    Which industries does OriginX serve?
                </button>

            </div>

        </div>

    `;


    /*
        Reattach quick-question listeners
        because innerHTML recreated them.
    */

    attachQuickQuestionListeners();


    /*
        Reset input.
    */

    chatInput.value = "";

    sendButton.disabled = false;


    /*
        Scroll to top.
    */

    chatBody.scrollTop = 0;

}


/* =========================================================
   CLEAR BUTTON
   ========================================================= */

clearChatButton.addEventListener(
    "click",
    clearChat
);


/* =========================================================
   SEND MESSAGE
   ========================================================= */

async function sendMessage(customMessage = null) {

    const message =
        customMessage ||
        chatInput.value.trim();

    if (!message) return;


    /*
        Add user message.
    */

    addMessage(
        message,
        "user"
    );


    /*
        Clear input.
    */

    chatInput.value = "";


    /*
        Disable send.
    */

    sendButton.disabled = true;


    /*
        Hide quick questions.
    */

    const currentQuickSection =
        document.getElementById(
            "originxQuickSection"
        );

    if (currentQuickSection) {

        currentQuickSection.style.display =
            "none";

    }


    /*
        Show typing.
    */

    showTyping();


    try {

        const response =
            await fetch(
                `${ORIGINX_API_URL}/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        removeTyping();


        addMessage(
            data.answer ||
            "I couldn't generate a response.",
            "bot"
        );


    } catch (error) {

        console.error(
            "OriginX chatbot error:",
            error
        );


        removeTyping();


        addMessage(
            "I'm unable to connect to the OriginX Trust Intelligence service right now. Please make sure the backend server is running.",
            "bot"
        );


    } finally {

        sendButton.disabled = false;

        chatInput.focus();

    }

}


/* =========================================================
   SEND BUTTON
   ========================================================= */

sendButton.addEventListener(
    "click",
    () => sendMessage()
);


/* =========================================================
   ENTER KEY
   ========================================================= */

chatInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================================
   QUICK QUESTIONS
   ========================================================= */

function attachQuickQuestionListeners() {

    document
        .querySelectorAll(
            ".originx-quick-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const question =
                        button.dataset.question;

                    sendMessage(question);

                }
            );

        });

}


attachQuickQuestionListeners();