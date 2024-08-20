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
function toggleDropdown() {
    console.log(2);
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}
function selectLanguage(language) {
    document.querySelector('.english-uk').textContent = language;
    document.querySelector('.dropdown-content').style.display = 'none';
}