import Question from './Question.js';
import Quiz from './Quiz.js';

const App = (function(){
    
    const quizQuestionEle = document.querySelector(".quiz__question");
    const trackerEle = document.querySelector(".quiz__tracker");
    const taglineEle = document.querySelector(".quiz__tagline");
    const choicesEle = document.querySelector(".quiz__choices");
    const progressInnerEle = document.querySelector(".progress__inner")
    const nextButtonEle = document.querySelector(".next");
    const resetButtonEle = document.querySelector(".restart");

    //Construct our questions into a new Object
    const q1 = new Question(
        "JavaScript File Has An Extension Of", 
        [".js", ".java", ".python", ".hello"], 
        0
    );

    const q2 = new Question(
        "NaN evaluates too..", 
        ["Not a number", "null a null", "Not an object", "none"], 
        0
    );

    const q3 = new Question(
        "Function to pass string to Integer", 
        ["Parse.Int", "Int.parse", "Integer.pass", "none"], 
        0
    );

    const q4 = new Question(
        "JQ", 
        [1, 2, 3, 4], 
        2
    );
    //Pass questions into the Quiz constructor
    const quiz = new Quiz ([q1, q2, q3, q4]);

    
        //sets innerHTML values
    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = () => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEle, question);
    }
    
    
    const renderChoices = () => {
        let markup = ""
        const currentChoice = quiz.getCurrentQuestion().choices;
        //Iterates over each element and index and renders questions to the screen
        currentChoice.forEach((element, index) => {
            markup += 
            `
            <li class="quiz__choice">
                <input type="radio" name="choice" class="quiz__input"  data-order="${index}"
                id="choice${index}">
                <label for="choice${index}" class="quiz__label">
                <i></i>
                    <span>${element}</span
                </label>
                                
            </li>
            `
        });

        setValue(choicesEle, markup);
    }

    //Tracks current progress of where you are in game e.g(1 of 5, 2 of 5 etc..)
    const renderTracker = () => {
        const index = quiz.currentIndex;
        //index+1 allows us to start from number 1 rather than 0
        setValue(trackerEle, `${index+1} of ${quiz.questions.length}`);
    }

    const getPercentage = (num1, num2) => {
        // ex. (1/4) > .25 > * 100 = 25%
        return Math.round((num1/num2) * 100)
    }

    const loadBar = (width, maxPercent) => {
        let loadingBar = setInterval(function() {
            if (width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                //If width is not greater than max %, we can increase the width for the DOM element
                width++;
                progressInnerEle.style.width = `${width}%`
            }
        }, 3); //.3s progress bar load
    }

    //Renders progress on screen (e.g 25%, 50%...) based on how many questions there are
    const renderProgress = () => {
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
        loadBar(0, currentWidth)
    }
    
    const renderEndScreen = _ => {
        setValue(quizQuestionEle, `Great Job!`);
        setValue(taglineEle, `Complete!`);
        
        //Next button will become not visible once game has finished
        nextButtonEle.style.opacity = 0; 
        renderProgress();
      }

      const renderAll = () => {
        if(quiz.hasEnded()) {
            //render end screen
            renderEndScreen();
        }
        else {
            //renders app data
            renderQuestion();
            renderChoices();
            renderTracker();
            renderProgress();
        }
    }

    const listeners = () => {

        nextButtonEle.addEventListener("click", function() {
          const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
          if (selectedRadioElem) {
              //Parse value to an integer to add up percentage value
            const key = parseInt(selectedRadioElem.getAttribute("data-order"));
            quiz.guess(key);
            renderAll();
          }
        });
    
        //Resets Quiz data back to start and returns nextButton back to a visible state
        resetButtonEle.addEventListener("click", function() {
          quiz.reset();
          renderAll();
          nextButtonEle.style.opacity = 1;
        });
      }

    return {
        renderAll: renderAll,
        listeners: listeners
    }
}) ();

App.renderAll();
App.listeners();







