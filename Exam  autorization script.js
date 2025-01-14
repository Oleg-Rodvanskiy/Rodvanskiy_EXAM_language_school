// URL API для обработки запросов
const apiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; 

// Функция для обработки авторизации
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Отменяем стандартное поведение формы
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        showNotification(data.message, 'loginNotificationArea', response.ok ? 'success' : 'danger');

        // Если вход успешный, можно сохранить токен или данные пользователя
        if (response.ok) {
            localStorage.setItem('userToken', data.token); // Сохранение токена в локальном хранилище
            // Перенаправление на другую страницу или выполнение других действий
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        showNotification('Ошибка при авторизации. Попробуйте еще раз.', 'loginNotificationArea', 'danger');
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

// Обработчик для перехода на страницу регистрации
document.getElementById('registerLink').addEventListener('click', function() {
    window.location.href = "exam registration.html"; // Перенаправление на страницу регистрации
});