
let userScore = 0;
let computerScore = 0;
const choices = document.querySelectorAll('.option');

const optionsText = ["rock", "scissors", "paper"];
const choiceDisplay = document.querySelector('.rock-paper-scissors');
const userScoreDisplay = document.querySelector('.score-value-player');
const computerScoreDisplay = document.querySelector('.score-value-computer');
const resultDisplay = document.querySelector('.result');
const hoorayDisplay = document.querySelector('.hooray')
const nextButton = document.querySelector('.next')
const scoreboard = document.querySelector('.container')

nextButton.style.display = "none";
hoorayDisplay.style.display = "none";
resultDisplay.style.display = "none";

const rulesBtn = document.getElementById('rulesBtn');
const rulesModal = document.getElementById('rulesModal');
const closeBtn = document.getElementById('closeBtn');

nextButton.addEventListener('click',()=>{
    nextButton.style.display = "none";
    scoreboard.style.display = "none";
    resultDisplay.style.display = "none";
    hoorayDisplay.style.display = "flex";
    const playAgainButton = document.querySelector("#play");

    playAgainButton.addEventListener('click', () => {
        console.log("hii")
        document.location.reload();
    })
})


rulesBtn.addEventListener('click', () => {
    rulesModal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.remove('active');
});

rulesModal.addEventListener('click', (e) => {
    if (e.target === rulesModal) {
        rulesModal.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rulesModal.classList.contains('active')) {
        rulesModal.classList.remove('active');
    }
});


const showResults = function (result, userChoiceId, computerChoiceId) {
    const optionsUser = [
        document.getElementById('user-1'),
        document.getElementById('user-2'),
        document.getElementById('user-3'),
    ];
    const optionsComputer = [
        document.getElementById('computer-1'),
        document.getElementById('computer-2'),
        document.getElementById('computer-3'),
    ];

    optionsUser.forEach((option) => {
        option.style.display = "none";
    });

    optionsComputer.forEach((option) => {
        option.style.display = "none";
    })
    optionsUser[userChoiceId].style.display = "block";
    optionsComputer[computerChoiceId].style.display = "block";
    const resultText = document.getElementById('result-text-h1');
    const resultTextH3 = document.getElementById('result-text-h3');
    const playAgainButton = document.querySelector('#play-again');

    playAgainButton.addEventListener('click', () => {
        document.location.reload();
    })
    if (result != 0) {
        playAgainButton.textContent = "PLAY AGAIN";
        resultTextH3.textContent = "AGAINST PC";
        if (result == 1) {
            addAuraEffect(optionsUser[userChoiceId]);
            resultText.textContent = "YOU WIN";

        } else {
            addAuraEffect(optionsComputer[computerChoiceId]);
            resultText.textContent = "YOU LOST";
        }
    }

}
function addAuraEffect(element) {
    const wrapper = document.createElement('div');
    wrapper.className = 'aura-wrapper';

    element.parentNode.insertBefore(wrapper, element);

    wrapper.appendChild(element);

    for (let i = 0; i < 7; i++) {
        const ring = document.createElement('div');
        ring.className = 'aura-ring';
        ring.style.animationDelay = `${i * 0.5}s`;
        wrapper.insertBefore(ring, element);
    }

    element.style.position = 'relative';
    element.style.zIndex = '10';
}

const getScoresLocally = () => {
    const scores = localStorage.getItem("SCORES");
    if (scores) {
        const parsedScores = JSON.parse(scores);
        userScore = parsedScores.user;
        computerScore = parsedScores.computer;
        userScoreDisplay.textContent = userScore;
        computerScoreDisplay.textContent = computerScore;
    }
}
getScoresLocally();
const playGame = (userChoiceId) => {
    const userChoice = optionsText[userChoiceId];
    const computerChoiceId = Math.floor(Math.random() * 3);
    const computerChoice = optionsText[computerChoiceId];
    const result = calculateWinner(userChoice, computerChoice);
    showResults(result, userChoiceId, computerChoiceId)
}

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        choiceDisplay.style.display = "none";
        resultDisplay.style.display = "flex";
        const userChoiceId = choice.id;
        playGame(userChoiceId);
    })
})

const calculateWinner = (userChoice, computerChoice) => {
    let result = null;
    if (userChoice === computerChoice) {


        result = 0;
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        userScore++;
        nextButton.style.display = "flex";
        userScoreDisplay.textContent = userScore;
        result = 1;
    } else {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        result = -1;
    }
    scores = {
        user: userScore,
        computer: computerScore
    }
    setScoresLocally(scores)
    return result;
}

const setScoresLocally = (scores) => {
    localStorage.setItem("SCORES", JSON.stringify(scores));
}

