// Pega os elementos do HTML
const display = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

// Variáveis de controle
let totalSeconds = 0;
let interval = null;

// Formata os segundos totais em HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return String(hours).padStart(2, '0') + ':' +
           String(minutes).padStart(2, '0') + ':' +
           String(secs).padStart(2, '0');
}

// Atualiza o texto do display
function updateDisplay() {
    display.textContent = formatTime(totalSeconds);
}

// Evento do botão Start
startBtn.addEventListener('click', function() {
    if (interval) return; // já está rodando, não faz nada

    interval = setInterval(function() {
        totalSeconds++;
        updateDisplay();
    }, 1000);
});

// Evento do botão Pause
pauseBtn.addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
});

// Evento do botão Reset
resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
    totalSeconds = 0;
    updateDisplay();
});