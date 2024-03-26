$('#symbolica-register-btn').click(function() {
    var username = $('#symbolica-username-input').val();
    var password = $('#symbolica-password-input').val();

    var body = JSON.stringify({
        "username": username,
        "password": password
    });

    $.ajax({
        url: 'https://auth.l2stack.click/api/v1/auth/register',
        type: 'POST',
        contentType: 'application/json',
        data: body,
        dataType: 'json',
        crossDomain: true, // Cho phép CORS
        success: function(result) {
            var symbolicaResult = $('#symbolica-result');
            if (result.message === "Đăng ký tài khoản mới thành công.") {
                symbolicaResult.text(result.data);
                $('#symbolica-username-input').prop('disabled', true);
                $('#symbolica-password-input').prop('disabled', true);
                $('#symbolica-register-btn').prop('disabled', true);
            } else if (result.message === "Đăng ký tài khoản thất bại") {
                symbolicaResult.text(result.data);
                $('#symbolica-register-btn').prop('disabled', true);
                setTimeout(function() {
                    $('#symbolica-register-btn').prop('disabled', false);
                }, 5000);
            }
        },
        error: function(xhr, status, error) {
            console.error('Có lỗi xảy ra:', error);
        }
    });
});
