const CARDS = [...document.getElementsByClassName("game-card")];

const CARD_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
// const CARD_VALUES = [...Array(14).keys()].splice(1);
const CARD_SUITS = ["Spades", "Hearts", "Clubs", "Diamonds"];
// This is the card array using maps, but it creates a 3d array.
// const CARD_ARRAY = CARD_VALUES.map(c => {
//   return CARD_SUITS.map(s => [c, s]);
// });
const PICTURE_VALUES = {
  1: "A",
  11: "J",
  12: "Q",
  13: "K"
}

let newPack = [],
    currentDeck = [],
    currentCard = 0,
    nextCard = 1,
    wins = 0,
    losses = 0;



// This should really use maps but doing so creates a 3d array.
function generateNewPack() {
  newPack = [];
  for (let i = 0; i < CARD_VALUES.length; i++) {
    for (let j = 0; j < CARD_SUITS.length; j++) {
      newPack.push([CARD_VALUES[i], CARD_SUITS[j]]);
    }
  }
  assignCardValues();
}

function assignCardValues() {
  currentDeck = [];
  CARDS.map(c => currentDeck.push(generateRandomCard()));
  renderCards();
}

function generateRandomCard() {
  const NEW_CARD = Math.floor(Math.random() * newPack.length);
  return newPack.splice(NEW_CARD, 1).flat();
}

function getPictureCardValue(card) {
  return PICTURE_VALUES.hasOwnProperty(card[0]) ?
    PICTURE_VALUES[card[0]].concat(` ${card[1]}`) : card.join(" ");
}

function renderCards() {
  CARDS.map((c, i) => c.innerHTML = getPictureCardValue(currentDeck[i]));
}

function guess(op) {
  compareCards(currentDeck[nextCard][0], op.target.id) ?
    nextCard === 12 ? winGame() :
    loadNextCard() : loseGame();
}

function compareCards(nc, op) {
  return nc === 1 ? true : op == "lower" ?
      nc <= currentDeck[currentCard][0] :
      nc >= currentDeck[currentCard][0];
}

function loadNextCard() {
  CARDS[nextCard].style.opacity = "0.5"; // Flip card over
  nextCard++;
  currentCard++;
  CARDS[0].innerHTML = getPictureCardValue(currentDeck[currentCard]);
}

function winGame() {
  CARDS[nextCard].style.opacity = "0.5"; // Flip card over
  wins++;
  renderWinsAndLosses();
}

function loseGame() {
  losses++;
  renderWinsAndLosses();
  generateNewPack();
  CARDS.map(c => c.style.opacity = "1");
  currentCard = 0;
  nextCard = 1;
}

function renderWinsAndLosses() {
  document.getElementById("win-count").innerHTML = wins;
  document.getElementById("loss-count").innerHTML = losses;
}



// EVENT LISTENERS AND INITIAL PAGE SETUP
window.onload = () => {
  [...document.getElementsByClassName("guess-button")].map(b => b.addEventListener("click", (event) => guess(event)));

  generateNewPack();
  renderWinsAndLosses();
}
