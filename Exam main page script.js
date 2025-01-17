// Функция для обработки клика на ссылку "Личный кабинет"
document.addEventListener('DOMContentLoaded', function () {
    const personalAccountLink = document.querySelector('.nav-link[href="#account"]'); // Находим ссылку "Личный кабинет"

    // Обработчик события клика
    personalAccountLink.addEventListener('click', function (event) {
        event.preventDefault(); // Отменяем стандартное поведение ссылки
        window.location.href = "exam autorization.html "; // Перенаправляем на страницу авторизации
    });
});