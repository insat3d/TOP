/*

Your game is going to play against the computer, so begin with a function 
called computerPlay that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. 
We’ll use this function in the game to make the computer’s play.

*/

function computerPlay() {
  const RAND = Math.round(Math.random() * 100) % 3;
  return RAND === 0 ? "Rock" : RAND === 1 ? "Paper" : "Scissors";
}

/*
Write a function that plays a single round of Rock Paper Scissors. 
The function should take two parameters - the playerSelection and 
computerSelection - and then return a string that declares the winner 
of the round like so: "You Lose! Paper beats Rock"
*/

/*
Outcomes:
Rock beats Scissors
Scissors beat Paper
Paper beats Rock
*/

function selectWinner(playerSelection, computerSelection) {
  let message = `You selected ${playerSelection}. Computer selected ${computerSelection}. \n`;

  if (playerSelection === computerSelection) {
    return message + "The game is a Tie";
  }
  switch (playerSelection) {
    case "Rock":
      return (
        message +
        (computerSelection === "Scissors"
          ? "You win! Rock beats Scissors."
          : "You lose! Paper beats Rock.")
      );

    case "Paper":
      return (
        message +
        (computerSelection === "Scissors"
          ? "You lose! Scissors beat Paper."
          : "You win! Paper beats Rock.")
      );

    case "Scissors":
      return (
        message +
        (computerSelection === "Rock"
          ? "You lose! Rock beats Scissors."
          : "You win! Scissors beat Paper.")
      );
  }
}

function playRound() {
  // Prompt for user choice.
  // Fix response to sentence case.
  // Call selectWinner() and return result

  //   let playerSelection = prompt("Enter your choice").toLowerCase();
  //   playerSelection =
  //     playerSelection.substring(0, 1).toUpperCase() +
  //     playerSelection.substring(1);

  //   return selectWinner(playerSelection, computerPlay());

  return selectWinner(computerPlay(), computerPlay());
}

function game() {
  /* Write a NEW function called game(). Use the previous function 
  inside of this one to play a 5 round game that keeps score and reports 
  a winner or loser at the end.
  */

  let playerScore = 0,
    computerScore = 0,
    message = "";

  for (let i = 0; i < 5; i++) {
    let result = playRound();
    result.includes("win")
      ? playerScore++
      : result.includes("lose")
      ? computerScore++
      : 0;

    message += `Round ${
      i + 1
    }: ${result} \nScore: ${playerScore} : ${computerScore}\n`;
  }

  message +=
    `\nFinal Score: ${playerScore} : ${computerScore}\n` +
    (playerScore > computerScore
      ? "Yay! You won."
      : playerScore < computerScore
      ? "Sorry... you lost"
      : "It's a tie!");

  console.log(message);
}
