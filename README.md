Lien pour y jouer : https://david-955.github.io/clickfast/

# ClickFast ⏩

Sois le plus rapide des clickers du game ⚡

## Comment utiliser le projet ?

Lancez `index.html` et voilà !

## Tips

### Terminal

#### 1. Raccourcis

- `tab` : appuyer sur tab pour compléter le mot qu'on est en train d'écrire

#### 2. Commandes

- `cd` : se déplacer vers un dossier : `cd MonDossier` ou `cd Mondossier/sous-dossier/sous-sous-dossier`
  `cd .. = remonter dans dossier parent`
- `ls` : lister les éléments dans le dossier où on se trouve
- `git init` : créer un repository (ou dépot) git dans le dossier où on se trouve

#### 3. Commandes Git

- `git status` : Montre les fichiers qui ont été modifiés mais pas encore sauvegardés.
- `git diff` ou `git diff mon_fichier` : Affiche les changements faits par rapport à la dernière sauvegarde, pour tous les fichiers ou un fichier spécifique.
- `git log` : voir les commits réalisés
- `git add mon_fichier` : ajouter des fichiers à sauvegarder
- `git commit -m "J'ai fait telle chose` : nommer une nouvelle sauvegarde
- `git push` : envoyer les sauvegardes vers GitHub
- `git remote -v` : voir les connexions entre notre dossier local (dans l'ordi) et les éléments en ligne (connexion au repository GitHub, ou autres)

### Comment le projet a été créé ?

#### 1. Initialisation du projet

Aller ou on veut pour créer un projet dans un endroit rangé
ex:

```bash
  cd Desktop

  mkdir ClickFast

  ls # on voit qu'on a un dossier ClickFast qui a été créé
```

Aller dans le dossier pour faire un `git init`.  
Lier le repository créé en ligne à ce projet.

### 2. Création des fichiers

Créer un fichier `index.html`, `style.css`, `script.js`. Ils vont chacun avoir leur propre rôle :

- `index.html` : le contenu du site : titre, bouton, score
- `style.css` : le styling
- `script.js` : la détection de clic sur un bouton, et l'affichage du nombre de clics dans l'élément de score

### 3. Docker

Conteneuriser le projet dans un Docker :

- créer un Dockerfile
- trouver comment faire pour envelopper le projet dans un Dockerfile, et le lancer depuis docker. 
  - Faire une simple recherche internet, ex: `html css docker`.  
    On se rend compte que la plupart des personnes recommandent nginx qui est super simple et adapté au lancement de sites statiques.
  - Solution : il y a toujours plein de solutions possibles.
    Moi j'ai appliqué [cette réponse](https://thriveread.com/run-html-with-docker-and-nginx/). 
    D'autres ressources d'internet sur comment faire ça facilement disent à peu près la même chose : [omkara18 de dev.to](https://dev.to/omkara18/deploying-a-static-website-with-docker-a-comprehensive-guide-3gk), [Zulfikar sur medium](https://medium.com/@zul.m/deploying-a-static-html-site-with-docker-and-nginx-6f5bcdcbc650)
- maintenant, faire une commande comme `docker run -d -p 8080:80 clickfast` devrait lancer le projet conteneurisé !

### 4. CI/CD


## Comment manipuler l'API
```javascript
// ENVOYER MON SCORE

const postData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username: "JohnDoe",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: 100,
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

postData();

// LIRE LES SCORES

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

getData();

// REMPLACER MON ANCIEN SCORE AVEC LE NOUVEAU

const usernameToDelete = "JohnDoe";

const deleteUserByUsername = async (username) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter(
      (user) => user.username === username
    );

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
    const newUserData = {
      createdAt: new Date().toISOString(),
      username: "JohnDoe", // Vous pouvez changer le nom d'utilisateur si nécessaire
      avatar:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
      score: 100,
      website_url: "onyj.github.io/ClickFast",
    };

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
```
