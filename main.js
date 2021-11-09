const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('message');
const body = document.getElementsByTagName('body');
const chatBtn = document.getElementById('chat-button');
let ws = new WebSocket("ws://localhost:8125");

function printMessage(value) {
    const li = document.createElement('li');
    li.innerHTML = '<span>' + value + '</span>';
    messages.appendChild(li);
}

ws.onopen = function () {
    form.addEventListener('submit', event => {
        event.preventDefault();
        ws.send(input.value);
        input.value = '';
    });
}

ws.onmessage = function (message) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        printMessage(reader.result);
    }, false);

    reader.readAsText(message.data);
}

chatBtn.addEventListener('click', function () {
    if (body[0].classList.contains('chat-opened')) {
        body[0].classList.remove('chat-opened');
    } else {
        body[0].classList.add('chat-opened');
    }
})
