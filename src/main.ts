import { onValue, ref, push, update, remove } from "firebase/database";
import { db } from "./modules/databaseApp";
import { Message } from "./modules/display"; //TODO: rename file to what it is: Message


//TODO: Add constant for path in database: '/Messages'

const dbRef = ref(db, '/Messages/' );
let chats:Message[] = []; //TODO: Rename this one, it is a list of messages, not chats.
let currentUserName:String;

const messageContainer:HTMLElement = document.querySelector('#container');

onValue(dbRef, snapshot => {
    chats.length && chats.forEach(message=> message.clearMessage())
    chats = [];

    const messageData = snapshot.val();
    for (const key in messageData) {
        const message = new Message(
            key,
            messageData[key].name, 
            messageData[key].message
        )
        chats.push(message);
    }

    if (chats.length > 25) {
        const oldestMessages = chats.slice(25, chats.length - 1);
        oldestMessages.forEach((message) => {
            console.log('REMOVING MESSAGE:', message);
            removeMessageFromDatabase(message)});
            
            const messagesToDisplay = chats.slice(0, 25);
            messagesToDisplay.forEach(message => message.displayMessage());
    }
    else {
        const messagesToDisplay = chats.slice(0, chats.length-1)
        messagesToDisplay.forEach(message => message.displayMessage());
    }
    
    
    
    
});

function startChat(){
    document.querySelector("#userNameForm").remove()
    messageContainer.style.display = "block"
   
}

function removeMessageFromDatabase(message: Message):void{
    const messageDatabaseReference = ref(db, '/Messages/' + message.id);
    remove(messageDatabaseReference);
}

//this is for the username and submit 
document.querySelector('#submit-button').addEventListener('click', e => {
    let userNameInput = document.querySelector(".user-name") as HTMLInputElement
    currentUserName = userNameInput.value
    startChat()
    e.preventDefault()
})

document.querySelector('#send-button').addEventListener('click', e => {
    const userMessageInput:HTMLInputElement = document.querySelector('.user-message');
    e.preventDefault();
    const messageToAdd = {
        name: currentUserName,
        message: userMessageInput.value,
        time: Date.now()
    }
    userMessageInput.value = ''
    const newKey:string = push(dbRef).key;
    const newChat = {};
    newChat[newKey] = messageToAdd;
    update(dbRef, newChat);
})