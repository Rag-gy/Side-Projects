const socket = io('http://localhost:3000',{transports: ["websocket"]})
const messageForm = document.getElementById('message-form')
const messageCont = document.getElementById('message-container')
const message = document.getElementById('message-input')

let name =""

while(!name) {
    name = prompt("How do you like to be called?")
}


AppendMessage(`You joined the conversation`)
socket.emit('new-user', name)

socket.on('chat-message', data=>{
    AppendMessage(`${data.name} : ${data.message}`)
})

socket.on('user-connected', data=>{
    AppendMessage(`${data} Joined the conversation`)
})

socket.on('user-disconnected', name=>{
    AppendMessage(`${name} left the conversation`)
})

messageForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(message.value.trim()){
        socket.emit('send-message', message.value);
        AppendMessage(`You : ${message.value}`)
        messageCont.scrollTop = messageCont.scrollHeight;
        message.value = '';
    }
})

function AppendMessage(message){
    messageCont.innerText += `\n\n ${message}`
}