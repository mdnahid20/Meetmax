window.onload = function () {
    const form = document.getElementById('forgotPaswordForm');
    form.onsubmit = function (event) {
        event.preventDefault();

        if (!validateForm(form)) {
            return;
        }
        const email = document.getElementById('userEmail').value;

        const user = {
            Email: email
        };


        $.ajax({
            url: "/Account/ForgotPassword",
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(user),
            success: function (data) {
                if (data.success) {
                    alert(data.message);
                } else
                    alert(data.message);
            },
            error: function (xhr, status, error) {
                alert('An error occurred while submitting the form.');
            }
        });
    };
};