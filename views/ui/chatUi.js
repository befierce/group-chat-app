window.addEventListener('DOMContentLoaded', getAllMessagesFromDB);
window.addEventListener('DOMContentLoaded', getAllGroupsOfUserFromDB);
window.addEventListener('DOMContentLoaded', getAllMessagesOfAllGroupUserHave)
    //  const newMessagesPollingInterval = setInterval(getAllNewMessagesFromDB, 500);
    const newGroupMessagesPollingInterval = setInterval(getAllNewGroupMessagesFromDB, 5000);

async function getAllNewGroupMessagesFromDB() {
    let AGID = localStorage.getItem('A.G.I.D');
    let AGRMID = localStorage.getItem('A.G.R.M.ID');
    const userId = localStorage.getItem('id');
    if(AGID == null){
        AGID = 0;
    }
    if(AGRMID == null){
        AGRMID = 0;
    }

    try {
        const response = await axios.get(`http://localhost:3000/user/newGroupMessages/${AGRMID}/${AGID}`);
        console.log(response.data.messages);
        for (let i = 0; i < response.data.messages.length; i++) {
            console.log("--->", response.data.messages[i].user_list.name)
            const name = response.data.messages[i].user_list.name;
            if (response.data.messages[i].userListUserId == userId) {
                displayMessage("You", response.data.messages[i].message, true);
            }
            else {
                displayMessage(name, response.data.messages[i].message, false);
            }
            localStorage.setItem('A.G.R.M.ID', (response.data.messages[i].id));
        }

    }
    catch (errr) {
        console.log('error fetching new messsages')
    }
}
async function getAllNewMessagesFromDB() {
    const latestMessageOfUserHasSentId = localStorage.getItem('latest msg id');
    const userId = localStorage.getItem('id');
    console.log("latestMessageOfUserHasId", latestMessageOfUserHasSentId);
    try {
        const response = await axios.get(`http://localhost:3000/user/newMessage/${latestMessageOfUserHasSentId}`);
        console.log(response.data.newMessages);
        for (let i = 0; i < response.data.newMessages.length; i++) {
            console.log("--->", response.data.newMessages[i])
            if (response.data.newMessages.userId == userId) {

                displayMessage("You", response.data.newMessages[i].message, true);
            }
            else {
                displayMessage("You", response.data.newMessages[i].message, false);
            }
            localStorage.setItem('latest msg id', (response.data.newMessages[i].id));
        }

    }
    catch (errr) {
        console.log('error fetching new messsages')
    }
}

async function getAllMessagesOfAllGroupUserHave() {

}
function getAllMessagesFromLS() {

    const messages = JSON.parse(localStorage.getItem("userMessages")) || [];
    console.log("messages from LS", messages);
    clearChatMessages();
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        displayMessage("You", message, true);
    }
}
// async function getAllGroupsOfUserFromDB() {
//     try {
//         const userId = localStorage.getItem('id');
//         const response = await axios.get(`http://localhost:3000/user/fetchGroups/${userId}`);
//         // console.log("all groups of user",response.data.result[i].group_name);
//         for (let i = 0; i < response.data.result.length; i++) {
//             const data = response.data.result[i]
//             console.log("all groups of user", response.data.result[i].group_name);
//             displayGroup(data);
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

async function getAllGroupsOfUserFromDB() {
    try {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`http://localhost:3000/user/fetchGroups/${userId}`);
        console.log("all groups of user",response.data);
        for (let i = 0; i < response.data.length; i++) {
            const data = response.data[i]
            console.log("///////////",data.group.group_name)
            // localStorage.setItem(groupName, response.data.result.gorupId)
            displayGroup(data);
        }

    } catch (error) {
        console.log(error);
    }
}

