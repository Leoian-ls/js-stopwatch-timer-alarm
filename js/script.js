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

stopwatchStartBtn.addEventListener('click', function () {
    if (stopwatchInterval) return;

    stopwatchInterval = setInterval(function () {
        stopwatchTotalSeconds++;
        updateStopwatchDisplay();
    }, 1000);
});

stopwatchPauseBtn.addEventListener('click', function () {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

stopwatchResetBtn.addEventListener('click', function () {
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
const timerSound = document.getElementById('timer-sound');

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

    timerSound.pause();
    timerSound.currentTime = 0;
    timerDisplay.classList.remove('finished');

    timerInterval = setInterval(function() {
        timerRemainingSeconds--;
        updateTimerDisplay();

        if (timerRemainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.classList.add('finished');
            timerSound.play();
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
    timerSound.pause();
    timerSound.currentTime = 0;
    timerMinutesInput.value = 0;
    timerSecondsInput.value = 0;
    updateTimerDisplay();
});


// ===== ALARM =====

const alarmDisplay = document.getElementById('alarm-time');
const alarmTimeInput = document.getElementById('alarm-time-input');
const alarmStartBtn = document.getElementById('alarm-start');
const alarmCancelBtn = document.getElementById('alarm-cancel');
const alarmSound = document.getElementById('alarm-sound');

let alarmTargetTime = null; // guarda "HH:MM" escolhido
let alarmInterval = null;

function triggerAlarm() {
    clearInterval(alarmInterval);
    alarmInterval = null;
    alarmTargetTime = null;

    alarmDisplay.classList.add('finished');
    alarmSound.play();
}

function checkAlarm() {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = currentHours + ':' + currentMinutes;

    if (currentTime === alarmTargetTime) {
        triggerAlarm();
    }
}

alarmStartBtn.addEventListener('click', function() {
    if (!alarmTimeInput.value) return;

    alarmSound.pause();
    alarmSound.currentTime = 0;

    alarmTargetTime = alarmTimeInput.value;
    alarmDisplay.textContent = alarmTargetTime;
    alarmDisplay.classList.remove('finished');

    if (alarmInterval) clearInterval(alarmInterval);

    alarmInterval = setInterval(checkAlarm, 1000);
});

alarmCancelBtn.addEventListener('click', function() {
    clearInterval(alarmInterval);
    alarmInterval = null;
    alarmTargetTime = null;
    alarmDisplay.textContent = '--:--';
    alarmDisplay.classList.remove('finished');
    alarmSound.pause();
    alarmSound.currentTime = 0;
});