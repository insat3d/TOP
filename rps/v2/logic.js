function computerPlay() {
  const RAND = Math.round(Math.random() * 100) % 3;
  return RAND === 0 ? 'Rock' : RAND === 1 ? 'Paper' : 'Scissors';
}

function selectWinner(playerSelection, computerSelection) {
  let message = `Round ${++round}: You selected ${playerSelection}. Computer selected ${computerSelection}. `;

  if (playerSelection === computerSelection) {
    return message + 'The game is a Tie';
  }
  switch (playerSelection) {
    case 'Rock':
      return (
        message +
        (computerSelection === 'Scissors'
          ? 'You win! Rock beats Scissors.'
          : 'You lose! Paper beats Rock.')
      );

    case 'Paper':
      return (
        message +
        (computerSelection === 'Scissors'
          ? 'You lose! Scissors beat Paper.'
          : 'You win! Paper beats Rock.')
      );

    case 'Scissors':
      return (
        message +
        (computerSelection === 'Rock'
          ? 'You lose! Rock beats Scissors.'
          : 'You win! Scissors beat Paper.')
      );
  }
}

function playRound() {
  const playerSelection = this.dataset.card;
  let playerScore = document.querySelector('.playerScore').textContent;
  let computerScore = document.querySelector('.compScore').textContent;
  let messageBox = document.querySelector('.messageBox').textContent;

  let result = selectWinner(playerSelection, computerPlay());
  result.includes('win')
    ? playerScore++
    : result.includes('lose')
    ? computerScore++
    : 0;

  messageBox += `\r\n ${result}`;

  if (round === 5) {
    // document.querySelector('.result').textContent = ""
    messageBox += `\r\nFinal Score: ${playerScore} : ${computerScore}\n`;
    document.querySelector('.result').textContent =
      playerScore > computerScore
        ? 'You won!'
        : playerScore < computerScore
        ? 'You lost.'
        : "It's a tie!";
    removeListeners();
    document.querySelector('.reset').classList.remove('hidden');
  }
  document.querySelector('.messageBox').textContent = messageBox;
  document.querySelector('.playerScore').textContent = playerScore;
  document.querySelector('.compScore').textContent = computerScore;
}

function addListeners() {
  const inputs = document.querySelectorAll('.card');
  inputs.forEach((input) => input.addEventListener('click', playRound));
}

function removeListeners() {
  const inputs = document.querySelectorAll('.card');
  inputs.forEach((input) => input.removeEventListener('click', playRound));
}

function resetGame() {
  round = 0;
  document.querySelector('.messageBox').textContent = document.querySelector(
    '.result'
  ).textContent = '';
  document.querySelector('.playerScore').textContent = document.querySelector(
    '.compScore'
  ).textContent = 0;
  document.querySelector('.reset').classList.add('hidden');
  addListeners();
}

function init() {
  const btnReset = document.querySelector('#btnReset');
  btnReset.addEventListener('click', resetGame);
  document.querySelector('.reset').classList.add('hidden');
  resetGame();
}

let round;
init();
