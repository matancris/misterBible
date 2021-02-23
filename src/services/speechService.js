export const speechService = {
    start,
    onGetRes
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
// recognition.interimResults = true
// recognition.continuous = true
console.log("🚀 ~ file: BibleApp.jsx ~ line 13 ~ recognition", recognition)


function start() {
    recognition.start()
    recognition.onspeechstart = (ev) => {
        console.log('speech start');
    }
    recognition.onspeechend = () => {
        console.log('speech end');
    }
}

function onGetRes() {
    return new Promise((resolve, reject) => {
        recognition.onresult = (ev) => {
            return resolve(ev.results[0][0].transcript)
        }
        recognition.onnomatch = (ev) => {
            return reject('no match', ev);
        }
        recognition.onerror = (ev) => {
            return reject('error', ev);
        }

    })
}
