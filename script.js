let count = 0;
let timerStarted = false;
let timeLeft = 5;

function handleGameButton() {
  document.getElementById("button-clicker").addEventListener("click", () => {
    if (!timerStarted) {
      document.getElementById("button-reset").disabled = true;
      timerStarted = true;
      count = 0;
      timeLeft = 5;
      document.getElementById("button-clicker").disabled = false;
      document.getElementById("counter").innerHTML = count;
      document.getElementById(
        "timer"
      ).innerHTML = `Temps restant : ${timeLeft} secondes !`;

      const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById(
          "timer"
        ).innerHTML = `Temps restant : ${timeLeft} secondes !`;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          document.getElementById("button-clicker").disabled = true;
          document.getElementById("button-reset").disabled = false;
          document.getElementById(
            "score"
          ).innerHTML = `Ton score est : ${count}`;
          //envoi score api ici
          if (count > parseInt(localStorage.getItem("personalBest") || "0")) {
            localStorage.setItem("personalBest", count);
            postData();
            // reset api
            getData();
            displayScores();
            document.getElementById("scores-list").innerHTML = "";
          }
        }
      }, 1000);
    }

    count++;
    document.getElementById("counter").innerHTML = count;
  });
}

function handleResetButton() {
  const resetButton = document.getElementById("button-reset");

  resetButton.addEventListener("click", () => {
    timerStarted = false;
    count = 0;
    document.getElementById("score").innerHTML = "";
    document.getElementById("counter").innerHTML = `${count}`;
    document.getElementById("timer").innerHTML = "Temps : 5 secondes !";
    document.getElementById("button-clicker").disabled = false;
  });
}

handleGameButton();
handleResetButton();

const postData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";
  const data = {
    createdAt: new Date().toISOString(),
    username: "David Pro+ Ultra 512go",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: count,
    website_url: "onyj.github.io/ClickFast",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data posted successfully:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

const getData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data retrieved successfully:", data);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

const usernameToDelete = "";
const deleteUserByUsername = async (username) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter((user) => user.username === username);

    // Étape 2 : Supprimer chaque utilisateur trouvé
    for (const user of usersToDelete) {
      const deleteResponse = await fetch(`${url}/${user.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        console.error(
          `Error deleting user with ID ${user.id}:`,
          deleteResponse.statusText
        );
      } else {
        console.log(`User with ID ${user.id} deleted successfully.`);
      }
    }

    // Étape 3 : Ajouter un nouvel utilisateur
    // const newUserData = {
    //   createdAt: new Date().toISOString(),
    //   username: "JohnDoe", // Vous pouvez changer le nom d'utilisateur si nécessaire
    //   avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    //   score: 100,
    //   website_url: "onyj.github.io/ClickFast",
    // };

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!postResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserResult = await postResponse.json();
    console.log("New user posted successfully:", newUserResult);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Appel de la fonction pour supprimer et ajouter un utilisateur
deleteUserByUsername(usernameToDelete);

const displayScores = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const scoresList = document.getElementById("scores-list");

    // Vider la liste des scores avant d'ajouter les nouveaux scores
    scoresList.innerHTML = "";

    data.forEach((score) => {
      const listItem = document.createElement("li");

      // Créer une balise img pour l'avatar
      const avatarImg = document.createElement("img");
      avatarImg.src = score.avatar;
      avatarImg.alt = `${score.username}'s avatar`;

      // Ajouter l'avatar et le score à l'élément de liste
      listItem.appendChild(avatarImg);
      listItem.appendChild(
        document.createTextNode(` ${score.username}: ${score.score}`)
      );
      scoresList.appendChild(listItem);
    });

    console.log("Scores displayed successfully:", data);
  } catch (error) {
    console.error("Error displaying scores:", error);
  }
};

// Appel de la fonction pour afficher les scores
displayScores();
