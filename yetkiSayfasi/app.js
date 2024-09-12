function openNewUserForm() {
    window.location.href = 'new-user.html'; // new-user.html sayfasına yönlendirir
}

function editUser(userName) {
    window.location.href = 'permissions.html?user=' + encodeURIComponent(userName); // permissions.html sayfasına yönlendirir
}

// Kullanıcı silme fonskiyonu
let userIdToDelete = ''; 

function deleteUser(userId) {
    userIdToDelete = userId; 
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal')); 
    deleteModal.show(); 
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    if (userIdToDelete) {
        const row = document.getElementById(userIdToDelete);
        if (row) {
            row.remove(); 
            showToast('Kullanıcı silindi!'); 
        }
        userIdToDelete = ''; 
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
        deleteModal.hide();
    }
});

// Toast mesajı gösterme fonksiyonu
function showToast(message) {
    const toastEl = document.getElementById('toastMessage');
    toastEl.querySelector('.toast-body').innerText = message;

    const toast = new bootstrap.Toast(toastEl); 
    toast.show(); 
}

let userIdToPassive = ''; // Pasif yapılacak kullanıcı ID'sini geçici olarak saklayacak değişken

// Pasif yap butonuna tıklanınca modal açılır ve userId geçici olarak saklanır
function makePassive(userId) {
    userIdToPassive = userId; // Pasif yapılacak kullanıcının ID'si kaydediliyor
    const passiveModal = new bootstrap.Modal(document.getElementById('passiveConfirmModal')); // Modal instance'ı oluşturulur
    passiveModal.show(); // Modal açılır
}

// Modal üzerindeki "Evet, Pasif Yap" butonuna tıklanınca kullanıcı pasif yapılır
document.getElementById('confirmPassiveBtn').addEventListener('click', function() {
    if (userIdToPassive) {
        const row = document.getElementById(userIdToPassive);
        if (row) {
            row.classList.add('passive');
            const statusCell = row.querySelector('td:first-child');
            if (statusCell) {
                statusCell.innerHTML += ' <span class="status">Pasif</span>'; // "Pasif" etiketini ekler
            }
            showToast('Kullanıcı pasif yapıldı!'); // Pasif yapma işlemi başarılıysa toast mesajı gösterilir
        }
        userIdToPassive = ''; // Pasif yapılacak kullanıcı ID'si sıfırlanır
        const passiveModal = bootstrap.Modal.getInstance(document.getElementById('passiveConfirmModal'));
        passiveModal.hide(); // Modal kapanır
    }
});

// Toast mesajı gösterme fonksiyonu
function showToast(message) {
    const toastEl = document.getElementById('toastMessage');
    toastEl.querySelector('.toast-body').innerText = message;

    const toast = new bootstrap.Toast(toastEl); // Bootstrap Toast instance'ı oluşturulur
    toast.show(); // Toast gösterilir
}



