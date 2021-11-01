const client = new tmi.Client({
	channels: [ 'snardle', 'srogee', 'johnwhodoyouthinkiamgalt', 'themastergamepro', 'lazerlokque' ]
});

let messageQueue = [];
let isShowingMessage = false;
let canShowMessage = true;

client.connect();

let duration = 10000;
let fadeOutDuration = 1000;
let timeBetweenQueuedMessages = 500;
let maxMessageLength = 24;

client.on('message', (channel, tags, message, self) => {
    if (message && message.toLowerCase().startsWith('!nv ')) {
        let betterMessage = message.substring(4).trim();
        if (message.length <= maxMessageLength) {
            messageQueue.push(betterMessage);
        }
    }
});

function animationFrame() {
    if (!isShowingMessage && canShowMessage && messageQueue.length > 0) {
        let message = messageQueue.shift();
        showMessage(message);
    }

    window.requestAnimationFrame(animationFrame);
}

window.requestAnimationFrame(animationFrame);

function hideMessage() {
    isShowingMessage = false;
    document.getElementById('banner').classList.remove('fade-in');
    document.getElementById('banner').classList.add('fade-out');
    setTimeout(actuallyHideMessage, fadeOutDuration);
    setTimeout(allowShowingMessages, fadeOutDuration + timeBetweenQueuedMessages);
}

function actuallyHideMessage() {
    document.getElementById('banner').style = 'display: none';
}

function showMessage(message) {
    isShowingMessage = true;
    canShowMessage = false;
    document.getElementById('banner').style = '';
    document.getElementById('text').innerText = message;
    document.getElementById('banner').classList.remove('fade-out');
    document.getElementById('banner').classList.add('fade-in');
    setTimeout(hideMessage, duration);
}

function allowShowingMessages() {
    canShowMessage = true;
}
