function registerSchool(event) {
    event.preventDefault(); 

    const schoolNameInput = document.getElementById('regSchoolName');
    const passwordInput = document.getElementById('regPassword');
    const candidateNamesInput = document.getElementById('regCandidateNames');
    const errorMessage = document.getElementById('errorMessage');

    if (!schoolNameInput || !passwordInput || !candidateNamesInput || !errorMessage) {
        console.error('Form elements not found.');
        return;
    }

    const schoolName = schoolNameInput.value.trim();
    const password = passwordInput.value.trim();
    const candidateNames = candidateNamesInput.value.trim();

    if (schoolName === '' || password === '' || candidateNames === '') {
        // Set border color to red for empty fields
        if (schoolName === '') schoolNameInput.style.borderColor = 'red';
        if (password === '') passwordInput.style.borderColor = 'red';
        if (candidateNames === '') candidateNamesInput.style.borderColor = 'red';

        // Display error message
        errorMessage.textContent = 'Please fill in all fields.';
        errorMessage.style.color = 'red';
        return; // Exit the function without further action
    }

    const existingData = JSON.parse(localStorage.getItem('registeredSchools')) || [];
    const isExistingSchool = existingData.some(data => data.schoolName === schoolName);
    if (isExistingSchool) {
        errorMessage.textContent = 'School already registered.';
        errorMessage.style.color = 'red';
        return;
    }

    const registrationData = {
        schoolName: schoolName,
        password: password, 
        candidateNames: candidateNames.split('\n').map(name => name.trim()) 
    };
    existingData.push(registrationData);
    localStorage.setItem('registeredSchools', JSON.stringify(existingData));

    localStorage.setItem('regCandidateNames', candidateNames);
    localStorage.setItem('regSchoolName', schoolName);

    // Remove error message
    errorMessage.textContent = '';

    window.location.href = 'signin.html';

    event.target.reset();
}

const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', registerSchool);
} else {
    console.error('Registration form not found.');
}
