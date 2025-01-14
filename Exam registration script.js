// URL API для обработки запросов
const apiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; 

// Функция для обработки регистрации
document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Отменяем стандартное поведение формы
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        showNotification(data.message, 'regNotificationArea', response.ok ? 'success' : 'danger');
        
        // Можно перенаправить пользователя на страницу авторизации после успешной регистрации
        if (response.ok) {
            setTimeout(() => {
                window.location.href = 'login.html'; // Перенаправление на страницу авторизации
            }, 2000);
        }
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        showNotification('Ошибка при регистрации. Попробуйте еще раз.', 'regNotificationArea', 'danger');
    }
});

// Функция для отображения уведомлений
function showNotification(message, areaId, type) {
    const notificationArea = document.getElementById(areaId);
    notificationArea.innerHTML = `
        <div class="alert alert-${type}">${message}</div>
    `;
    setTimeout(() => {
        notificationArea.innerHTML = '';
    }, 5000);
}