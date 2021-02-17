//adding new chat documents -- done
//setting up a real-time listener to get new chat documents -- done
//updating the username -- done
//updating the room -- done

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection("chats");
        this.unsub;
    }

    async addChat(message) {
        //format a chat object
        const date = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        }

        //saving the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback) {
       this.unsub = this.chats
            .where("room", "==", this.room)
            .orderBy("created_at")
            .onSnapshot(snapshot => {
                console.log("got it");
                snapshot.docChanges().forEach(change => {
                if(change.type === "added") {
                    callback(change.doc.data());
                }
            })
        })
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem("username", username);
    }

    updateRoom(room) {
        this.room = room;
        console.log("room updated");
        if(this.unsub) {
            this.unsub();
        }
        localStorage.setItem("room", room);
    }
}




