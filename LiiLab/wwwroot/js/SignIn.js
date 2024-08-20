window.onload = function () {
    const storedUseremail = localStorage.getItem('rememberedUserEmail');
    console.log(storedUseremail)
    if (storedUseremail) {
        document.getElementById('userEmail').value = storedUseremail;
        document.getElementById('rememberMe').checked = true;
    }

    var form = document.getElementById('loginForm');

    form.onsubmit = function (event) {
        event.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (rememberMe) {
            localStorage.setItem('rememberedUserEmail', useremail);
        } else {
            localStorage.removeItem('rememberedUserEmail');
        }

        if (!validateForm(form)) {
            return;
        }

        const user = {
            Email: email,
            Password: password,
        };

        $.ajax({
            url: "/Account/Index",
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
    };
};
