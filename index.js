    const quiz = {
        name: 'Friends',
        logoAddress:"",
        questions:[
        {
            question:"How many babies did Phoebe carry for her brother?",
            choices:[1, 3, 0, 2],
            answerIndex: 1
        },
        {
            question:"Where did Phoebe and Mike get married?",
            choices:["On the street", "In a church", "In a park", "They never got married"],
            answerIndex: 0
        },
        {
            question:"The 'Geller Cup' is a prize in which sport?",
            choices:["Hockey", "Baskeyball", "Football", "Rugby"],
            answerIndex: 2 
        },
        {
            question:"Whose catchphrase is 'Oh my GOD'?",
            choices:["Phoebe","Ross","Janice","Chandler"],
            answerIndex: 2
        },
        {
            question:"How many friends have worked in the coffee shop?",
            choices:[1, 5, 3, 2],
            answerIndex: 3
        },
        {
            question:"What type of animal is 'Hugsy'?",
            choices:["Lion","Penguin","Rabbit","Bear"],
            answerIndex: 1
        },
        {
            question:"Who was the holiday Armadillo?",
            choices:["Joey","Mike","Chandler","Ross"],
            answerIndex: 3
        },
        {
            question:"Who plays 'Will', an old friend of Monica and Ross from High School?",
            choices:["Bruce Willis","Paul Rudd","Brad Pitt","Michael Rapaport"],
            answerIndex: 2
        },
        {
            question:"What does Monica's dad give her to compensate for ruining her childhood possessions?",
            choices:["Porsche","Money","House","Nothing"],
            answerIndex: 0
        },
        {
            question:"Where is Chandler forced to work after falling asleep in a meeting?",
            choices:["Yemen","Atlantic City","Las Vegas","Tulsa"],
            answerIndex: 3
        }]
    };

    const playerStats = {
        question: 0,
        correct: 0,
        incorrect: 0,
        updateCorrect:function(){
            this.correct += 1;
        },
        updateIncorrect: function(){
            this.incorrect += 1;
        },
        updateQuestion: function(){
            this.question += 1;
        }
    };

    function displayWelcomeScreen(){
        //this function will display the appropriate quiz name
        //along with the welcome message with the quiz name DOM 
        console.log('displayWelcomeScreen ran');
       
        let welcomeMessage = `Welcome to the ${quiz.name} quiz. Please press the button below to begin the quiz`;

        $('.quiz-name').text(`${quiz.name} Quiz`);
        $('.display').html(`
            <section class="display-view">
                <p class="display-text">${welcomeMessage}</p>
            </section>
            <form role="form" id="welcome">
                <button type="submit">Begin</button>
            </form>`);

            $('.display').on('submit', '#welcome', function(evt){
                evt.preventDefault();
                displayQuestion();
            });
    }

    function displayChoices(){
        //this function will display the appropriate answer options for the question displayed
        console.log('displayChoices ran');
        let choices = quiz.questions[playerStats.question].choices;
        let choicesDisplay = "";

        for(let i = 0; i < choices.length; i++){
            choicesDisplay += `
            <section>
                <label for="opt-${i+1}">${choices[i]}</label>
                <input id="opt-${i+1}" type="radio" name="quiz-question"/>
            </section>
            `;
        }
        
        return choicesDisplay;
    }
    
    function displayQuestion(){
        //this function will display each question
        console.log('displayQuestion ran');

        $('.display').html(`
        <section class="display-view">
            <p class="display-text">${quiz.questions[playerStats.question].question}</p>
        </section>
        <form role="form" id="quiz">
            ${displayChoices(playerStats.question)}
            <button type="submit" class="submit">Submit</button>
        </form>`);
        
        $('#quiz').on('submit', function(evt){
            evt.preventDefault();
            $('input').filter(function(index,element){
                if($(element).prop("checked")){
                    displayFeedback();
                } 
            });

            $('input').each(function(index,element){
                $(element).prop('disabled', true);
            });
        });
    }

    function nextQuestion(){
        let quizLength = quiz.questions.length;
        if(playerStats.question < (quizLength - 1)){
            playerStats.updateQuestion();
            displayQuestion();
        }else{
            displayFinalStatsView();
        }
    }

    function displayFeedback(){
        //this function will provide feedback to the user on if they selected the correct answer or not
        console.log('displayFeedback ran');
        let answerIndex = quiz.questions[playerStats.question].answerIndex;
        let choices = $('input');
        let selectedAnswer;
        
    
        choices.filter(function(index,element){
            if($(element).prop('checked')){
                selectedAnswer = index;
            }
        });

        $('input').each(function(index,element){
            if(index === answerIndex){
                $(element).prev().addClass('correct');
            }

            if(selectedAnswer === index && index !== answerIndex){
                $(element).prev().addClass('incorrect');
            }
        });

        $('button').remove();
        $('#quiz').append(`<button type="submit" class="submit">Next</button>`);

        $('#quiz').on('submit', function(evt){
            evt.preventDefault();  

            $('input').each(function(index,element){
                if(selectedAnswer === answerIndex && ($(element).prop('checked'))){
                    playerStats.updateCorrect();
                }
    
                if(selectedAnswer !== answerIndex && ($(element).prop('checked'))){
                    playerStats.updateIncorrect();
                }
            });

            displayUserStats();
            nextQuestion();
        });
    }
    
    function displayUserStats(){
        //this function will display the users stats to the DOM
        console.log('displayUserStats ran');
        const numberOfQuestions = quiz.questions.length;

        $('.progress').text(`${playerStats.question + 1} out of ${numberOfQuestions}`);
        $('.score').text(`${((playerStats.correct/(playerStats.question + 1)) * 100).toFixed(2)}% (${playerStats.correct} correct and ${playerStats.incorrect} incorrect)`);
    }
    
    function displayFinalStatsView(){
        //this function will display the users final stats to the DOM
        console.log('displayFinalStatsView ran');
        
        let totalNumberOfQuestions = quiz.questions.length;
        let score = (playerStats.correct/(playerStats.question + 1)) * 100;

        $('.display').html(`
            <section class="display-view">
                <p class="display-questionInfo">${totalNumberOfQuestions} out of ${totalNumberOfQuestions}</p>
                <p class="display-score">Score: ${score.toFixed(2)}%</p>
                <p class="display-totalCorrect">Total Correct: ${playerStats.correct}</p>
                <p class="display-totalIncorrect">Total Inccorrect: ${playerStats.incorrect}</p>
            </section>
            <form role="form" id="retry">
                <button type="submit">Retry</button>
            </form>
        `);

        $('#retry').on('submit', function(evt){
            evt.preventDefault();  
            displayWelcomeScreen();
        });
    }

    function handleQuizzes(){
        displayWelcomeScreen();
    } 

$(handleQuizzes);
