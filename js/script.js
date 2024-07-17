const cards = document.querySelectorAll(".memory-card");
const game = document.querySelector(".memory-game");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cptCoup = 0;
function flipCard() {
  if (lockBoard) return;
  
  if (this === firstCard) return;
  console.log(cptCoup);
  this.classList.add("flip");
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log(firstCard.dataset.framework);
    
    return;
  }
  
  secondCard = this;
  checkForMatch();
  cptCoup++;
  let contentDiv = document.getElementById("score");
  contentDiv.innerHTML = `${cptCoup}`;
  console.log(secondCard.dataset.framework);
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.add("end");
    secondCard.classList.add("end");

    resetBoard();
    checkForWin();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("end");
    card.addEventListener("click", flipCard);
  });
  game.classList.add("blackout");
  setTimeout(() => {
    game.classList.remove("blackout");
  }, 1000);
  shuffle();
  resetBoard();
  cptCoup = 0;
  let contentDiv = document.getElementById("score");
  contentDiv.innerHTML = `${cptCoup}`;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    resetGame();
  }
});

shuffle();

function checkForWin() {
  let allEnded = true;
  cards.forEach((card) => {
    if (!card.classList.contains("end")) {
      allEnded = false;
    }
  });

  if (allEnded) {
    let victoryDiv = document.getElementById("victory-message");
    victoryDiv.innerHTML = `Bravo vous avez remportez la partie en : ${cptCoup} coups !`;
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    cards.forEach((card) => card.classList.add("flip"));
  }
});
