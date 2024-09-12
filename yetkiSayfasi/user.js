document.addEventListener('DOMContentLoaded', () => {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right", 
        "timeOut": "3000", 
    };

    const saveButton = document.querySelector('.btn-primary');
    
    saveButton.addEventListener('click', () => {
        // Form verilerini al
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const permissions = Array.from(document.getElementById('permissions').selectedOptions).map(option => option.text);

        // Basit doğrulama
        if (!username || !password) {
            toastr.error('Kullanıcı adı ve şifre alanları boş olamaz.', 'Hata');
            return;
        }

        // Kullanıcı verilerini oluştur
        const user = {
            username: username,
            password: password,
            permissions: permissions
        };

        // Mevcut kullanıcıları al
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Yeni kullanıcıyı ekle
        users.push(user);

        // Güncellenmiş kullanıcıları localStorage'a kaydet
        localStorage.setItem('users', JSON.stringify(users));

        // Başarı mesajı göster
        toastr.success('Kullanıcı başarıyla kaydedildi.', 'Başarılı!');

        // 2 saniye sonra yönlendirme yap
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});