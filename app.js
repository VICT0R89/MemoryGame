let score = 0;
let flippedCards = [];
let matchedCards = 0;
let actualLvl = 0;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard(array) {
  const board = document.querySelector('.game-board');
  board.innerHTML = ""
  shuffleCards(array);
  array.forEach(card => {
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
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  if (card1.dataset.value === card2.dataset.value) {
    score += 10;
    matchedCards += 2;
    if (matchedCards == lvls[actualLvl].length) {
      actualLvl += 1
      if(actualLvl == 3){
        const board = document.querySelector('.game-board');
        board.style.gridTemplateColumns = "repeat(4, 1fr)";
        const win = document.querySelector(".win");
        const scoreWin = document.querySelector(".scoreWin");
        scoreWin.innerText = score + " points"
        win.classList.add("active");
      }
      if(actualLvl == 2){
        const board = document.querySelector('.game-board');
        board.style.gridTemplateColumns = "repeat(5, 1fr)";
      }
      flippedCards = [];
      matchedCards = 0;
      createBoard(lvls[actualLvl])
    }
    document.querySelector('.score').textContent = `Score: ${score}`;
    flippedCards.forEach(card => {
      card.classList.add('matched');
      card.removeEventListener('click', flipCard);
    });
  } else if (card1.dataset.value != card2.dataset.value) {
    score -= 2;
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
  actualLvl = 0
  const win = document.querySelector(".win")
  win.classList.remove("active");
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.removeEventListener('click', flipCard);
    card.parentNode.removeChild(card);
  });
  createBoard(lvls[actualLvl]);
}

createBoard(lvls[actualLvl]);
document.querySelector('.restart-button').addEventListener('click', restartGame);
