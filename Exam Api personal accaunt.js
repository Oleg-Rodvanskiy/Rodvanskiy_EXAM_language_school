const api = 'a368fec3-b9e2-487a-87bf-e54be8869609'; 
const coursesApiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; // URL для курсов
const tutorsApiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; // URL для репетиторов
const ordersPerPage = 5; // Количество заявок на странице
let currentPage = 1;

// Функция для загрузки заявок
async function fetchOrders(page = 1) {
    try {
        const response = await fetch(`${apiUrl}?_page=${page}&_limit=${ordersPerPage}`);
        if (!response.ok) throw new Error('Ошибка при загрузке заявок');
        const orders = await response.json();
        displayOrders(orders);
        setupPagination(page);
    } catch (error) {
        showNotification('Ошибка: ' + error.message, 'danger');
    }
}

// Функция для отображения заявок в таблице
function displayOrders(orders) {
    const ordersTableBody = document.getElementById('ordersTableBody');
    ordersTableBody.innerHTML = '';

    orders.forEach((order, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${order.courseName}</td>
                <td>${order.classDate}</td>
                <td>${order.totalCost}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditOrderModal(${order.id})">Редактировать</button>
                    <button class="btn btn-danger" onclick="confirmDeleteOrder(${order.id})">Удалить</button>
                </td>
            </tr>
        `;
        ordersTableBody.innerHTML += row;
    });
}

// Функция для настройки пагинации
function setupPagination(currentPage) {
    const paginationNav = document.getElementById('paginationNav');
    paginationNav.innerHTML = '';

    const totalOrders = 50; // Замените на количество заказов, полученных с сервера
    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="fetchOrders(${i})">${i}</a>`;
        paginationNav.appendChild(pageItem);
    }
}

// Функция для создания заявки
document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const courseName = document.getElementById('courseName').value;
    const classDate = document.getElementById('classDate').value;
    const totalCost = document.getElementById('totalCost').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseName, classDate, totalCost })
        });

        if (!response.ok) throw new Error('Ошибка создания заявки');
        showNotification('Заявка успешно создана!', 'success');
        fetchOrders(currentPage); // Обновление списка заявок
        $('#orderModal').modal('hide'); // Скрытие модального окна
    } catch (error) {
        showNotification('Ошибка: ' + error.message, 'danger');
    }
});

// Функция для открытия модального окна редактирования
function openEditOrderModal(orderId) {
    // Здесь вы можете загрузить данные заявки и заполнить форму
    $('#orderModal').modal('show'); // Открытие модального окна
}

// Функция для подтверждения удаления заявки
async function confirmDeleteOrder(orderId) {
    const confirmation = confirm('Вы уверены, что хотите удалить заявку?');
    if (confirmation) {
        await deleteOrder(orderId);
    }
}

// Функция для удаления заявки
async function deleteOrder(orderId) {
    try {
        const response = await fetch(`${apiUrl}/${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Ошибка удаления заявки');
        showNotification('Заявка успешно удалена!', 'success');
        fetchOrders(currentPage); // Обновление списка заявок
    } catch (error) {
        showNotification('Ошибка: ' + error.message, 'danger');
    }
}

// Функция для отображения уведомлений
function showNotification(message, type) {
    const notificationArea = document.getElementById('notificationArea');
    notificationArea.innerHTML = `
        <div class="alert alert-${type} notification">${message}</div>
    `;
    setTimeout(() => {
        notificationArea.innerHTML = '';
    }, 5000);
}

// Загрузка заявок при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    fetchOrders(currentPage);
});