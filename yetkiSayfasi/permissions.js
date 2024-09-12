document.addEventListener('DOMContentLoaded', () => {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right",
        "timeOut": "3000",
    };

    const assignPermissionsButton = document.getElementById('assignPermissions');
    const userSelect = document.getElementById('userSelect');
    const permissionsSelect = document.getElementById('permissions');

    // Kullanıcıları yükleme (Örnek olarak localStorage'dan)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userSelectElement = userSelect;

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        userSelectElement.appendChild(option);
    });

    assignPermissionsButton.addEventListener('click', () => {
        const selectedUser = userSelect.value;
        const selectedPermissions = Array.from(permissionsSelect.selectedOptions).map(option => option.text);

        if (!selectedUser) {
            toastr.error('Lütfen bir kullanıcı seçin.', 'Hata');
            return;
        }

        // Kullanıcıları güncelleme
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.username === selectedUser);

        if (userIndex === -1) {
            toastr.error('Kullanıcı bulunamadı.', 'Hata');
            return;
        }

        users[userIndex].permissions = selectedPermissions;
        localStorage.setItem('users', JSON.stringify(users));

        toastr.success('Yetkiler başarıyla verildi.', 'Başarılı!');

        // 2 saniye sonra yönlendirme yap
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});
