const cards = [
  { id: 1, value: 'A' },
  { id: 2, value: 'A' },
  { id: 3, value: 'B' },
  { id: 4, value: 'B' },
  { id: 5, value: 'C' },
  { id: 6, value: 'C' },
  { id: 7, value: 'D' },
  { id: 8, value: 'D' },
  { id: 9, value: 'E' },
  { id: 10, value: 'E' },
  { id: 11, value: 'F' },
  { id: 12, value: 'F' },
];

let score = 0;
let flippedCards = [];
let matchedCards = 0;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const board = document.querySelector('.game-board');
  shuffleCards(cards);
  cards.forEach(card => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = card.id;
    div.dataset.value = card.value;
    div.addEventListener('click', flipCard);
    board.appendChild(div);
  });
}

function flipCard(e) {
  let cardValue = e.target.dataset.value;
  if (flippedCards.length < 2) {
    this.classList.add('flipped'+cardValue);
    flippedCards.push(this);
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  if (card1.dataset.value === card2.dataset.value) {
    score += 10;
    matchedCards += 2;
    if (matchedCards == cards.length) {
      const win = document.querySelector(".win");
      const scoreWin = document.querySelector(".scoreWin");
      scoreWin.innerText = score + " points"
      win.classList.add("active");
    }
    document.querySelector('.score').textContent = `Score: ${score}`;
    flippedCards.forEach(card => {
      card.classList.add('matched');
      card.removeEventListener('click', flipCard);
    });
  } else if (card1.dataset.value != card2.dataset.value) {
    score -= 5;
    document.querySelector('.score').textContent = `Score: ${score}`;
    flippedCards.forEach(card => {
      let cardValue = card.dataset.value;
      card.classList.remove('flipped'+cardValue);
      card.addEventListener('click', flipCard);
    });
  }
  flippedCards = [];
}

function restartGame() {
  score = 0;
  document.querySelector('.score').textContent =`Score: ${score}`;
  flippedCards = [];
  matchedCards = 0;
  const win = document.querySelector(".win")
  win.classList.remove("active");
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.removeEventListener('click', flipCard);
    card.parentNode.removeChild(card);
  });
  createBoard();
}

createBoard();
document.querySelector('.restart-button').addEventListener('click', restartGame);
