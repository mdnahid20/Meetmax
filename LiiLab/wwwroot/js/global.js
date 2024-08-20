document.addEventListener('DOMContentLoaded', function () {
    function togglePasswordVisibility(event) {
        const passwordField = event.target.previousElementSibling;
        const icon = event.target;

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye'); 
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }

    const toggleIcons = document.querySelectorAll('.toggle-password');
    toggleIcons.forEach(function (icon) {
        icon.addEventListener('click', togglePasswordVisibility);
    });
});
