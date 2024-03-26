document.getElementById('symbolica-register-btn').addEventListener('click', function() {
    // Lấy nội dung của input
    var username = document.getElementById('symbolica-username-input').value;
    var password = document.getElementById('symbolica-password-input').value;

    // Tạo body request
    var body = JSON.stringify({
        "username": username,
        "password": password
    });

    // Gửi request POST đến API
    fetch('https://auth.l2stack.click/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
        mode: 'no-cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        // Xử lý kết quả từ API
        var symbolicaResult = document.getElementById('symbolica-result');
        if (result.message === "Đăng ký tài khoản mới thành công.") {
            // Xử lý khi đăng ký thành công
            symbolicaResult.textContent = result.data;
            // Vô hiệu hóa input và button
            document.getElementById('symbolica-username-input').disabled = true;
            document.getElementById('symbolica-password-input').disabled = true;
            document.getElementById('symbolica-register-btn').disabled = true;
        } else if (result.message === "Đăng ký tài khoản thất bại") {
            // Xử lý khi đăng ký thất bại
            symbolicaResult.textContent = result.data;
            // Vô hiệu hóa button trong 5 giây
            document.getElementById('symbolica-register-btn').disabled = true;
            setTimeout(function() {
                document.getElementById('symbolica-register-btn').disabled = false;
            }, 5000);
        }
    })
    .catch(function(error) {
        console.error('Có lỗi xảy ra:', error);
    });
});
