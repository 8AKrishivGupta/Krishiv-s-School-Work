// Toggle Chat Window
function toggleChat() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.classList.toggle("hidden");
}

// Function to Send User Input to OpenAI API
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Add User Message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // OpenAI API Request
//    const apiKey = "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";  // Replace with your actual OpenAI API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Add Chatbot Response
    chatBox.innerHTML += `<p><strong>ChatGPT:</strong> ${botReply}</p>`;

    // Clear Input Field
    document.getElementById("user-input").value = "";
}
