window.addEventListener('DOMContentLoaded',getAllMessagesFromDB);



async function sendMessageToServer() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    const token = localStorage.getItem('token');

    if (messageText.trim() !== '') {
        console.log('token from local storage in ui page', token);
        console.log("message:", messageText);

        try {
            await axios.post('http://localhost:3000/user/message', { message: messageText, token: token });
            messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

async function getAllMessagesFromDB() {
    const token = localStorage.getItem('token');
    try {
        const response =await axios.get('http://localhost:3000/user/message', { headers: { authorisation:token } });
        console.log("response",response);
    }
    catch (err) {
        console.log(err)
    }
}

// ------------------------------------------------------

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText === "") {
        return; 
    }

    messageInput.value = "";

    displayMessage("You", messageText, true);

}

function displayMessage(sender, message, isUser) {
    const chatMessages = document.querySelector(".chat-messages");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", isUser ? "user" : "bot");

    const senderDiv = document.createElement("div");
    senderDiv.classList.add("message-sender");
    senderDiv.textContent = sender;

    const messageTextDiv = document.createElement("div");
    messageTextDiv.classList.add("message-text");
    messageTextDiv.textContent = message;

    messageContainer.appendChild(senderDiv);
    messageContainer.appendChild(messageTextDiv);

    chatMessages.appendChild(messageContainer);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

displayMessage("Bot", "Hello! How can I help you today?", false);
