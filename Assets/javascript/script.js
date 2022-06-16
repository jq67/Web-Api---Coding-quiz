// Click start button
// event listener, timer starts quiz, first question is appended to the page

// Multiple choice questions render
// each answer is a button
// document selector --> correct answer score increase, display 'correct', move to next question
// --> incorrect answer, time decrease, display 'wrong', then move to next question

// when all questions are done or interval is complete
// the game is over
// prompted to save initals + view score and highscores (local storage)
// maybe add link to view highscores before starting game

// variables we will use in the quiz
let timer;
let timeCount;
let score;
let questionNum = 0;

// html selectors
let gameSpace = document.querySelector(".gameSpace");
let startButton = document.querySelector("#start-button");
let header = document.querySelector(".header");
let stopwatch = document.querySelector(".stopwatch");
let rightWrong = document.querySelector(".rightorWrong");
let scorePage = document.querySelector(".scorePage");

// array of questions
let questions = [
    'What character do we use to identify an id when calling specific elements',
    'What type of operator is the % operator',
    'What does DOM stand for',
    'Which of the following statements is true',
    'Which of the following statements is false',
    'What does API stand for',
    'What does || mean',
    'Where is the Document located',
    'Which of the following statements is true',
    'What does XML stand for',
];

// array of answers
let gameAnswers = [
    [{answer: 'A: .', correct: false}, {answer: 'B: #', correct: true}, {answer: 'C: @', correct: false}, {answer: 'D: !', correct: false}],
    [{answer: 'A: division', correct: false}, {answer: 'B: modulus', correct: true}, {answer: 'C: multiplication', correct: false}, {answer: 'D: percentage', correct: false}],
    [{answer: 'A: Direct Objective Mainbranch', correct: false}, {answer: 'B: Document Ordered Meetings', correct: false}, {answer: 'C: Doctored Object Math', correct: false}, {answer: 'D: Document Object Model', correct: true}],
    [{answer: 'A: HTML stand for hyper text markup language', correct: true}, {answer: 'B: the .map function returns a link to google maps', correct: false}, {answer: 'C: An object cannot contain an array', correct: false}, {answer: 'D: An element within another element is known as its friend', correct: false}],
    [{answer: 'A: You can use javascript to set the class of a html element', correct: false}, {answer: 'B: The statement undefined === null is true', correct: true},
    {answer: 'C: The <a> tag denotes a link', correct: false}, {answer: 'Javascript is Fun', correct: false}],
    [{answer: 'A: Auto Piloted Input', correct: false}, {answer: 'B: Application Programming Interface', correct: true}, {answer: 'C: Alert Power Interface', correct: false}, {answer: 'D: Aggrogate Parent Items', correct: false}],
    [{answer: 'A: but', correct: false}, {answer: 'B: if', correct: false}, {answer: 'C: else', correct: false}, {answer: 'D: or', correct: true}],
    [{answer: 'A: The Window', correct: true}, {answer: 'B: The Container', correct: false}, {answer: 'C: The Body', correct: false}, {answer: 'D: The Head', correct: false}],
    [{answer: 'A: .pop() removes an item from the beginning of an array', correct: false},{answer: 'B: .typeOf() can return a string, object, array or boolean', correct: false}, {answer: 'C: You can make a for loop within another for loop', correct: true}, {answer: 'D: Functions can only be called once', correct: false}],
    [{answer: 'A: Extended Model List', correct: false}, {answer: 'B: Extra Marking Lead', correct: false}, {answer: 'C: Cross Model Language', correct: false}, {answer: 'D: Extensible Markup Language', correct: true}],
];

// start timer
function startTimer() {
    timer = setInterval(function() {
        timeCount--;
        stopwatch.textContent = timeCount;
        if (timeCount <= 0) {
            clearInterval(timer);
            let timeEl = document.createElement('h2')
            timeEl.style.margin = "15px"
            timeEl.innerText = 'Out of Time!'
            gameSpace.appendChild(timeEl)
        }
    }, 1000)
};

// start game
function startGame() {
    timeCount = 60;
    stopwatch.textContent = timeCount
    questionNum = 0;
    score = 0;
    rightWrong.textContent = ''
    clearSpace()
    renderQuestion()
    startTimer()
};

// correct answer
function rightAns() {
    score = score + 100;
    clearSpace()
    rightWrong.textContent = ''
    if (questionNum == questions.length-1 && timeCount >= 0) {
        winGame()
    } else {
        questionNum++
        renderQuestion()        
    }
    rightWrong.textContent = 'Correct'
};

// incorrect answer
function wrongAns() {
    timeCount = timeCount - 10
    clearSpace()
    rightWrong.textContent = ''
    if (questionNum < questions.length-1 && timeCount > 0) {
        questionNum++
        renderQuestion()
    } else if (questionNum == questions.length-1 && timeCount >= 0) {
        winGame()
    } else if (timeCount <= 0) {
        loseGame()
    }
    rightWrong.textContent = 'Incorrect'
};

// clears the game space
function clearSpace() {
    gameSpace.innerHTML = '';    
};

