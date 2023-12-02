const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let activeTimer = null;

// Start en timer
app.post('/start-timer', (req, res) => {
  const { timer, index } = req.body;
  activeTimer = {
    duration: timer.minutes * 60 + timer.seconds,
    index: index,
    startTime: Date.now()
  };
  res.json({ message: 'Timer startet!' });
});

// Stopper timeren
app.post('/stop-timer', (req, res) => {
  activeTimer = null; // Nullstiller den aktive timeren
  res.json({ message: 'Timer stoppet' });
});

// Henter status for den aktive timeren
app.get('/active-timer', (req, res) => {
  if (activeTimer) {
    const timeElapsed = Math.floor((Date.now() - activeTimer.startTime) / 1000);
    const timeRemaining = activeTimer.duration - timeElapsed;

    // Send status om at timeren er aktiv, med gjenværende tid
    res.json({ active: true, duration: timeRemaining });
  } else {
    // Send status om at ingen timer er aktiv
    res.json({ active: false, duration: 0 });
  }
});

app.listen(port, () => {
  console.log(`Server kjører på http://localhost:${port}`);
});
