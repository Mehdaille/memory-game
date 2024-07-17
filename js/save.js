const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log(firstCard.dataset.framework);

    return;
  }

  secondCard = this;
  console.log(secondCard.dataset.framework);
  checkForMatch();
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
  firstCard.classList.add("end");
  secondCard.classList.add("end");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
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

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    cards.forEach((card) => card.classList.add("flip"));
  }
});

cards.forEach((card) => {
  if (card.classList.contains("end")) {
    cards.forEach((card) => {
      card.classList.remove("end");
    }); 
  }
});

cards.forEach((card) => card.addEventListener("click", flipCard));
