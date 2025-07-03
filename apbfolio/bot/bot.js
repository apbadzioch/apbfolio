let hasWelcomed = false;

function toggleAgent() {
    const agentBox = document.getElementById("agent-box");
    agentBox.classList.toggle("active");

    const chatLog = document.getElementById("chat-log");

    if (agentBox.classList.contains("active") && !hasWelcomed) {
        hasWelcomed = true;
        setTimeout(() => {
            chatLog.innerHTML += `<div class="bot-message"><strong>Agent Andy:</strong> Hi there! I'm Agent Andy <br>Ask me about my projects, resume, or how to contact me.</div>`;
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
    }

    return "I'm still learning. Try asking about my projects, resume, or contact information.";
}
