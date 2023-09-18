async function sendMessage() {    
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;
    const token = localStorage.getItem('token');
    
    // Check if the message is not empty before sending it
    if (messageText.trim() !== '') {
        console.log('token from local storage in ui page', token);
        console.log("message:", messageText);

        try {
            // Send the message using axios
            await axios.post('http://localhost:3000/user/message', { message: messageText, token: token });
            
            // Clear the input field after successful message submission
            messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
