const { JSDOM } = require("jsdom");

const { window } = new JSDOM(
  `
  <div>
    <button id="button-clicker">Click !!!</button>
    <div id="counter">0</div>
    <div id="timer">Temps : 5 secondes !</div>
    <button id="button-reset" disabled>Reset</button>
  </div>
  `
);

global.document = window.document;

let count = 0;
let timeLeft = 5;

document
  .getElementById("button-clicker")
  .addEventListener("click", () => {
    count++;
    document.getElementById("counter").innerHTML = count;
    startTimer();
    document.getElementById("button-clicker").disabled = false;
    document.getElementById("button-reset").disabled = true;
  });

  // partie de mon timer, score (repris du script.js)
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

describe("Button Clicker", () => {
  beforeEach(() => {
    count = 0;
    document.getElementById("counter").innerHTML = count;
  });

   // Test pour vérifier que le score s'incrémente lorsque le bouton est cliqué
  test("Vérifiez que le score s'incrémente correctement", () => {
       // Simuler un clic sur le bouton
      // Utilisez une méthode pour cliquer sur le bouton et vérifiez le score
    const button = document.getElementById("button-clicker");

    button.click();
    expect(document.getElementById("counter").innerHTML).toBe("1");

    button.click();
    expect(document.getElementById("counter").innerHTML).toBe("2");

    button.click();
    button.click();
    expect(document.getElementById("counter").innerHTML).toBe("4");
  });

 // Test pour vérifier que le timer fonctionne correctement
 test("Vérifiez que le timer décompte correctement", (done) => {
  // Simuler un clic pour démarrer le jeu
  // Attendez un certain temps et vérifiez que le timer affiche 0
  const button = document.getElementById("button-clicker");
  const timer = document.getElementById("timer");

  button.click();

  setTimeout(() => {
    // document.getElementById("timer").innerHTML = `Temps restant : ${timeLeft} secondes !`;
    expect(document.getElementById("timer").innerHTML).toBe(`Temps restant : 3 secondes !`);
    done();
  }, 2000);
  });

   // Test pour vérifier que le jeu ne permet pas de cliquer après la fin du timer
 test("Vérifiez que le score ne s'incrémente pas après la fin du timer", (done) => {
  // Simuler un clic pour démarrer le jeu
  // Attendez que le timer expire, puis essayez de cliquer à nouveau
  // Vérifiez que le score n'a pas changé

  const button = document.getElementById("button-clicker");

  button.click();

  setTimeout(() => {
    button.click();
    expect(document.getElementById("counter").innerHTML).toBe("3");
    done();
  }, 6000);

  button.click();

  setTimeout(() => {
    button.click();
    expect(document.getElementById("counter").innerHTML).toBe("3");
    done();
  }, 1000);
  });

   // Test pour vérifier que le bouton de réinitialisation fonctionne correctement
 test("Vérifiez que le bouton de réinitialisation remet le score à zéro", () => {
  // Simuler quelques clics pour augmenter le score
  // Vérifiez que le score est supérieur à zéro
  // Simuler un clic sur le bouton de réinitialisation
  // Vérifiez que le score a été remis à zéro

  const button1 = document.getElementById("button-clicker");

  button1.click();
  button1.click();
  button1.click();

  const button2 = document.getElementById("button-reset");

  button2.click();

  setTimeout(() => {
  expect(document.getElementById("counter").innerHTML).toBe("0");
  }, 1000);
  });

});