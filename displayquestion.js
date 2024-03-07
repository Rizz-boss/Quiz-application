document.addEventListener('DOMContentLoaded', () => {
    
    const studentName = localStorage.getItem('regCandidateNames');
    const schoolName = localStorage.getItem('regSchoolName');

    const studentInfoContainer = document.getElementById('student-info');
    if (studentName && schoolName) {
        studentInfoContainer.innerHTML = `<p>Student: ${studentName}</p><p>School: ${schoolName}</p>`;
    } else {
        studentInfoContainer.innerHTML = '<p>Student information not available</p>';
    }
});



const questions = [
    {
        question: 'What is 1+1?',
        answer: [
            {
                text: '11', correct: false
            },
            {
                text: '2', correct: true
            },
            {
                text: '1', correct: false
            },
            {
                text: '10', correct: false
            },
        ]
    },
    {
        question: 'Which of the following oxides causes acid rains?',
        answer: [
            {
                text: 'CO', correct: false
            },
            {
                text: 'NO', correct: false
            },
            {
                text: 'H2O2', correct: false
            },
            {
                text: 'NO2', correct: true
            },
        ]
    },
    {
        question: 'The hydrolysis of protein by dilute mineral acids produces...',
        answer: [
            {
                text: 'sucrose', correct: false
            },
            {
                text: 'glucose', correct: false
            },
            {
                text: 'amino acids', correct: true
            },
            {
                text: 'fatty acids', correct: false
            },
        ]
    },
    {
        question: 'Cathodic protect of metals is based on...',
        answer: [
            {
                text: 'Standard electrode potential of hydrogen', correct: true
            },
            {
                text: 'its electrical conductivity', correct: false
            },
            {
                text: 'nature of oxides', correct: false
            },
            {
                text: 'reltive tendencies of oxidation', correct: false
            },
        ]
    },
    {
        question: 'A molecule of phosphorus is...',
        answer: [
            {
                text: 'diatomic', correct: false
            },
            {
                text: 'triatomic', correct: false
            },
            {
                text: 'tetraatomic', correct: true
            },
            {
                text: 'monoatomic', correct: false
            },
        ]
    },
    {
        question: 'The most common method of preparing insoluble salts is by...',
        answer: [
            {
                text: 'filtration', correct: true
            },
            {
                text: 'decomposition', correct: false
            },
            {
                text: 'neutrilization', correct: false
            },
            {
                text: 'double decomposition', correct: false
            },
        ]
    },
    {
        question: 'The region around a nucleus where electrons are located are called...',
        answer: [
            {
                text: 'a spectra', correct: false
            },
            {
                text: 'an orbital', correct: true
            },
            {
                text: 'a quanta', correct: false
            },
            {
                text: 'a field', correct: false
            },
        ]
    },
    {
        question: 'Which of the following gases are highly insoluble in water?',
        answer: [
            {
                text: 'Ammonia', correct: false
            },
            {
                text: 'Carbon(IV)oxide', correct: false
            },
            {
                text: 'Chlorine', correct: true
            },
            {
                text: 'Nitrogen', correct: false
            },
        ]
    },
    {
        question: 'Potassium trioxonitrate(V) can be obtained from its solution by...',
        answer: [
            {
                text: 'distillation', correct: false
            },
            {
                text: 'evapouration', correct: false
            },
            {
                text: 'crystalization', correct: true
            },
            {
                text: 'filtration', correct: false
            },
        ]
    },
    {
        question: 'Which of the following scientist discovered the electrons',
        answer: [
            {
                text: 'Joseph J Thompson', correct: true
            },
            {
                text: 'James Chadwick', correct: false
            },
            {
                text: 'Amedeo Avogadro', correct: false
            },
            {
                text: 'Ernest Rutherford', correct: false
            },
        ]
    }
]


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none'; 
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct));
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++
    }else{
        selectedBtn.classList.add('incorrect');
    }Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block'
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score Goes here`
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

document.addEventListener('DOMContentLoaded', startQuiz);

startTimer(2 * 60);

let timerInterval; 

function startTimer(durationInSeconds) {
    const timerDisplay = document.getElementById('timer');

    
    const endTime = Date.now() + durationInSeconds * 1000; 

   
    timerInterval = setInterval(() => {
       
        const remainingTime = endTime - Date.now();
        
       
        if (remainingTime <= 0) {
            clearInterval(timerInterval); 
            timerDisplay.textContent = 'Time\'s up!'; 
            return;
        }

        
        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000); 
}

function disableAnswerButtons() {
    const answerButtons = document.querySelectorAll('#answer-button .btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });
}

