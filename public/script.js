let timers = [];
let activeTimerIndex = null;

function updateActiveTimerDisplay(time, isNegative) {
  const activeTimerDisplay = document.getElementById('activeTimerDisplay');
  activeTimerDisplay.textContent = time;
  if (isNegative) {
    activeTimerDisplay.classList.add('negative');
  } else {
    activeTimerDisplay.classList.remove('negative');
  }
}

function fetchActiveTimer() {
  fetch('/active-timer')
    .then(response => response.json())
    .then(data => {
      let isNegative = false;
      let timeRemaining = data.duration;

      if (data.active) {
        if (timeRemaining < 0) {
          timeRemaining = Math.abs(timeRemaining);
          isNegative = true;
        }
        let minutes = parseInt(timeRemaining / 60, 10);
        let seconds = parseInt(timeRemaining % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        let displayTime = (isNegative ? "-" : "") + minutes + ":" + seconds;
        updateActiveTimerDisplay(displayTime, isNegative);
      } else {
        updateActiveTimerDisplay("00:00", false);
      }
    })
    .catch(error => console.error('Error:', error));
}

setInterval(fetchActiveTimer, 1000);

function startTimer(index) {
  activeTimerIndex = index;
  const timer = timers[index];

  fetch('/start-timer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timer: timer, index: index })
  }).then(response => response.json())
    .then(data => {
      console.log('Timer startet:', data);
    })
    .catch((error) => {
      console.error('Feil ved start av timer:', error);
    });

  displayTimers();
}

function addTimer() {
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;

  if (!minutes && !seconds) {
    alert("Vennligst fyll inn minst ett felt.");
    return;
  }

  const timer = {
    minutes: parseInt(minutes) || 0,
    seconds: parseInt(seconds) || 0
  };

  timers.push(timer);
  displayTimers();
}

function deleteTimer(index) {
  if (activeTimerIndex === index) {
    activeTimerIndex = null;
  }
  timers.splice(index, 1);
  displayTimers();
}

function displayTimers() {
    const timersList = document.getElementById('timersList');
    timersList.innerHTML = '';
  
    const table = document.createElement('table');
    table.classList.add('timer-table');
  
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Timer</th><th>Time</th><th>Controls</th>';
    table.appendChild(headerRow);
  
    timers.forEach((timer, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>Timer ${index + 1}</td>
        <td>${timer.minutes} : ${timer.seconds}</td>
        <td>
          <button class="knapper" onclick="startTimer(${index})">Start</button>
          <button class="knapper" onclick="deleteTimer(${index})">Delete</button>
        </td>`;
      table.appendChild(row);
    });
  
    timersList.appendChild(table);
  }
    
document.getElementById('stopTimerButton').addEventListener('click', stopTimer);

function stopTimer() {
  fetch('/stop-timer', {
    method: 'POST'
  }).then(response => response.json())
    .then(data => {
      console.log('Timer stoppet:', data);
      fetchActiveTimer(); // Update the time
    })
    .catch(error => {
      console.error('Error stopping the timer:', error);
    });
}
