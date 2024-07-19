// Sélectionne tous les éléments avec la classe "memory-card" et les stocke dans la variable "cards"
const cards = document.querySelectorAll(".memory-card");
// Sélectionne l'élément avec la classe "memory-game" et le stocke dans la variable "game"
const game = document.querySelector(".memory-game");

// Initialise des variables pour suivre l'état du jeu
let hasFlippedCard = false; // Indique si une carte a été retournée
let lockBoard = false; // Empêche de retourner d'autres cartes pendant une vérification
let firstCard, secondCard; // Stocke les deux cartes retournées pour les comparer
let cptCoup = 0; // Compteur de coups

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12); // Génère une position aléatoire
    card.style.order = randomPos; // Applique la position aléatoire à la carte
  });
}

shuffle(); // Mélange les cartes au début du jeu

function flipCard() {
  if (lockBoard) return; // Empêche de retourner une carte si le tableau est verrouillé
  if (this === firstCard) return; // Empêche de retourner la même carte deux fois

  this.classList.add("flip"); // Ajoute la classe "flip" pour retourner la carte

  if (!hasFlippedCard) {
    // Si c'est la première carte retournée
    hasFlippedCard = true;
    firstCard = this; // Stocke cette carte comme la première carte
    return;
  }

  secondCard = this; // Stocke cette carte comme la deuxième carte
  checkForMatch(); // Vérifie si les deux cartes correspondent
  cptCoup++; // Incrémente le compteur de coups
  document.getElementById("score").innerHTML = `${cptCoup}`; // Affiche le compteur de coups
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // Compare les données des deux cartes

  if (isMatch) {
    // Si elles correspondent, désactive les cartes, sinon les retourne
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  lockBoard = true; // Verrouille le tableau pendant que les cartes sont désactivées

  setTimeout(() => {
    firstCard.removeEventListener("click", flipCard); // Désactive l'écouteur d'événements pour la première carte
    secondCard.removeEventListener("click", flipCard); // Désactive l'écouteur d'événements pour la deuxième carte
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.add("end"); // Ajoute la classe "end" pour indiquer que la carte a été trouvée
    secondCard.classList.add("end");

    resetBoard(); // Réinitialise le tableau
    checkForWin(); // Vérifie si toutes les cartes ont été trouvées
  }, 1000); // Délai d'une seconde
}

function unflipCards() {
  lockBoard = true; // Verrouille le tableau pendant que les cartes sont retournées

  setTimeout(() => {
    firstCard.classList.remove("flip"); // Retourne la première carte
    secondCard.classList.remove("flip"); // Retourne la deuxième carte

    resetBoard(); // Réinitialise le tableau
  }, 1500); // Délai d'une seconde et demie
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; // Réinitialise les variables hasFlippedCard et lockBoard à false
  [firstCard, secondCard] = [null, null]; // Réinitialise les variables firstCard et secondCard à null
}

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip"); // Retourne toutes les cartes
    card.classList.remove("end"); // Enlève l'indicateur de cartes trouvées
    card.addEventListener("click", flipCard); // Réactive les écouteurs d'événements
  });
  game.classList.add("blackout"); // Ajoute un effet visuel
  setTimeout(() => {
    game.classList.remove("blackout"); // Enlève l'effet visuel après une seconde
  }, 1000);
  shuffle(); // Mélange les cartes
  resetBoard(); // Réinitialise le tableau
  cptCoup = 0; // Réinitialise le compteur de coups
  document.getElementById("score").innerHTML = `${cptCoup}`; // Réinitialise l'affichage du compteur de coups
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    resetGame(); // Réinitialise le jeu lorsque la barre d'espace est pressée
  }
});

function checkForWin() {
  let allEnded = true;
  cards.forEach((card) => {
    if (!card.classList.contains("end")) {
      allEnded = false; // Si une carte n'a pas été trouvée, le jeu n'est pas encore gagné
    }
  });

  if (allEnded) {
    let victoryDiv = document.getElementById("victory-message");
    victoryDiv.innerHTML = `Bravo vous avez remportez la partie en : ${cptCoup} coups !`; // Affiche un message de victoire
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard)); // Ajoute l'écouteur d'événement de clic à chaque carte

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    cards.forEach((card) => card.classList.add("flip")); // Retourne toutes les cartes lorsque la touche Échap est pressée
  }
});