async function getAllNewMessagesFromDB() {
    const latestMessageOfUserHasSentId = localStorage.getItem('latest msg id');
    const userId = localStorage.getItem('id');
    console.log("latestMessageOfUserHasId", latestMessageOfUserHasSentId);
    try {
        const response = await axios.get(`http://localhost:3000/user/newMessage/${latestMessageOfUserHasSentId}`);
        console.log(response.data.newMessages);
        for (let i = 0; i < response.data.newMessages.length; i++) {
            console.log("--->", response.data.newMessages[i])
            if (response.data.newMessages.userId == userId) {

                displayMessage("You", response.data.newMessages[i].message, true);
            }
            else {
                displayMessage("You", response.data.newMessages[i].message, false);
            }
            localStorage.setItem('latest msg id', (response.data.newMessages[i].id));
        }

    }
    catch (errr) {
        console.log('error fetching new messsages')
    }
}

async function getAllMessagesFromDB() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    console.log("this funciton is working")
    try {
        const response = await axios.get('http://localhost:3000/user/message', { headers: { authorisation: token } });
        console.log("response of all message in global group",response);
        clearChatMessages();
        const messages = {};
        for (let i = 0; i < response.data.result.length; i++) {
            //console.log("response",response.data.result[i].userId);
            let message = response.data.result[i].message;
            let id = response.data.result[i].id;
            let name = response.data.result[i].user_list.name;
            console.log("name reaching",name);
            messages[id] = message;
            var isUser = false;

            if (response.data.result[i].userId == userId) {
                isUser = true;
                displayMessage("You", message, isUser);
            }
            else {
                displayMessage(name, message, isUser);
            }

        }
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    catch (err) {
        console.log(err)
    }
}

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

            displayMessage("You", response.data.currentMessage.message, true);
            // const currentMessage = getCurrentMessageFromServer();

        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}
















// function saveMessagesToLocalStorage(message){
//     const existingMessages = JSON.parse(localStorage.getItem("userMessages")) || [];
//     existingMessages.push(message);
//     localStorage.setItem("userMessages",JSON.stringify(existingMessages));
// }







function clearChatMessages() {
    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.innerHTML = ''; // Remove all child elements
}

// ------------------------------------------------------


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




document.getElementById('groupCreateFrom').addEventListener('submit', createGroup);

async function createGroup(e) {
    e.preventDefault();
    const userId = localStorage.getItem('id');
    console.log('group button working', userId)
    const groupName = document.getElementById('group-name-input').value;
    console.log('groupName', groupName);
    try {
        const response = await axios.post('http://localhost:3000/user/createGroup', { groupName, userId });
        console.log("group id after group creation", response.data.result);
        // const groupId = response.data.result.gorupId;
        // localStorage.setItem(groupName, groupId.toString());
        displayGroupxc(response.data.result)
    } catch (error) {
        console.log(error);
    }
}
async function setGroupToLocalStorageArray() {

}

