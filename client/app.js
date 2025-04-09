// DOM Elements
const loginPage = document.getElementById('loginPage');
const adminPage = document.getElementById('adminPage');
const userPage = document.getElementById('userPage');
const loginForm = document.getElementById('loginForm');
const questionForm = document.getElementById('questionForm');
const questionsList = document.getElementById('questionsList');
const currentQuestion = document.getElementById('currentQuestion');
const userAnswer = document.getElementById('userAnswer');
const submitAnswer = document.getElementById('submitAnswer');
const logoutBtn = document.getElementById('logoutBtn');
const userLogoutBtn = document.getElementById('userLogoutBtn');

// State
let currentUser = null;
let questions = [];
let currentQuestionIndex = 0;

// API URL
const API_URL = 'http://localhost:5000/api';

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
questionForm.addEventListener('submit', handleQuestionSubmit);
submitAnswer.addEventListener('click', handleAnswerSubmit);
logoutBtn.addEventListener('click', handleLogout);
userLogoutBtn.addEventListener('click', handleLogout);

// Login Handler
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            
            if (username === '@msmschool' && password === 'admin') {
                showAdminPage();
                loadQuestions();
            } else {
                showUserPage();
                loadUserQuestions();
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Question Management
async function handleQuestionSubmit(e) {
    e.preventDefault();
    const questionData = {
        question: document.getElementById('questionText').value,
        answer: document.getElementById('answer').value,
        hint: document.getElementById('hint').value,
        order: parseInt(document.getElementById('order').value)
    };

    try {
        const response = await fetch(`${API_URL}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(questionData)
        });

        if (response.ok) {
            loadQuestions();
            questionForm.reset();
        } else {
            alert('Failed to save question');
        }
    } catch (error) {
        console.error('Save question error:', error);
        alert('Failed to save question');
    }
}

async function loadQuestions() {
    try {
        const response = await fetch(`${API_URL}/questions`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        questions = await response.json();
        displayQuestions();
    } catch (error) {
        console.error('Load questions error:', error);
    }
}

function displayQuestions() {
    questionsList.innerHTML = questions.map((q, index) => `
        <div class="question-item">
            <h4>Question ${q.order}</h4>
            <p>${q.question}</p>
            <p><strong>Answer:</strong> ${q.answer}</p>
            ${q.hint ? `<p><strong>Hint:</strong> ${q.hint}</p>` : ''}
            <div class="question-actions">
                <button class="edit-btn" onclick="editQuestion(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteQuestion('${q._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

async function deleteQuestion(id) {
    if (confirm('Are you sure you want to delete this question?')) {
        try {
            const response = await fetch(`${API_URL}/questions/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            if (response.ok) {
                loadQuestions();
            }
        } catch (error) {
            console.error('Delete question error:', error);
        }
    }
}

// User Interface
async function loadUserQuestions() {
    try {
        const response = await fetch(`${API_URL}/questions`);
        questions = await response.json();
        showCurrentQuestion();
    } catch (error) {
        console.error('Load user questions error:', error);
    }
}

function showCurrentQuestion() {
    if (questions.length === 0) {
        currentQuestion.innerHTML = '<p>No questions available.</p>';
        return;
    }

    const question = questions[currentQuestionIndex];
    currentQuestion.innerHTML = `
        <h3>Question ${question.order}</h3>
        <p>${question.question}</p>
        ${question.hint ? `<p class="hint">Hint: ${question.hint}</p>` : ''}
    `;
}

async function handleAnswerSubmit() {
    const answer = userAnswer.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (answer === correctAnswer) {
        alert('Correct! Moving to next question...');
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        showCurrentQuestion();
        userAnswer.value = '';
    } else {
        alert('Incorrect answer. Try again!');
    }
}

// Page Navigation
function showAdminPage() {
    loginPage.classList.add('hidden');
    userPage.classList.add('hidden');
    adminPage.classList.remove('hidden');
}

function showUserPage() {
    loginPage.classList.add('hidden');
    adminPage.classList.add('hidden');
    userPage.classList.remove('hidden');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('token');
    loginPage.classList.remove('hidden');
    adminPage.classList.add('hidden');
    userPage.classList.add('hidden');
    loginForm.reset();
}

// Check for existing session
const token = localStorage.getItem('token');
if (token) {
    // Verify token and redirect to appropriate page
    fetch(`${API_URL}/auth/verify`, {
        headers: {
            'x-auth-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user.username === '@msmschool') {
            showAdminPage();
            loadQuestions();
        } else {
            showUserPage();
            loadUserQuestions();
        }
    })
    .catch(() => {
        localStorage.removeItem('token');
    });
} 