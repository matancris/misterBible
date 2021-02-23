export const speechService ={
    start,
    turnOnListeners
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
// recognition.interimResults = true
// recognition.continuous = true
console.log("🚀 ~ file: BibleApp.jsx ~ line 13 ~ recognition", recognition)


function start() {
    recognition.start()
}

function turnOnListeners() {
    recognition.onspeechstart = (ev) => {
        console.log('speech start');
    }
    recognition.onresult = (ev) => {
        console.log(ev);
    }
    recognition.onnomatch = (ev) => {
        console.log('no match', ev);
    }
    recognition.onerror = (ev) => {
        console.log('error', ev);
    }
    recognition.onspeechend = () => {
        console.log('speech end');
    }
}