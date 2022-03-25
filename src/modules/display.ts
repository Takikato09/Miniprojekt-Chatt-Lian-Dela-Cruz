import { db } from "./databaseApp";
import { ref, remove, update } from "firebase/database";

export class Message {
    
    constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly message:string
    ){
        this.displayMessage.bind(this);
    }

    public displayMessage():void {
        const container = document.querySelector('#container');
        const messageContainer:HTMLElement = document.createElement('div');
        container.append(messageContainer);
        messageContainer.className = 'message-container';

        const userName:any = document.createElement('h4');
        messageContainer.appendChild(userName);
        const curUserName = userName.value;
        const userMessage:HTMLParagraphElement = document.createElement('p');
        messageContainer.appendChild(userMessage);

        messageContainer.id = this.id;
        userName.innerText = this.name;
        userMessage.innerText = this.message;


        const deleteBtn:HTMLButtonElement = document.createElement('button');
        deleteBtn.innerText = 'delete';
        messageContainer.append(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            const delCurUserMsg = ref(db, '/Messages' + this.id);
            remove(delCurUserMsg);
        })

        if(curUserName != this.name){
            deleteBtn.style.display = 'none';
        }
    }

    public clearMessage():void {
        document.querySelector(`#${this.id}`).remove();
    } 
};