// render a question
function renderQuestion() {
    let question = document.createElement('h1') // code for rendering and style questions
    question.innerText = questions[questionNum]
    question.style.paddingTop = "30px"
    question.style.paddingBottom = "56px"
    question.style.paddingLeft = "38px"
    question.style.paddingRight = "38px"
    gameSpace.appendChild(question)

    let answers = document.createElement('ul') // code for rendering and styling answers
    answers.style.textAlign = "left"
    for (i = 0; i < gameAnswers[questionNum].length; i++) {
        if (gameAnswers[questionNum][i].correct === true) {
            let choice = document.createElement('li')
            choice.style.listStyleType = "none"
            choice.style.marginBottom = "15px"
            choice.innerHTML = '<button id=\"clickbtn\">Click</button>' + gameAnswers[questionNum][i].answer
            answers.appendChild(choice)
            choice.addEventListener("click", rightAns)
        } else {
            let choice = document.createElement('li')
            choice.style.listStyleType = "none"
            choice.style.marginBottom = "15px"
            choice.innerHTML = '<button id=\"clickbtn\">Click</button>' + gameAnswers[questionNum][i].answer
            choice.addEventListener("click", wrongAns)
            answers.appendChild(choice)
        }
        gameSpace.appendChild(answers)      
    }
};


// conditions to win game
function winGame() {
    clearInterval(timer)
    timeCount = timeCount * 5
    score = score + timeCount // calculate score

    let winMsg = document.createElement('h1') // win message
    winMsg.innerText = 'GAME OVER YOU WIN!';
    winMsg.style.margin = "20px"

    let scoreBoard = document.createElement('h2') // score display
    scoreBoard.style.padding = "7px"
    scoreBoard.textContent = `Score: ${score}`
    scoreBoard.style.margin = "20px"

    gameSpace.appendChild(scoreBoard)
    gameSpace.appendChild(winMsg)
    
    let againButton = document.createElement('button') // play again button
    againButton.style.padding = "7px"
    againButton.style.marginRight = "15px"
    againButton.innerHTML = 'Play Again?'
    gameSpace.appendChild(againButton)
    againButton.addEventListener("click", startGame)

    let saveScore = document.createElement('button') // store score button
    saveScore.style.padding = "7px"
    saveScore.style.marginRight = "15px"
    saveScore.innerHTML = 'Save Score?'
    gameSpace.appendChild(saveScore)
    saveScore.addEventListener("click", storeScore)

    let viewScore = document.createElement('button') // view score button
    viewScore.style.padding = "7px"
    viewScore.innerHTML = 'View Score?'
    gameSpace.appendChild(viewScore)
    viewScore.addEventListener("click", viewScores)
};

//function to call on game loss
function loseGame() {
    let endmsg = document.createElement('h2') // end game message
    endmsg.innerText = 'GAME OVER STUDY HARDER!'
    endmsg.style.margin = "20px"
    gameSpace.appendChild(endmsg)

    let againButton = document.createElement('button') // play again button
    againButton.style.padding = "7px"
    againButton.innerHTML = 'Play Again?'
    gameSpace.appendChild(againButton)
    againButton.addEventListener("click", startGame)
};

// displays stored score
function viewScores () {
    clearSpace()
    clearInterval(timer)
    var storedName = localStorage.getItem("userName"); // get scores from storage, display scores if they exist
    var storedScore = localStorage.getItem("score");
    let scoresh2 = document.createElement('h2')
    scoresh2.style.margin = "20px"
    gameSpace.appendChild(scoresh2)
    if (storedName === null) {
        scoresh2.textContent = 'No scores saved!'
    } else { 
    scoresh2.textContent = `${storedName} scored ${storedScore} points!`
    }

    let againButton = document.createElement('button') // play again button
    againButton.style.padding = "7px"
    againButton.innerHTML = 'Play Again?'
    gameSpace.appendChild(againButton)
    againButton.addEventListener("click", startGame)
};


// renders page to store score
function storeScore() {
    clearSpace()
    let nameprompt = document.createElement('input') // user name input field
    nameprompt.placeholder = "Enter name here"
    nameprompt.style.height = "25px"
    gameSpace.appendChild(nameprompt)
    nameprompt.classList.add('username')

    let saveScore = document.createElement('button') // confirm save score 
    saveScore.style.margin = "15px"
    saveScore.style.padding = "7px"
    saveScore.innerHTML = 'Save'
    gameSpace.appendChild(saveScore)
    saveScore.addEventListener('click', save)

    let againButton = document.createElement('button') // play again
    againButton.style.marginRight = "15px"
    againButton.style.padding = "7px"
    againButton.innerHTML = 'Play Again?'
    gameSpace.appendChild(againButton)
    againButton.addEventListener("click", startGame)    
};

function save () { // function to save score with event listener
    localStorage.setItem("userName", document.querySelector('.username').value);
    localStorage.setItem("score", score);
    alert("score saved!")
};

// view scores page
scorePage.addEventListener("click", viewScores)

// start game
startButton.addEventListener("click", startGame)
