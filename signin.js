function signInSchool(event) {
    event.preventDefault(); 

    const schoolNameInput = document.getElementById('signInSchoolName');
    const passwordInput = document.getElementById('signInPassword');
    const errorMessage = document.getElementById('signInErrorMessage');

    if (!schoolNameInput || !passwordInput || !errorMessage) {
        console.error('Form elements not found.');
        return;
    }

    const schoolName = schoolNameInput.value.trim();
    const password = passwordInput.value.trim();

    if (schoolName === '' || password === '') {
   
        errorMessage.textContent = 'Please fill in all fields.';
        errorMessage.style.color = 'red';
        
      
        if (schoolName === '') schoolNameInput.style.borderColor = 'red';
        if (password === '') passwordInput.style.borderColor = 'red';
        
        return;
    }

    const existingData = JSON.parse(localStorage.getItem('registeredSchools')) || [];
    const school = existingData.find(data => data.schoolName === schoolName);
    if (!school || school.password !== password) {
        errorMessage.textContent = 'Invalid school name or password.';
        errorMessage.style.color = 'red';
        
   
        schoolNameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
        
        return;
    }


    errorMessage.textContent = '';
    

    schoolNameInput.style.borderColor = '';
    passwordInput.style.borderColor = '';

    alert('Sign-in successful!');

    const modal = document.getElementById('quizModal');
    modal.style.display = 'block';

    document.getElementById('signInForm').reset();
}

document.getElementById('startQuizBtn').addEventListener('click', function() {
    window.location.href = 'quiz.html'; 
});

document.getElementById('signInForm').addEventListener('submit', signInSchool);