function displayGroupxc(data) {
    const groupName = data.group_name;
    const groupId = data.gorupId;


    console.log("revieving group id",groupId)

    localStorage.setItem(groupName,groupId);



    const userId = localStorage.getItem('id');
    console.log("group is", groupName);
    console.log("group id is", groupId);
    const groupLists = document.getElementById('list_of_groups');

    const buttonItem = document.createElement('button');
    buttonItem.className = 'group_button';
    buttonItem.setAttribute('groupId', groupId);

    const groupNameSpan = document.createElement('span');
    groupNameSpan.textContent = groupName;

    buttonItem.appendChild(groupNameSpan);

    buttonItem.addEventListener('click', () => {
        const chatHeader = document.getElementById('chat-header-element');
        groupNameX = 'Group: ' + groupName;
        chatHeader.textContent = groupNameX;

        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'dropdown';

        // Create the button that triggers the dropdown
        const dropdownButton = document.createElement('button');
        dropdownButton.className = 'dropdown-btn';
        dropdownButton.innerHTML = '<i class="fas fa-ellipsis-v"></i>'; // You can replace this with your icon

        // Create the dropdown content container
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        // Create individual buttons for the dropdown
        const addUsersButton = document.createElement('button');
        addUsersButton.id = 'add_users';
        addUsersButton.textContent = 'Add Users';

        addUsersButton.addEventListener('click', function () {
            const container = document.getElementById('group_list');
            container.style.display = 'none';
            showAllUsersOfChatApp(groupId, userId);
        });

        const seeMembersButton = document.createElement('button');
        seeMembersButton.id = 'see_users';
        seeMembersButton.textContent = 'See Members';

        seeMembersButton.addEventListener('click', function () {
            const container = document.getElementById('group_list');
            container.style.display = 'none';
            showListOfGroupMembers();
        });

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';

        logoutButton.addEventListener('click', function () {
            logOutUser()
        });

        // Append the dropdown button and content to the dropdown container
        dropdownContainer.appendChild(dropdownButton);
        dropdownContainer.appendChild(dropdownContent);

        // Append the individual buttons to the dropdown content
        dropdownContent.appendChild(addUsersButton);
        dropdownContent.appendChild(seeMembersButton);
        dropdownContent.appendChild(logoutButton);

        // Append the dropdown container to the chat header
        chatHeader.appendChild(dropdownContainer);



        const chatMessages = document.querySelector(".chat-messages");
        chatMessages.innerHTML = '';

        const sendMessageButton = document.getElementById('send-button');
        sendMessageButton.onclick = sendMessageToGroupServer;

        getAllGroupMessagesFromDB(groupId)


    });

    groupLists.appendChild(buttonItem);

    async function sendMessageToGroupServer() {
        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value;
        const userId = localStorage.getItem('id');
        const groupId = localStorage.getItem(groupName);

        console.log('groupId', groupId);

        if (messageText.trim() !== '') {
            // console.log('token from local storage in ui page', token);
            console.log("message:", messageText);

            try {
                const response = await axios.post('http://localhost:3000/user/group/message', { message: messageText, userId: userId, groupId: groupId });
                messageInput.value = '';
                console.log("response after savinng group message", response)
                 localStorage.setItem('A.G.R.M', (response.data.id));//active group recent message
                 localStorage.setItem('A.G.I.D', (groupId));//active group i d
                // const isUser = false;

                displayMessage("You", response.data.message, true);
                // const currentMessage = getCurrentMessageFromServer();

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
}





function displayGroup(data) {
    const groupName = data.group.group_name;
    const groupId = data.groupGorupId;


    console.log("revieving group id",groupId)

    localStorage.setItem(groupName,groupId);



    const userId = localStorage.getItem('id');
    console.log("group is", groupName);
    console.log("group id is", groupId);
    const groupLists = document.getElementById('list_of_groups');

    const buttonItem = document.createElement('button');
    buttonItem.className = 'group_button';
    buttonItem.setAttribute('groupId', groupId);

    const groupNameSpan = document.createElement('span');
    groupNameSpan.textContent = groupName;

    buttonItem.appendChild(groupNameSpan);

    buttonItem.addEventListener('click', () => {
        const chatHeader = document.getElementById('chat-header-element');
        groupNameX = 'Group: ' + groupName;
        chatHeader.textContent = groupNameX;

        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'dropdown';

        // Create the button that triggers the dropdown
        const dropdownButton = document.createElement('button');
        dropdownButton.className = 'dropdown-btn';
        dropdownButton.innerHTML = '<i class="fas fa-ellipsis-v"></i>'; // You can replace this with your icon

        // Create the dropdown content container
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        // Create individual buttons for the dropdown
        const addUsersButton = document.createElement('button');
        addUsersButton.id = 'add_users';
        addUsersButton.textContent = 'Add Users';

        addUsersButton.addEventListener('click', function () {
            const container = document.getElementById('group_list');
            container.style.display = 'none';
            showAllUsersOfChatApp(groupId, userId);
        });

        const seeMembersButton = document.createElement('button');
        seeMembersButton.id = 'see_users';
        seeMembersButton.textContent = 'See Members';

        seeMembersButton.addEventListener('click', function () {
            const container = document.getElementById('group_list');
            container.style.display = 'none';
            showListOfGroupMembers(groupId,userId);
        });

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';

        logoutButton.addEventListener('click', function () {
            logOutUser()
        });

        // Append the dropdown button and content to the dropdown container
        dropdownContainer.appendChild(dropdownButton);
        dropdownContainer.appendChild(dropdownContent);

        // Append the individual buttons to the dropdown content
        dropdownContent.appendChild(addUsersButton);
        dropdownContent.appendChild(seeMembersButton);
        dropdownContent.appendChild(logoutButton);

        // Append the dropdown container to the chat header
        chatHeader.appendChild(dropdownContainer);



        const chatMessages = document.querySelector(".chat-messages");
        chatMessages.innerHTML = '';

        const sendMessageButton = document.getElementById('send-button');
        sendMessageButton.onclick = sendMessageToGroupServer;

        getAllGroupMessagesFromDB(groupId)


    });

    groupLists.appendChild(buttonItem);

    async function sendMessageToGroupServer() {
        const messageInput = document.getElementById('message-input');
        const messageText = messageInput.value;
        const userId = localStorage.getItem('id');
        const groupId = localStorage.getItem(groupName);

        console.log('groupId', groupId);

        if (messageText.trim() !== '') {
            // console.log('token from local storage in ui page', token);
            console.log("message:", messageText);

            try {
                const response = await axios.post('http://localhost:3000/user/group/message', { message: messageText, userId: userId, groupId: groupId });
                messageInput.value = '';
                console.log("response after savinng group message", response)
                localStorage.setItem('A.G.R.M.ID', (response.data.id));//active group recent message ID
                localStorage.setItem('A.G.I.D', groupId);//active group i d

                displayMessage("You", response.data.message, true);
                // const currentMessage = getCurrentMessageFromServer();

            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
}
function closeUserList() {
    const userList = document.getElementById('all-user-list');
    userList.style.display = 'none';

    const container = document.getElementById('group_list');
    container.style.display = 'block';
}
async function showListOfGroupMembers(groupId,adminId) {
    try {
        const response = await axios.get(`http://localhost:3000/user/listOfGroupUsers/${groupId}/${adminId}`);

        console.log(response);

        
        const userList = document.getElementById('all-user-list');
        // userList.innerHTML = '';

        const listOfAllUsers = document.getElementById('list_of_users');

        listOfAllUsers.innerHTML = '';

        const userData = response.data.result;

        const userTable = document.createElement('table');
        userTable.classList.add('user-table');

        // Create table header row
        const headerRow = document.createElement('tr');
        const emailHeader = document.createElement('th');
        emailHeader.textContent = 'Email';
        headerRow.appendChild(emailHeader);
        userTable.appendChild(headerRow);

        // Loop through the user data and create table rows for each user
        userData.forEach(user => {
            const userRow = document.createElement('tr');

            // Create a cell for the email
            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            userRow.appendChild(emailCell);

            // Create a hidden input field for the email
            const emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.name = 'email';
            emailInput.value = user.user_list.email;

            //  console.log("email as hidden input",groupId);
            userRow.appendChild(emailInput);

            // Create a cell for the "Add User" button
            const addButtonCell = document.createElement('td');
            const addButton = document.createElement('button');
            addButton.textContent = 'Add User';
            addButton.addEventListener('click', async () => {
                const userEmail = emailInput.value;
                try {
                    const response = await axios.post('http://localhost:3000/user/addUser/to/group', { email: user.email, groupId: groupId, adminId: adminId, userId: user.userId })

                    if (response.status == 201) {
                        alert('user already present in the group');
                    }
                    else if (response.status == 200) {
                        addButton.textContent = '✓ Added';
                        // addButton.style.backgroundColor = 'green';
                        addButton.disabled = true;
                    }

                } catch (error) {
                    console.log(error);
                }
            });
            addButtonCell.appendChild(addButton);
            userRow.appendChild(addButtonCell);

            userTable.appendChild(userRow);
        });

        // Append the table to the same element where you are displaying the user list
        listOfAllUsers.appendChild(userTable);

        // Add CSS style to the list container to make it scrollable
        listOfAllUsers.style.overflow = 'auto';
        listOfAllUsers.style.maxHeight = '300px'; // Set a max height as needed

        userList.style.display = 'block';





    }
    catch (error) {
        console.log(error);
    }
}
async function showAllUsersOfChatApp(groupId, adminId) {
    try {
        const response = await axios.get('http://localhost:3000/user/listOfAllUsers');
        console.log(response);

        const userList = document.getElementById('all-user-list');
        // userList.innerHTML = '';

        const listOfAllUsers = document.getElementById('list_of_users');

        listOfAllUsers.innerHTML = '';

        const userData = response.data.result;

        const userTable = document.createElement('table');
        userTable.classList.add('user-table');

        // Create table header row
        const headerRow = document.createElement('tr');
        const emailHeader = document.createElement('th');
        emailHeader.textContent = 'Email';
        headerRow.appendChild(emailHeader);
        userTable.appendChild(headerRow);

        // Loop through the user data and create table rows for each user
        userData.forEach(user => {
            const userRow = document.createElement('tr');

            // Create a cell for the email
            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            userRow.appendChild(emailCell);

            // Create a hidden input field for the email
            const emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.name = 'email';
            emailInput.value = user.email;

            //  console.log("email as hidden input",groupId);
            userRow.appendChild(emailInput);

            // Create a cell for the "Add User" button
            const addButtonCell = document.createElement('td');
            const addButton = document.createElement('button');
            addButton.textContent = 'Add User';
            addButton.addEventListener('click', async () => {
                const userEmail = emailInput.value;
                try {
                    const response = await axios.post('http://localhost:3000/user/addUser/to/group', { email: user.email, groupId: groupId, adminId: adminId, userId: user.userId })

                    if (response.status == 201) {
                        alert('user already present in the group');
                    }
                    else if (response.status == 200) {
                        addButton.textContent = '✓ Added';
                        // addButton.style.backgroundColor = 'green';
                        addButton.disabled = true;
                    }

                } catch (error) {
                    console.log(error);
                }
            });
            addButtonCell.appendChild(addButton);
            userRow.appendChild(addButtonCell);

            userTable.appendChild(userRow);
        });

        // Append the table to the same element where you are displaying the user list
        listOfAllUsers.appendChild(userTable);

        // Add CSS style to the list container to make it scrollable
        listOfAllUsers.style.overflow = 'auto';
        listOfAllUsers.style.maxHeight = '300px'; // Set a max height as needed

        userList.style.display = 'block';
    }
    catch (error) {
        console.log(error);
    }
}



async function logOutUser() {

}


async function getAllGroupMessagesFromDB(groupId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    // console.log('id for message', userId);
    try {
        const response = await axios.get('http://localhost:3000/user/getallgroupmessage', { headers: { authorisation: token, userId: userId, groupId: groupId } });
        console.log("response after clicking group", response);
        // clearChatMessages();
        const messages = {};
        for (let i = 0; i < response.data.length; i++) {
            //console.log("response",response.data[i].userId);
            let message = response.data[i].message;
            let id = response.data[i].id;
            let name = response.data[i].user_list.name;

            messages[id] = message;
            var isUser = false;

            if (response.data[i].userListUserId
                == userId) {
                isUser = true;
                displayMessage("You", message, isUser);
            }
            else {
                displayMessage(name, message, isUser);
            }

        }
        // localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    catch (err) {
        console.log(err)
    }
}