const ADMIN_PASSWORD = "12345";
let quizQuestions = [];

function login() {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadTodayQuiz();
    } else {
        alert("Wrong password!");
    }
}

function addQuestion() {
    const question = document.getElementById('question').value;
    const options = [
        document.getElementById('opt1').value,
        document.getElementById('opt2').value,
        document.getElementById('opt3').value,
        document.getElementById('opt4').value
    ];
    const answer = parseInt(document.getElementById('answer').value);
    if (question && options.every(o => o) && !isNaN(answer)) {
        quizQuestions.push({ question, options, answer });
        displayQuizList();
        clearForm();
    } else {
        alert("Please fill all fields!");
    }
}

function clearForm() {
    document.getElementById('question').value = '';
    document.getElementById('opt1').value = '';
    document.getElementById('opt2').value = '';
    document.getElementById('opt3').value = '';
    document.getElementById('opt4').value = '';
    document.getElementById('answer').value = '';
}

function displayQuizList() {
    const quizList = document.getElementById('quiz-list');
    quizList.innerHTML = quizQuestions.map((q, i) => `<li>${i+1}. ${q.question}</li>`).join('');
}

function saveQuiz() {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`quiz_${today}`, JSON.stringify(quizQuestions));
    alert("Quiz saved successfully!");
}

function loadTodayQuiz() {
    const today = new Date().toISOString().split('T')[0];
    const savedQuiz = localStorage.getItem(`quiz_${today}`);
    if (savedQuiz) {
        quizQuestions = JSON.parse(savedQuiz);
        displayQuizList();
    }
}