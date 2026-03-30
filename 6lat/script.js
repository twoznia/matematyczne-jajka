let maxNumber = 10;
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let correctAnswerValue = 0;
let canClick = true;

function startGame(limit) {
    maxNumber = limit;
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('summary').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    
    updateStats();
    nextQuestion();
}

function showMenu() {
    document.getElementById('summary').classList.add('hidden');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}

function updateStats() {
    // Zapobiega pokazaniu "8/7" na ułamek sekundy
    document.getElementById('question-num').innerText = Math.min(currentQuestion + 1, 7);
    document.getElementById('correct-count').innerText = correctAnswers;
    document.getElementById('wrong-count').innerText = wrongAnswers;
}

function nextQuestion() {
    if (currentQuestion >= 7) {
        showSummary();
        return;
    }
    
    canClick = true;
    document.getElementById('feedback').innerText = "";
    updateStats();
    
    let n1, n2, isAddition;
    isAddition = Math.random() > 0.5;

    if (isAddition) {
        // Losuj tak, by suma nie przekroczyła limitu
        correctAnswerValue = Math.floor(Math.random() * (maxNumber + 1));
        n1 = Math.floor(Math.random() * (correctAnswerValue + 1));
        n2 = correctAnswerValue - n1;
        document.getElementById('operator').innerText = "+";
    } else {
        // Losuj tak, by wynik nie był ujemny
        n1 = Math.floor(Math.random() * (maxNumber + 1));
        n2 = Math.floor(Math.random() * (n1 + 1));
        correctAnswerValue = n1 - n2;
        document.getElementById('operator').innerText = "-";
    }

    document.getElementById('num1').innerText = n1;
    document.getElementById('num2').innerText = n2;
    generateOptions();
}

function generateOptions() {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    let options = new Set([correctAnswerValue]);

    while(options.size < 4) {
        let wrong = correctAnswerValue + (Math.floor(Math.random() * 7) - 3);
        if (wrong >= 0 && wrong !== correctAnswerValue && wrong <= maxNumber) {
            options.add(wrong);
        } else {
            options.add(Math.floor(Math.random() * (maxNumber + 1)));
        }
    }

    Array.from(options).sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(opt, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, btn) {
    if (!canClick) return;

    if (selected === correctAnswerValue) {
        canClick = false; // Blokujemy klikanie podczas animacji przejścia
        correctAnswers++;
        btn.style.background = "#4cd137";
        document.getElementById('feedback').innerText = "Świetnie! ⭐";
        
        setTimeout(() => {
            currentQuestion++;
            nextQuestion();
        }, 1000);
    } else {
        wrongAnswers++;
        updateStats();
        btn.classList.add('wrong-anim');
        document.getElementById('feedback').innerText = "Spróbuj inną! 😊";
        
        // Usuwamy klasę animacji, żeby można było ją odpalić jeszcze raz
        setTimeout(() => btn.classList.remove('wrong-anim'), 400);
    }
}

function showSummary() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
    document.getElementById('final-stats').innerHTML = 
        `Dobre odpowiedzi: ${correctAnswers} ✅<br>Pomyłki: ${wrongAnswers} ❌`;
}
