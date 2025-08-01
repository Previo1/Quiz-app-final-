<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Admin Panel</h2>
    <input type="email" id="admin-email" placeholder="Admin Email">
    <input type="password" id="admin-password" placeholder="Password">
    <button id="login-btn">Login</button>

    <div id="admin-section" style="display:none;">
        <h3>Add Quiz</h3>
        <input type="text" id="quiz-question" placeholder="Question">
        <input type="text" id="quiz-option1" placeholder="Option 1">
        <input type="text" id="quiz-option2" placeholder="Option 2">
        <input type="text" id="quiz-option3" placeholder="Option 3">
        <input type="text" id="quiz-option4" placeholder="Option 4">
        <input type="number" id="quiz-correct" placeholder="Correct Option (1-4)">
        <button id="add-quiz-btn">Add Quiz</button>
    </div>

    <!-- Firebase Scripts -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

    <!-- Firebase Config -->
    <script src="firebase-config.js"></script>

    <!-- Admin Logic -->
    <script src="admin.js"></script>
</body>
</html>
