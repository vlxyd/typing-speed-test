const texts = [
    "Solo Leveling is an amazing manhwa to read offline.",
    "Train hard, defeat monsters, and become the strongest hunter.",
    "This typing test works without an internet connection.",
    "Practice makes perfect, keep typing and improving.",
    "Dark purple theme makes the experience immersive and cool."
];

let timeLeft = 60;
let timerInterval;
let wpm = 0;

const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restartBtn');

let currentText = '';
let startTime;
let correctChars = 0;

function newText() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    textDisplay.innerText = currentText;
    inputArea.value = '';
    correctChars = 0;
    timeLeft = 60;
    timerEl.innerText = timeLeft;
    wpmEl.innerText = 0;
    accuracyEl.innerText = 0;
    clearInterval(timerInterval);
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            inputArea.disabled = true;
        }
    }, 1000);
}

inputArea.addEventListener('input', () => {
    if (!startTime) startTimer();
    const input = inputArea.value;
    correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentText[i]) correctChars++;
    }
    const wordsTyped = input.trim().split(' ').length;
    wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60) || 0;
    const accuracy = Math.round((correctChars / input.length) * 100) || 0;

    wpmEl.innerText = wpm;
    accuracyEl.innerText = accuracy;
});

restartBtn.addEventListener('click', () => {
    inputArea.disabled = false;
    newText();
});

newText();
