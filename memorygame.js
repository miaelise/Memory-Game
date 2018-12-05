//GLOBALS-------------
const cards = document.querySelector('.deck');
const pairs = 8;
let openCards = [];
let matched = 0;
let movesCounter = 0;
let time = 0;
let timerOff = true;
let timerId;


//MAIN PROGRAM BODY STARTS --------------
newGame();

//GAMEPLAY ACTION

cards.addEventListener('click', function clickListener() {
  let card = event.target;
  //Listens if card is clicked, and if less than 2 cards are open, flip the cards.
  if (card.classList.contains('card') && openCards.length < 2) {
    openCards.push(card);
    flipCards(card);

    //If 2 cards are open, check for a match.
    if (openCards.length === 2) {

    if (openCards[0].firstElementChild.className ===
      openCards[1].firstElementChild.className) {
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        matched++;
        countMoves();
        performance(movesCounter);
        checkForGameOver(matched);
        openCards = [];
      }

      //If 2 cards are open but not a match, flip them back to hidden.
      else {

        setTimeout(function() {
          flipCards(openCards[0]);
          flipCards(openCards[1]);
          openCards = [];
          }, 1000);
          countMoves();
          performance(movesCounter);
      }
    }
  }
});
//If replay button is clicked, reset the game and reshuffle the deck.
document.querySelector('#replay-btn').addEventListener('click', function() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
});
//TIMER ACTION

//If a card is clicked for the first time, start the game timer.
cards.addEventListener('click', function() {
    if (timerOff) {
      startTimer();
      timerOff = false;
  }
});

//MODAL ACTION

//If the modal close button is clicked, close the modal but leave the game screen.
document.querySelector('.modal-close').addEventListener('click', function() {
  toggleModal()
});

//If the modal replay button is clicked, close the modal and restart the game.
document.querySelector('.modal-replay').addEventListener('click', function() {
  replay();
});

//FUNCTIONS START -----------------

//Provided shuffle function
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//GAMEPLAY FUNCTIONS

function flipCards(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function resetCards() {
  const cards = Array.from(document.querySelectorAll('.deck li'));
  for (let card of cards) {
    card.className = 'card';
  }
  matched = 0;
}

//PERFORMANCE FUNCTIONS

function countMoves() {
  movesCounter++;
  let count = document.querySelector('.moves');
  if (movesCounter === 1) {
    count.innerHTML = movesCounter + " Move";
}
  else {
    count.innerHTML = movesCounter + " Moves";
  }
}

function performance(moves) {
  function removeStar() {
    const stars = document.querySelectorAll('.stars li');
    for (star of stars) {
      if (star.style.display != 'none') {

            star.style.display = 'none';
            break;
          }
    }
  }

    if (moves === 10) {
      removeStar();
      }
    if (moves === 20) {
      removeStar();
      }
    };

//TIMER FUNCTIONS

function startTimer() {
  timerId = setInterval(function() {
    time++;
    showTimer();
  }, 1000);
}

function showTimer() {
  const timer = document.querySelector('.timer');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (seconds < 10 ) {
    timer.innerHTML = minutes + ':0' + seconds;

  }
  else {
    timer.innerHTML = minutes + ':' + seconds;
  }
}

function stopTimer() {
  clearInterval(timerId);
}

function checkForGameOver(num) {
  if (num === pairs) {
    document.querySelector('.status').innerHTML = 'You won! :-)';
    document.querySelector('.status').style.display = 'inline';
    gameOver();
  }
}

//MODAL FUNCTIONS

function toggleModal() {
  const modal = document.querySelector('.modal-bg');
  modal.classList.toggle('hide');
}

function writeModalStats() {
  const timeStat = document.querySelector('.modal-time');
  const clockTime = document.querySelector('.timer').innerHTML;
  const movesStat = document.querySelector('.modal-moves');
  const starsStat = document.querySelector('.modal-stars');
  const stars = getStars();

  timeStat.innerHTML = 'Time = ' + clockTime;
  movesStat.innerHTML = 'Moves = ' + movesCounter;
  starsStat.innerHTML = 'Stars Remaining = ' + stars;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

function gameOver() {
  stopTimer();
  writeModalStats();
  toggleModal();
}

function replay() {
  toggleModal();
  reset();
}

//RESET FUNCTIONS

function reset() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  newGame();
}

function resetClockAndTime() {
  stopTimer();
  timerOff = true;
  time = 0;
  showTimer();
}

function resetMoves() {
  movesCounter = 0;
  document.querySelector('.moves').innerHTML = movesCounter + ' Moves';
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function newGame() {

  const startDeck = Array.from(document.querySelectorAll('.deck li'));
  const newDeck = shuffle(startDeck);

  for (card of newDeck) {
    cards.appendChild(card);
  }
}
