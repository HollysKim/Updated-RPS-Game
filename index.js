const images = document.querySelectorAll('img');
let scoreText = document.getElementById('scoreText');
let score = document.getElementById('score');
const btn = document.querySelector('button');
const restart = document.querySelector('#restart');
let gameOn = true;
let user_score = 0;
let comp_score = 0;


function computerPlay() {
    let random_num = Math.floor(Math.random() * 3);
    let hands = ["rock", "paper", "scissors"];
    return(hands[random_num]);
}

function playRound(playerSelection, computerSelection) {
    let winner = "";
    if(playerSelection === computerSelection) {
        winner = "";
    }
    else if((playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissors" && computerSelection == "paper") || (playerSelection == "rock" && computerSelection == "scissors")) {
        winner = "player";
        scoreText.textContent = (`You win! ${playerSelection} beats ${computerSelection}`);
    }
    else if((playerSelection == "rock" && computerSelection == "paper") || (playerSelection== "paper" && computerSelection == "scissors") || (playerSelection == "scissors" && computerSelection == "rock")) {
        winner = "computer";
        scoreText.textContent = (`You lose! ${computerSelection} beats ${playerSelection}`);
    }
    return winner;
}

function game() {
    let playerSelection;
    images.forEach((image) => {
        image.addEventListener('click', function(e) {
            if(gameOn) {
                let computerSelection = computerPlay();
                if(e.target.id === 'rock') {
                    playerSelection = 'rock';
                }
                else if(e.target.id === 'paper') {
                    playerSelection = 'paper';
                }
                else {
                    playerSelection = 'scissors';
                }
                let victor = playRound(playerSelection, computerSelection);
                handleResult(victor);
                endGame();
            }
        });
    });
}


function handleResult(victor) {
        if (victor == "computer") {
            //console.log(victor + comp_score);
            comp_score++;
            score.textContent = `${user_score} - ${comp_score}`;
        } 
        else if (victor == "player") {
            //console.log(victor + user_score);
            user_score++;
            score.textContent = `${user_score} - ${comp_score}`;
        }
}

function endGame() {
    if(user_score < 5 && comp_score < 5){
        return;
    }
    else if(user_score > comp_score) {
        scoreText.textContent = "You won the game!";
    }
    else {
        scoreText.textContent = "You lost the game!";
    }
    images.forEach((img) => {
        img.classList.remove('active');
        img.classList.add('blackedOut');
    })
    gameOn = false;
    restart.textContent = 'Click the button to restart';
    btn.removeAttribute('id');
    btn.addEventListener('click', restartGame);
}

function restartGame() {
    user_score = 0;
    comp_score = 0;
    images.forEach((img => {
        img.classList.add('active');
        img.classList.remove('blackedOut');
    }));
    restart.textContent = '';
    score.textContent = '';
    scoreText.textContent = '';
    btn.setAttribute('id', 'hide');
    gameOn = true;
}

game();