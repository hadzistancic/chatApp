//dom element
const list = document.querySelector(".chat-list");
const messageForm = document.querySelector(".new-chat");
const usernameForm = document.querySelector(".new-name");
const usernameMsg = document.querySelector(".update-mssg");
const roomBtn = document.querySelector(".chat-rooms");

//checking if username or room exist in LS
const username = localStorage.username ? localStorage.username : "Anonymous";
const room = localStorage.room ? localStorage.room : "general";

//class instances
const chatUI = new ChatUI(list);
const chatroom = new Chatroom(room, username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));

//adding new message to chat list
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageForm.message.value.trim();
    chatroom.addChat(message)
                .then(() => messageForm.reset())
                .catch(err => console.log(err));
})

//updating room
roomBtn.addEventListener("click", ev => {
    if(ev.target.tagName === "BUTTON") {
        const room = ev.target.getAttribute("id");
        chatUI.clear();
        chatroom.updateRoom(room);
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

//updating username 
usernameForm.addEventListener("submit", function(ev) {
    ev.preventDefault();
    const username = this.name.value.trim();
    if(username.length > 0) {
        chatroom.updateName(username);
        this.reset();
        usernameMsg.textContent = "Username has been updated";
        usernameMsg.style.display = "block";
        setTimeout(() => {
            usernameMsg.style.display = "none";
            usernameMsg.textContent = "";
        }, 3000);
    }
});
