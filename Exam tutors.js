// URL API для получения данных о репетиторах и курсах
const tutorsApiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; 
const coursesApiUrl = 'http://cat-facts-api.std-900.ist.mospolytech.ru/'; 

// Функция для поиска репетиторов
document.getElementById('searchTutorForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const languageLevel = document.getElementById('languageLevel').value;
    const availableDays = getAvailableDays();
    const timeSlots = document.getElementById('timeSlots').value;

    try {
        const response = await fetch(`${tutorsApiUrl}?level=${languageLevel}&days=${availableDays}&timeSlots=${timeSlots}`);
        const tutors = await response.json();
        displayTutors(tutors);
    } catch (error) {
        showNotification('Ошибка: ' + error.message, 'danger');
    }
});

// Функция для получения выбранных дней
function getAvailableDays() {
    const days = [];
    if (document.getElementById('monday').checked) days.push('monday');
    if (document.getElementById('tuesday').checked) days.push('tuesday');
    if (document.getElementById('wednesday').checked) days.push('wednesday');
    if (document.getElementById('thursday').checked) days.push('thursday');
    if (document.getElementById('friday').checked) days.push('friday');
    if (document.getElementById('saturday').checked) days.push('saturday');
    if (document.getElementById('sunday').checked) days.push('sunday');
    return days.join(',');
}

// Функция для отображения найденных репетиторов
function displayTutors(tutors) {
    const tutorResults = document.getElementById('tutorResults');
    tutorResults.innerHTML = '';

    tutors.forEach(tutor => {
        const row = `
            <tr onclick="selectTutor(${tutor.id}, '${tutor.name}', '${tutor.photo}', ${tutor.hourlyRate})">
                <td>${tutor.name}</td>
                <td>${tutor.level}</td>
                <td>${tutor.languages.join(', ')}</td>
                <td>${tutor.experience}</td>
                <td>${tutor.hourlyRate}</td>
                <td><img src="${tutor.photo}" alt="Фото" style="width: 50px;"></td>
                <td><button class="btn btn-success">Выбрать</button></td>
            </tr>
        `;
        tutorResults.innerHTML += row;
    });
}

// Функция для выбора репетитора
function selectTutor(id, name, photo, hourlyRate) {
    document.getElementById('tutorDetailsSection').style.display = 'block';
    document.getElementById('tutorDetails').innerHTML = `
        <div class="card">
            <img src="${photo}" class="card-img-top" alt="Фото">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Часовая ставка: ${hourlyRate} руб.</p>
                <button class="btn btn-primary" onclick="openApplicationModal('${name}')">Подать заявку</button>
            </div>
        </div>
    `;
}

// Функция для открытия модального окна подачи заявки
function openApplicationModal(tutorName) {
    document.getElementById('tutorName').value = tutorName;
    document.getElementById('courseName').value = 'Russian for beginners'; 
    $('#applicationModal').modal('show');
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