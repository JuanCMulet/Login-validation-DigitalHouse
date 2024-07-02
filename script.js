document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorConfirmPassword = document.getElementById('errorConfirmPassword');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    emailInput.addEventListener('blur', function() {
        validateEmail();
    });

    emailInput.addEventListener('change', function() {
        clearError(errorEmail);
    });

    passwordInput.addEventListener('change', function() {
        clearError(errorPassword);
    });

    confirmPasswordInput.addEventListener('change', function() {
        clearError(errorConfirmPassword);
    });

    showHideButton.addEventListener('click', function() {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        };
    });

    function validateForm() {
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const passwordMatch = validatePasswordMatch();

        if (isValidEmail && isValidPassword && passwordMatch) {
            saveToLocalStorage();
            alert('¡Login succesful!');
        };

    };

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();

        if (!emailRegex.test(emailValue)) {
            showError(errorEmail, '¡The email is not valid!');
            return false;
        };


        return true;
    };

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();

        if (passwordValue.length < 6) {
            showError(errorPassword, '¡The password is not valid!');
            return false;
        };


        return true;
    };

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue != confirmPasswordValue) {
            showError(errorConfirmPassword, "¡The passwords don't match!");
            return false;
        };


        return true;
    };

    function showError(errorElement, message) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    };

    function clearError(errorElement) {
        errorElement.innerHTML = '';
        errorElement.style.display = 'none';
    };

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    };

    function bodyBuilderJSON() {
        return {
            'email': emailInput.value,
            'password': passwordInput.value
        }
    };



});