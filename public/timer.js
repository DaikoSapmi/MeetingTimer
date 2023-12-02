let countdown;
let currentTimerDuration = 0;

function updateTimerDisplay(time, isNegative) {
  const timerDisplay = document.getElementById('timerDisplay');
  timerDisplay.textContent = time;
  if (isNegative) {
    timerDisplay.classList.add('negative');
  } else {
    timerDisplay.classList.remove('negative');
  }
}

function startTimer(duration) {
  clearInterval(countdown);
  let timer = duration;
  countdown = setInterval(() => {
    let isNegative = timer < 0;
    let absTimer = Math.abs(timer);
    let minutes = parseInt(absTimer / 60, 10);
    let seconds = parseInt(absTimer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let displayTime = (isNegative ? "-" : "") + minutes + ":" + seconds;
    updateTimerDisplay(displayTime, isNegative);
    timer--;
  }, 1000);
}

function fetchActiveTimer() {
  fetch('/active-timer')
    .then(response => response.json())
    .then(data => {
      if (data.active && data.duration !== currentTimerDuration) {
        currentTimerDuration = data.duration;
        startTimer(data.duration);
      } else if (!data.active) {
        clearInterval(countdown);
        updateTimerDisplay("00:00", false);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Kall funksjonen hver 5. sekund for å sjekke etter oppdateringer
setInterval(fetchActiveTimer, 5000);

fetchActiveTimer(); // Kall det umiddelbart ved lasting
