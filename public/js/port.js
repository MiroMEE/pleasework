const socket = io();
const users = document.querySelector('#joinName');
const how_many = document.querySelector('#how_many');
socket.on('how_many',(value)=>{
    how_many.innerText = value;
});
socket.on('giveAllName',(value)=>{
    users.innerText = value;
});