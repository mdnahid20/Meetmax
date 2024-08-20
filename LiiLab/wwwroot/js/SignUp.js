
window.onload = function () {

    const form = document.getElementById('signUpForm');
    console.log("sdfh");
    form.onsubmit = function (event) {
        event.preventDefault();

        if (!validateForm(form)) {
            return;
        }
        const email = document.getElementById('userEmail').value;
        const name = document.getElementById('userName').value;
        const password = document.getElementById('userPassword').value;
        const birthDate = document.getElementById('dateOfBirth').value;
        const selectedGender = document.querySelector('.gender-option:checked').id === "inlineRadio1" ? true : false;

        const user = {
            Email: email,
            Name: name,
            Password: password,
            Birthdate: birthDate,
            Gender: selectedGender
        };

        
        $.ajax({
            url: "/Account/SignUp",
            dataType: "json",
            contentType: "application/json",  
            type: "POST",
            data: JSON.stringify(user),
            success: function (data) {
                if (data.success) {
                    console.log('Form data submitted successfully');
                    window.location.href = data.redirectUrl;
                } else
                   alert(data.message);
            },
            error: function (xhr, status, error) {
                alert('An error occurred while submitting the form.');
            }
        });
    }
}




const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('userPassword');

//togglePassword.addEventListener('click', function (event) {
//    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
//    passwordField.setAttribute('type', type);
//    const eyeIcon = type === 'password' ? '/Icon/Eye Off.png' : '/Icon/Eye.png';
//    togglePassword.setAttribute('src', eyeIcon);
//});
//document.getElementById('signUpForm').onsubmit = function (event) {
//    event.preventDefault();
//    const email = document.getElementById('userEmail').value;
//    const name = document.getElementById('userName').value;
//    const password = document.getElementById('userPassword').value;
//    const dateOfBirth = document.getElementById('dateOfBirth').value;
//    const selectedGender = document.querySelector('.gender-option:checked');

//    var formData = $(this).serialize();

//    console.log(formData);


//};