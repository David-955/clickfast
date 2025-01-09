let count = 0;
let timerStarted = false;
let timeLeft = 5;

function handleGameButton() {
document
  .getElementById("button-clicker")
  .addEventListener("click", () => {
    if (!timerStarted) {
      document.getElementById("button-reset").disabled = true;
      timerStarted = true;
      count = 0;
      timeLeft = 5;
      document.getElementById("button-clicker").disabled = false;
      document.getElementById("counter").innerHTML = count;
      document.getElementById("timer").innerHTML = `Temps restant : ${timeLeft} secondes !`;
      document.getElementById("score").innerHTML = '';

      const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerHTML = `Temps restant : ${timeLeft} secondes !`;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          document.getElementById("button-clicker").disabled = true;
          document.getElementById("button-reset").disabled = false;
          document.getElementById("score").innerHTML = `Ton score est : ${count}`;
        }
      }, 1000);
    }

    count++;
    document.getElementById("counter").innerHTML = count;

  })
};

  function handleResetButton() {
    const resetButton = document.getElementById("button-reset");
  
    resetButton.addEventListener("click", () => {
      // canPlay = true;
      timerStarted = false;
      count = 0;
      document.getElementById("score").innerHTML = '';
      document.getElementById("counter").innerHTML = `${count}`;
      document.getElementById("timer").innerHTML = 'Temps : 5 secondes !';
      document.getElementById("button-clicker").disabled = false;
    });
  }
  
  handleGameButton();
  handleResetButton();

