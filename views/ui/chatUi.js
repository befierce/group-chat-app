window.addEventListener('DOMContentLoaded', getAllMessagesFromDB);
   const newMessagesPollingInterval = setInterval(getAllNewMessagesFromDB, 10000);

async function sendMessageToServer() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    const token = localStorage.getItem('token');

    if (messageText.trim() !== '') {
        console.log('token from local storage in ui page', token);
        console.log("message:", messageText);

        try {
            const response = await axios.post('http://localhost:3000/user/message', { message: messageText, token: token });
            messageInput.value = '';
            console.log("sent message to server", response.data.currentMessage.message);
            console.log("sent message id to server", response.data.currentMessage.id);
            localStorage.setItem('latest msg id', (response.data.currentMessage.id));
            const isUser = false;

            displayMessage("You", response.data.currentMessage.message, true);
            // const currentMessage = getCurrentMessageFromServer();

        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

async function getAllNewMessagesFromDB() {
    const latestMessageOfUserHasSentId = localStorage.getItem('latest msg id');
    const userId = localStorage.getItem('id');
    console.log("latestMessageOfUserHasId", latestMessageOfUserHasSentId);
    try {
        const response = await axios.get(`http://localhost:3000/user/newMessage/${ latestMessageOfUserHasSentId}`);
        console.log(response.data.newMessages);
        for(let i = 0; i<response.data.newMessages.length; i++){
            console.log("--->",response.data.newMessages[i])
            if(response.data.newMessages.userId == userId){
                
                displayMessage("You",response.data.newMessages[i].message, true);
            }
            else{
                displayMessage("You",response.data.newMessages[i].message, false);
            }
            localStorage.setItem('latest msg id', (response.data.newMessages[i].id));
        }

    }
    catch(errr){
        console.log('error fetching new messsages')
    }
}















// function saveMessagesToLocalStorage(message){
//     const existingMessages = JSON.parse(localStorage.getItem("userMessages")) || [];
//     existingMessages.push(message);
//     localStorage.setItem("userMessages",JSON.stringify(existingMessages));
// }
function getAllMessagesFromLS() {

    const messages = JSON.parse(localStorage.getItem("userMessages")) || [];
    console.log("messages from LS", messages);
    clearChatMessages();
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        displayMessage("You", message, true);
    }
}



async function getAllMessagesFromDB() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    // console.log('id for message', userId);
    try {
        const response = await axios.get('http://localhost:3000/user/message', { headers: { authorisation: token } });

        clearChatMessages();
        const messages = {};
        for (let i = 0; i < response.data.result.length; i++) {
            //console.log("response",response.data.result[i].userId);
            let message = response.data.result[i].message;
            let id = response.data.result[i].id;

            messages[id] = message;
            var isUser = false;

            if (response.data.result[i].userId == userId) {
                isUser = true;
                displayMessage("You", message, isUser);
            }
            else {
                displayMessage("You", message, isUser);
            }

        }
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    catch (err) {
        console.log(err)
    }
}


function clearChatMessages() {
    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.innerHTML = ''; // Remove all child elements
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




document.getElementById('groupCreateFrom').addEventListener('submit',createGroup);


function createGroup(e){
    e.preventDefault();
    console.log('group button working')
}