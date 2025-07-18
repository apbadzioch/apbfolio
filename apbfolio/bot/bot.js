let hasWelcomed = false;

function toggleAgent() {
    const agentBox = document.getElementById("agent-box");
    agentBox.classList.toggle("active");

    const chatLog = document.getElementById("chat-log");

    if (agentBox.classList.contains("active") && !hasWelcomed) {
        hasWelcomed = true;
        setTimeout(() => {
            chatLog.innerHTML += `<div class="bot-message"><strong>Agent Andy:</strong> Hi there! I'm Agent Andy. <br>Ask me about my projects, resume, or how to contact me.</div>`;
            chatLog.scrollTop = chatLog.scrollHeight;
        }, 500); // 0.5 second delay)
    }
}


function handleKey(event) {
    if (event.key === "Enter") sendMessage();
}


function sendMessage() {
    const input = document.getElementById("chat-input");
    const chatLog = document.getElementById("chat-log");
    const typingIndicator = document.getElementById("typing-indicator");

    const userMsg = input.value.trim();
    if (!userMsg) return;

    // Show user message
    chatLog.innerHTML += `<div><strong>You:</strong> ${userMsg}</div>`;
    input.value = "";

    // Show typing indicator
    typingIndicator.style.display = "block";

    // Simulate delay before bot repsonds
    setTimeout(() => {
        const botResponse = getBotResponse(userMsg);

        typingIndicator.style.display = "none";
        chatLog.innerHTML += `<div class="bot-message"><strong>Agent Andy:</strong> ${botResponse}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    }, 1000); // 1 second delay
}

// First thought on how to create chatbot
/*
function getBotResponse(message) {
    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
        return "Hi, how can I help you today?";
    } else if (message.includes("project")) {
        return "You can learn more about my projects under the Projects tab.";
    } else if (message.includes("resume")) {
        return "My resume is available in the Resume section.";
    } else if (message.includes("contact")) {
        return "You can contact me via the Contact section.";
    } else if (message.includes("certifications")) {
        return "You can find links to my certifications in the Certifications section."
    }

    return "I'm still learning. Try asking about my projects, resume, or contact information.";
}
*/

// Second thought on chatbot. Idea from rule_based_chatbot.py from NLP_SP24 class.

function chooseRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();

    const keywords = {
        greeting: ["hello", "hi", "hey", "greetings", "how are you"],
        project: ["projects", "project", "work", "portfolio", "github", "class projects", "school projects"],
        resume: ["resume", "cv", "experience", "education", "skill", "skills", "qualifications"],
        contact: ["contact", "email", "reach me", "phone", "linkedin", "github"],
        certifications: ["certifications", "certification", "certs", "cert", "aws", "linux"]
};

    const responses = {
        greeting: ["Hi there! How can I assist you today?",
            "Hello! What can I do for you today?",
            "Hello! How may I help you?"
        ],
        project: ["You can learn more about my projects under the Projects tab.",
            "There is a link to my projects in the each project section.",
            "There is a link to my projects at the bottom of the page that connects to my GitHub."
        ],
        resume: ["My resume is available in the Resume section.",
            "You can find my resume in the Resume section.",
            "My work history is available in the Resume section."
        ],
        contact: ["You can find my contact information in the Contact section.",
            "You can contact me via email or phone, both of which are available in the Contact section.",
            "The Contact section has my information, or you can reach me on Linkedin with the link provided below."
        ],
        certifications: ["I currently have two certifications.",
            "My certifications are available in the Certifications section.",
            "I have certifications from AWS Academy and Linux Essentials."
        ]
    };

    for (const intent in keywords) {
        if (keywords[intent].some(keyword => lowerMsg.includes(keyword))) {
            return chooseRandom(responses[intent]);
        }
    }
    return "Sorry, I do not understand. I am still learning. Try asking another question.";

}