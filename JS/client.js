
const socket=io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".mess");
var audio = new Audio('simp.mp3');
const append1 = (message , position ) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    if(position === "message-middle")
    {
        messageElement.classList.add('messag1');    
        messageElement.classList.add(position);
        messageContainer.append(messageElement)
    }
    else{
    messageElement.classList.add('messag');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    }
    if(position == 'message-left'){
        audio.play();
    }
}

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append1(`You: ${message}`,'message-right');
    socket.emit('send' , message);
    messageInput.value = "";
    
})


const name1 = prompt("Enter your Name");
socket.emit('new-user-joined', name1);

socket.on('user-joined', name1 => {
    
    append1(`${name1} joined the chat ` , 'message-middle');
})



socket.on('receive', data => {
    append1(`${data.name1} : ${data.message}  ` , 'message-left')
})

socket.on('you-joined' , name1 => {
    append1(`Congrats, you joined the group....` , 'message-middle');
} )

socket.on('user-left' , name1 => {
  
    append1(`${name1}  has been disconnected..` , 'message-middle')
})