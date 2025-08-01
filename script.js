const urlParams = new URLSearchParams(window.location.search);
const referrer = urlParams.get('ref');

if (referrer && !localStorage.getItem('referrer')) {
    localStorage.setItem('referrer', referrer);
    let referrerBoosters = JSON.parse(localStorage.getItem(`boosters_${referrer}`)) || [];
    const newUserId = 'user_' + Date.now();
    localStorage.setItem('userId', newUserId);
    referrerBoosters.push(newUserId);
    localStorage.setItem(`boosters_${referrer}`, JSON.stringify(referrerBoosters));
}

if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', 'user_' + Date.now());
}

let coins = parseInt(localStorage.getItem('coins')) || 0;
const userId = localStorage.getItem('userId');
document.getElementById('coin-count').innerText = coins;

function addCoins(amount) {
    coins += amount;
    localStorage.setItem('coins', coins);
    document.getElementById('coin-count').innerText = coins;
    updateLeaderboard();
}

async function loadQuiz() {
    const today = new Date().toISOString().split('T')[0];
    const quizData = localStorage.getItem(`quiz_${today}`);

    if (quizData) {
        const quiz = JSON.parse(quizData);
        displayQuiz(quiz);
    } else {
        document.getElementById('quiz-container').innerHTML = "<p>No quiz available today!</p>";
    }
}

function displayQuiz(questions) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<p>${q.question}</p>
            ${q.options.map((opt, i) =>
                `<button onclick="checkAnswer(${index}, ${i}, ${q.answer})">${opt}</button>`
            ).join('<br>')}`;
        container.appendChild(div);
    });
}

function checkAnswer(qIndex, selected, correct) {
    if (selected === correct) {
        addCoins(10);
        alert("Correct! +10 coins");
    } else {
        alert("Wrong answer!");
    }
}

document.getElementById('start-quiz').addEventListener('click', loadQuiz);

function giveBoosterCoins() {
    const myUserId = localStorage.getItem('userId');
    const myBoosters = JSON.parse(localStorage.getItem(`boosters_${myUserId}`)) || [];
    let boosterCoins = myBoosters.length * 5;
    if (boosterCoins > 0) {
        addCoins(boosterCoins);
        alert(`Booster reward: +${boosterCoins} coins from friends!`);
    }
}

function showBoosters() {
    const myUserId = localStorage.getItem('userId');
    const myBoosters = JSON.parse(localStorage.getItem(`boosters_${myUserId}`)) || [];
    const boosterList = document.getElementById('booster-list');
    boosterList.innerHTML = myBoosters.length > 0
        ? myBoosters.map(b => `<li>${b}</li>`).join('')
        : "<li>No boosters yet</li>";
}

document.getElementById('copy-link').addEventListener('click', () => {
    const myUserId = localStorage.getItem('userId');
    const link = `${window.location.origin}?ref=${myUserId}`;
    navigator.clipboard.writeText(link);
    alert("Referral link copied: " + link);
});

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const userIndex = leaderboard.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
        leaderboard[userIndex].coins = coins;
    } else {
        leaderboard.push({ id: userId, coins: coins });
    }
    leaderboard.sort((a, b) => b.coins - a.coins);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    showLeaderboard();
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = leaderboard
        .slice(0, 10)
        .map((u, i) => `<li>#${i + 1} ${u.id} - ${u.coins} coins</li>`)
        .join('');
}

window.onload = () => {
    document.getElementById('coin-count').innerText = coins;
    giveBoosterCoins();
    showBoosters();
    updateLeaderboard();
};