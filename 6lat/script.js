let maxNumber = 10;
let score = 0;
let correctAnswer = 0;

function startGame(limit) {
    maxNumber = limit;
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    nextQuestion();
}

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
}

function nextQuestion() {
    let n1 = Math.floor(Math.random() * maxNumber) + 1;
    let n2 = Math.floor(Math.random() * maxNumber) + 1;
    const isAddition = Math.random() > 0.5;

    if (!isAddition) {
        // Zapewnienie, że wynik nie jest ujemny
        if (n1 < n2) [n1, n2] = [n2, n1];
        correctAnswer = n1 - n2;
        document.getElementById('operator').innerText = "-";
    } else {
        // Zapewnienie, że suma nie przekracza limitu
        while (n1 + n2 > maxNumber) {
            n1 = Math.floor(Math.random() * (maxNumber/2)) + 1;
            n2 = Math.floor(Math.random() * (maxNumber/2)) + 1;
        }
        correctAnswer = n1 + n2;
        document.getElementById('operator').innerText = "+";
    }

    document.getElementById('num1').innerText = n1;
    document.getElementById('num2').innerText = n2;
    generateOptions();
}

function generateOptions() {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    let options = new Set();
    options.add(correctAnswer);

    while(options.size < 4) {
        let wrong = correctAnswer + Math.floor(Math.random() * 5) - 2;
        if (wrong >= 0 && wrong !== correctAnswer) options.add(wrong);
        else options.add(Math.floor(Math.random() * maxNumber));
    }

    // Pomieszaj odpowiedzi
    Array.from(options).sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === correctAnswer) {
        score++;
        document.getElementById('score').innerText = score;
        alert("Brawo! 🌟");
        nextQuestion();
    } else {
        alert("Spróbuj jeszcze raz! 😊");
    }
}  
