document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const username = localStorage.getItem('username');
    const teamName = localStorage.getItem('teamName');

    socket.emit('joinRoom', teamName);

    socket.on('message', message => {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = <p>${message}</p>;
        chatBox.appendChild(div);
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = e.target.elements.msg.value;

        socket.emit('chatMessage', { msg, username }, teamName);

        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    });
});