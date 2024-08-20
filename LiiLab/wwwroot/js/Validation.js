//(function () {
//    document.addEventListener('DOMContentLoaded', function () {
        


//        const forms = document.querySelectorAll('form.validate-form');
//        forms.forEach(form => {
//            form.addEventListener('submit', function (event) {
//                event.preventDefault();
//                if (validateForm(form)) {
//                    sendFormData(form);
//                }
//            });
//        });
//    });

    function validateForm(form) {
        let isValid = true;
        clearErrors(form);
        console.log("df");

        const inputs = form.querySelectorAll('[name]');
        inputs.forEach(input => {
            const name = input.getAttribute('name');
            if (!validateField(input, name)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(input, name) {
        let isValid = true;
        const value = input.value.trim();
        switch (name) {
            case 'email':
                if (value == '')
                {
                    setError(input, 'Email is required');
                    isValid = false;
                }
                else if (!validateEmail(value)) {
                    setError(input, 'Please enter a valid email address.');
                    isValid = false;
                }
                break;
            case 'password':
                if (value.length < 8) {
                    setError(input, 'Password must be at least 8 characters long.');
                    isValid = false;
                }
                break;
            case 'name':
                if (value === '') {
                    setError(input, 'Name is required.');
                    isValid = false;
                }
                break;
            case 'date':
                if (value === '') {
                    setError(input, 'date is required.');
                    isValid = false;
                }
                break;
            case 'inlineRadioOptions': 
                const genderRadios = document.getElementsByName('inlineRadioOptions');
                if (![...genderRadios].some(radio => radio.checked)) {
                    setError(input, 'Gender is required.');
                    isValid = false;
                }
                break;
            default:
                break;
        }

        return isValid;
    }

    function setError(input, message) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error';
        errorSpan.textContent = message;
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }

    function clearErrors(form) {
        const errors = form.querySelectorAll('.error');
        errors.forEach(error => error.remove());
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
/*})();*/
