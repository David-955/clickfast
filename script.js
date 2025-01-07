let count = 0;
let timerStarted = false;
let timeLeft = 5;

document
  .getElementById("button-clicker")
  .addEventListener("click", () => {
    if (!timerStarted) {
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
          document.getElementById("score").innerHTML = `Ton score est : ${count}`;
        }
      }, 1000);
    }

    count++;
    document.getElementById("counter").innerHTML = count;

  });

  

