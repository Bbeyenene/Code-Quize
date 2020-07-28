
function myQuiz() {
    const myQuestions = [ //quearion src = "https://www.careerride.com/mcq/javascript-programming-language-mcq-questions-364.aspx"
    {Ques: "keyword is used to declare variables in javascript is _________ .",
     choices: ["A. Var", "B. Dim", "C. String", "D. None of the above"],
     answer: "A. Var",
     userAnswer: "",
     outcome: false,
      time: 0
    },
    {Ques: " The _______ method of an Array object adds and/or removes elements from an array",
     choices: ["A. Reverse", "B. Shift", "C. Slice", "D. Splice"],
     answer: "D. Splice",
     userAnswer: "",
     outcome: false, 
     time: 0         
    },
    {Ques: " Which HTML attribute is used to define inline styles?",
     choices: ["A. font", "B. class", "C. styles", "D. style"],
     answer: "D. style",
     userAnswer: "",
     outcome: false, 
     time: 0
        },
    { Ques: " Which CSS property sets the stack order of an element?",
      choices: ["A. z-index", "B. position", "C. overflow", "D. clip"],
      answer: "A. z-index",
      userAnswer: "",
      outcome: false, 
      time: 0
    },
    {Ques: " Which is/are the object(s) used for storing data on the client provided by the HTML local storage?",
     choices: ["A. window.localStorage", "B. window.sessionStorage", "C. window.localSession'", "D. both a & b"],
     answer: "D. both a & b",
     userAnswer: "",
     outcome: false, 
     time: 0
    }
    ];
    var timeDisplayArea = document.querySelector('#time-display');
    var highScorebtn = document.querySelector('#view-highscore-btn');
    var firstPageContainer = document.querySelector('#main-container');
    var startBtn = document.querySelector('#start-btn');
    var checkAnswerPara = document.querySelector('#outcomeDisplay');
    var currentQuestion = 0;
    var time = 0;
    const timePerQuestion = 15;
    const timeTotal = (15 * myQuestions.length);
    
    function firstPageButtonsClick() {
        //start btn click clears the front page container to be replaced by questions and start timer
        startBtn.addEventListener("click", function(){
            firstPageContainer.innerHTML = "";
            currentQuestion = 0;
            renderQuestion();

            time = timeTotal;
            totalTimerInterval = setInterval(function(){
                time = time -1;
                timeDisplayArea.innerHTML = time
                if(time<=0){
                    clearInterval(totalTimerInterval);
                    timeDisplayArea.innerHTML = "0.00";
                    renderLocalStorage();
                }
            }, 1000);
         });
        //highscore record btn click takes you to the score records.
        highScorebtn.addEventListener("click", function(){
            highscoreRecord();
        }); 
    }  
    function generateRowCol(rows, questionContent) {
        //this fuunction create divs once start quiz button is clicked to display the questions. 
        for (let i=0; i < rows; i++) {
            var rowsEl = document.createElement('div');
            rowsEl.setAttribute('class', 'row');
            var colsEl = document.createElement('div');
            colsEl.setAttribute('class', 'col');

            colsEl.append(questionContent);
            rowsEl.append(colsEl);
            firstPageContainer.append(rowsEl);
        }
    }
    function renderQuestion() {
        firstPageContainer.innerHTML = "";
        //this function render the question in h3 and the choieses in buttons
        //place them in the container genereated in generate function above
        var questionEl = document.createElement('h3');
        questionEl.innerHTML = myQuestions[currentQuestion].Ques;
        generateRowCol(1, questionEl);
        //for eachl choices create button place them in a container.
        var answerEl = "";
        for (let i=0; i< myQuestions[currentQuestion].choices.length; i++) {
            answerEl = document.createElement('button');
            answerEl.setAttribute('class', 'btn btn-secondary m-1');
            answerEl.innerHTML =  myQuestions[currentQuestion].choices[i];
            generateRowCol(1, answerEl);
            // if a choice is clicked, procced to check answer and next question
            answerEl.addEventListener('click', function() {
                if (myQuestions[currentQuestion].userAnswer = myQuestions[currentQuestion].choices[i]) {
                    checkAnswer();
                    nextQestion();
                }
            });
        }
    }
    function checkAnswer() {
        //this function checks if answer clicked equal to the correct answer it display a correct else wrong.
        if (myQuestions[currentQuestion].answer === myQuestions[currentQuestion].userAnswer) {
            myQuestions[currentQuestion].display = true;
            myQuestions[currentQuestion].time = time;
            checkAnswerPara.setAttribute('id', 'outcomeDisplay');
            checkAnswerPara.innerHTML = 'Correct!';
            //the correct and wrong answers are despayed only for half second
            setTimeout (function(){
                checkAnswerPara.innerHTML = "";
            }, 500);
        } else  {
            time = time - 1;
            myQuestions[currentQuestion].display = false;
            checkAnswerPara.setAttribute('id', 'outcomeWrong');
            checkAnswerPara.innerHTML = 'Wrong!'; 
            setTimeout (function(){   
                checkAnswerPara.innerHTML = "";   
            }, 500);
        } 
    }
    function nextQestion() {
        //this function checks if current question is not last question go back render question
        // else set time=0 and as programmed in the start button if time=0 go to render local storage function.
        if(currentQuestion < myQuestions.length-1) {
            currentQuestion = currentQuestion + 1;
            renderQuestion();
        } else {
            time = 0;
        }
    }
    function calcScore() {
        // this function the final score is the sum of all none false answer's time it was answered. 
        //max-score= 5*75 = 375 if you answer them in 0 seconds.
        let finalScore = 0;
        for(let i = 0; i < myQuestions.length; i++){
            if(!myQuestions[i].outcome){
                finalScore = finalScore + myQuestions[i].time;
            }  
        }
        return finalScore; 
    }
    function renderLocalStorage(){
        firstPageContainer.innerHTML = "";
        //this function greate divs for score result and create an input ofr initial.
        var gameEndStorageDiv = document.createElement('div');
        gameEndStorageDiv.setAttribute('class', 'display-1');
        gameEndStorageDiv.innerHTML = 'All done!';
        
        var userScoreMessageEl = document.createElement('h5');
        userScoreMessageEl.innerHTML = 'Your score is: ' + calcScore();
        
        var yourRecordDiv = document.createElement('div');
        yourRecordDiv.setAttribute('class', 'user-input');
        yourRecordDiv.innerHTML = "Enter your name: <input type='text' class='input-group myInput' id='intial-input'></input>";
        
        var submitHighscoreBtn = document.createElement('button');
        submitHighscoreBtn.setAttribute('class', 'btn btn-success btn-lg');
        submitHighscoreBtn.setAttribute('id', 'btn-submit');
        submitHighscoreBtn.innerHTML = 'Submit Highscore';
        
        gameEndStorageDiv.append(userScoreMessageEl);
        gameEndStorageDiv.append(yourRecordDiv);
        gameEndStorageDiv.append(submitHighscoreBtn);
        generateRowCol(1, gameEndStorageDiv);

        submitHighscoreBtn.addEventListener('click', function(e){
            e.preventDefault();
            //storing information in local storage
            var highscores = [];
            if(localStorage.getItem('localHighschores')) {
                highscores = localStorage.getItem('localHighschores');
                highscores = JSON.parse(highscores); 
            } else {
                highscores =[];
            }
            const  userInitial = document.getElementById('intial-input').value;
            const yourRecordScore = calcScore();
            highscores[(highscores.length)] = {
                initial: userInitial,
                score: yourRecordScore
            }
            highscores.sort(function(a, b){
            return b.score - a.score;
            })
            window.localStorage.setItem('localHighschores', JSON.stringify(highscores));
            highscoreRecord(highscores);
        });
    }  
    function highscoreRecord(highscores) {
        //this function store and desplay high score  and creates an exit and clear score buttons.
        if (localStorage.getItem('localHighschores')) {
           highscores = localStorage.getItem('localHighschores');
           highscores = JSON.parse(highscores);
        } else {
         highscore = [];
        }
        document.body.innerHTML = "";
        
        var highscoreContainerDiv = document.createElement('div');
        highscoreContainerDiv.setAttribute('class', 'container');        
        var highscoreHeaderEl = document.createElement('div');
        highscoreHeaderEl.setAttribute('class', 'display-1 text-center mb-3');
        highscoreHeaderEl.innerHTML = " High Score";
        highscoreContainerDiv.append(highscoreHeaderEl);

        var highschordisplayDiv = document.createElement('div');
        highscoreContainerDiv.append(highschordisplayDiv);
        if (highscores) {
            for (let i=0; i < highscores.length; i++) {
                var individualRecordDiv = document.createElement('div');
                individualRecordDiv.setAttribute('class', 'bg-info text-white m-1 p-1');
                individualRecordDiv.setAttribute('id', 'record');
                individualRecordDiv.innerHTML = (i+1 + ".  " + highscores[i].initial + ' = ' + highscores[i].score);
                highschordisplayDiv.append(individualRecordDiv);
            }
        }
        var resultBtnDiv = document.createElement('div');
        resultBtnDiv.setAttribute('class', 'display-2 text-space');

        var restartBtn = document.createElement('button');
        restartBtn.setAttribute('class', 'btn btn-primary btn-lg');
        restartBtn.innerHTML = "Exit Record";
        resultBtnDiv.append(restartBtn);
        highscoreContainerDiv.append(resultBtnDiv);

        restartBtn.addEventListener('click', function(){
            document.location.reload();
        });
        
        var clearScoreBtn = document.createElement('button');
        clearScoreBtn.setAttribute('class', 'btn btn-warning btn-lg');
        clearScoreBtn.innerHTML = "Clear Record";
        resultBtnDiv.append(clearScoreBtn);
        highscoreContainerDiv.append(resultBtnDiv);
        
        clearScoreBtn.addEventListener('click', function(){
            window.localStorage.removeItem('localHighschores');
            highschordisplayDiv.innerHTML = "";
        });
        document.body.append(highscoreContainerDiv);
    }
    firstPageButtonsClick();
}
myQuiz();
