const quizData = {
    beginner: [
        {
            question: "What does 'cout' stand for in C++?",
            options: [
                "Console output",
                "Code output",
                "Command output",
                "Computer output"
            ],
            correct: 0
        },
        {
            question: "Which header file is used for input/output in C++?",
            options: [
                "<cstdio>",
                "<iostream>",
                "<fstream>",
                "<iomanip>"
            ],
            correct: 1
        },
        {
            question: "What is the correct syntax to declare a variable in C++?",
            options: [
                "int x;",
                "x int;",
                "declare int x;",
                "int: x;"
            ],
            correct: 0
        },
        {
            question: "Which of the following is a correct way to initialize an array?",
            options: [
                "int arr[5] = {1, 2, 3, 4, 5};",
                "int arr(5) = {1, 2, 3, 4, 5};",
                "int[5] arr = {1, 2, 3, 4, 5};",
                "array int arr[5] = {1, 2, 3, 4, 5};"
            ],
            correct: 0
        },
        {
            question: "What is the size of 'int' data type in most systems?",
            options: [
                "1 byte",
                "2 bytes",
                "4 bytes",
                "8 bytes"
            ],
            correct: 2
        }
    ],
    intermediate: [
        {
            question: "What is polymorphism in C++?",
            options: [
                "The ability to create multiple variables",
                "The ability of objects to take multiple forms",
                "The ability to declare multiple classes",
                "The ability to use multiple data types"
            ],
            correct: 1
        },
        {
            question: "Which keyword is used to inherit from a class in C++?",
            options: [
                "extend",
                "inherit",
                ":",
                "extends"
            ],
            correct: 2
        },
        {
            question: "What is a pointer in C++?",
            options: [
                "A variable that stores an integer",
                "A variable that stores the memory address of another variable",
                "A variable that stores a string",
                "A variable that stores a floating point number"
            ],
            correct: 1
        },
        {
            question: "What does the 'virtual' keyword do in C++?",
            options: [
                "Declares a variable as immutable",
                "Allows dynamic binding and method overriding",
                "Declares a constant value",
                "Declares a static method"
            ],
            correct: 1
        },
        {
            question: "What is the difference between 'new' and 'malloc'?",
            options: [
                "'new' is for C, 'malloc' is for C++",
                "'new' calls constructors, 'malloc' does not",
                "There is no difference",
                "'malloc' is faster than 'new'"
            ],
            correct: 1
        }
    ],
    advanced: [
        {
            question: "What is RAII in C++?",
            options: [
                "Random Array Initialization Interface",
                "Resource Acquisition Is Initialization",
                "Recursive Array Instance Iteration",
                "Runtime Array Interface Integration"
            ],
            correct: 1
        },
        {
            question: "What is move semantics in C++11?",
            options: [
                "Moving objects between memory locations",
                "Transferring ownership of resources instead of copying",
                "Moving pointers to different addresses",
                "Transferring data between threads"
            ],
            correct: 1
        },
        {
            question: "What does 'noexcept' keyword specify in C++?",
            options: [
                "The function will not throw exceptions",
                "The function is not executable",
                "The function has no parameters",
                "The function is deprecated"
            ],
            correct: 0
        },
        {
            question: "What is template metaprogramming in C++?",
            options: [
                "Writing programs that manipulate templates at compile-time",
                "Writing multiple templates",
                "Using templates for data storage",
                "Inheriting from templates"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of the 'typename' keyword in templates?",
            options: [
                "To declare a new type",
                "To specify a template parameter as a type",
                "To rename existing types",
                "To create type aliases"
            ],
            correct: 1
        }
    ]
};

let currentQuizData = [];
let currentQuestion = 0;
let userAnswers = {};
let currentDifficulty = '';

function startQuiz(difficulty) {
    currentDifficulty = difficulty;
    currentQuizData = quizData[difficulty];
    currentQuestion = 0;
    userAnswers = {};
    
    showScreen('quiz-screen');
    displayQuestion();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function displayQuestion() {
    const question = currentQuizData[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-number').textContent = `Question ${currentQuestion + 1} of ${currentQuizData.length}`;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    updateProgress();
    updateNavigationButtons();
    updateScore();
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    displayQuestion();
}

function nextQuestion() {
    if (currentQuestion < currentQuizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / currentQuizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').textContent = currentQuestion === currentQuizData.length - 1 ? 'Finish' : 'Next →';
}

function updateScore() {
    let correct = 0;
    Object.keys(userAnswers).forEach(qIndex => {
        if (userAnswers[qIndex] === currentQuizData[qIndex].correct) {
            correct++;
        }
    });
    document.getElementById('score').textContent = `Score: ${correct}/${Object.keys(userAnswers).length}`;
}

function finishQuiz() {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    
    currentQuizData.forEach((question, index) => {
        if (userAnswers[index] === undefined) {
            skipped++;
        } else if (userAnswers[index] === question.correct) {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    const percentage = Math.round((correct / currentQuizData.length) * 100);
    let message = '';
    let details = '';
    
    if (percentage >= 80) {
        message = 'Excellent! 🎉';
        details = 'You have a great understanding of C++ concepts!';
    } else if (percentage >= 60) {
        message = 'Good Job! 👍';
        details = 'You have a solid understanding. Keep practicing!';
    } else if (percentage >= 40) {
        message = 'Not Bad! 📚';
        details = 'You need more practice. Review the concepts!';
    } else {
        message = 'Keep Learning! 💪';
        details = 'C++ is complex. Study more and try again!';
    }
    
    document.getElementById('final-score').textContent = percentage;
    document.getElementById('result-message').textContent = message;
    document.getElementById('result-details').textContent = details;
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('incorrect-count').textContent = incorrect;
    document.getElementById('skipped-count').textContent = skipped;
    
    showScreen('results-screen');
}

function retakeQuiz() {
    startQuiz(currentDifficulty);
}

function changeDifficulty() {
    showScreen('start-screen');
}
