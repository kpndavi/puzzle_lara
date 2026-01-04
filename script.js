const gameGrid = document.getElementById('gameGrid');
const winModal = document.getElementById('winModal');
const coordinatesElement = document.getElementById('coordinates');

// --- CONFIGURATION ---
// REPLACE THIS WITH YOUR ACTUAL COORDINATES OR MESSAGE
const SECRET_COORDINATES = "56.96299° N, 24.12988° E";
// ---------------------

const emojis = ['🚗', '🌹', '💖', '🎁', '🧸', '🔑'];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;
let isLocked = false;

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create Card Elements
function createBoard() {
    shuffle(cards);
    gameGrid.innerHTML = '';
    cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.innerHTML = '❤️'; // Or ?

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.textContent = emoji;

        card.appendChild(cardBack);
        card.appendChild(cardFront);

        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
}

function flipCard() {
    if (isLocked) return;
    if (this === flippedCards[0]) return; // Can't click same card twice

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    isLocked = true; // Prevent clicking others while checking
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.emoji === card2.dataset.emoji;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    flippedCards = [];
    matchedPairs++;
    isLocked = false;

    // Check Win Condition
    if (matchedPairs === emojis.length) {
        setTimeout(showWin, 500);
    }
}

function unflipCards() {
    setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards = [];
        isLocked = false;
    }, 1000); // 1 second delay
}

function showWin() {
    coordinatesElement.textContent = SECRET_COORDINATES;
    winModal.classList.remove('hidden');

    // Optional: simple confetti effect or sound could go here
    console.log("Winner!");
}

// Start Game
createBoard();
