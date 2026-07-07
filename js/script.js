// ===== STOPWATCH =====

const stopwatchDisplay = document.getElementById('stopwatch-time');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchPauseBtn = document.getElementById('stopwatch-pause');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');

let stopwatchTotalSeconds = 0;
let stopwatchInterval = null;

function formatStopwatchTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return String(hours).padStart(2, '0') + ':' +
           String(minutes).padStart(2, '0') + ':' +
           String(secs).padStart(2, '0');
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTotalSeconds);
}

stopwatchStartBtn.addEventListener('click', function() {
    if (stopwatchInterval) return;

    stopwatchInterval = setInterval(function() {
        stopwatchTotalSeconds++;
        updateStopwatchDisplay();
    }, 1000);
});

stopwatchPauseBtn.addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

stopwatchResetBtn.addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTotalSeconds = 0;
    updateStopwatchDisplay();
});


// ===== TIMER =====

const timerDisplay = document.getElementById('timer-time');
const timerMinutesInput = document.getElementById('timer-minutes-input');
const timerSecondsInput = document.getElementById('timer-seconds-input');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');

let timerRemainingSeconds = 0;
let timerInterval = null;

function formatTimerTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return String(minutes).padStart(2, '0') + ':' +
           String(secs).padStart(2, '0');
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTimerTime(timerRemainingSeconds);
}

timerStartBtn.addEventListener('click', function() {
    if (timerInterval) return;

    if (timerRemainingSeconds === 0) {
        const minutes = Number(timerMinutesInput.value);
        const secs = Number(timerSecondsInput.value);
        timerRemainingSeconds = (minutes * 60) + secs;

        if (timerRemainingSeconds === 0) return;
    }

    timerDisplay.classList.remove('finished');

    timerInterval = setInterval(function() {
        timerRemainingSeconds--;
        updateTimerDisplay();

        if (timerRemainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.classList.add('finished');
        }
    }, 1000);
});

timerPauseBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
});

timerResetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemainingSeconds = 0;
    timerDisplay.classList.remove('finished');
    timerMinutesInput.value = 0;
    timerSecondsInput.value = 0;
    updateTimerDisplay();
});