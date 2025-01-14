let map;
let markers = []; // Массив для хранения маркеров
const api = 'c692e385-da16-4f1e-bccf-1f220564d52c'; 
// Функция для инициализации карты
function initMap() {
    // Создаем карту
    map = new ymaps.Map('map', {
        center: [55.7558, 37.6173], // Центрируем карту на Москве
        zoom: 12
    });

    // Добавляем ресурсы на карту
    addResources();
}

// Функция для добавления ресурсов на карту
function addResources() {
    const resources = [
        {
            name: "Языковой клуб",
            address: "ул. Тверская, 15",
            hours: "09:00 - 21:00",
            contact: "+7 (495) 123-45-67",
            description: "Занятия по разговорному русскому языку.",
            location: [55.759, 37.617]
        },
        {
            name: "Библиотека им. Пушкина",
            address: "ул. Маяковская, 5",
            hours: "10:00 - 20:00",
            contact: "+7 (495) 123-45-68",
            description: "Библиотека с русскоязычными ресурсами.",
            location: [55.764, 37.617]
        },
        {
            name: "Кафе языкового обмена",
            address: "ул. Арбат, 20",
            hours: "08:00 - 22:00",
            contact: "+7 (495) 123-45-69",
            description: "Кафе для языкового обмена.",
            location: [55.749, 37.605]
        }
    ];

    // Создаем маркеры для каждого ресурса
    resources.forEach(resource => {
        const placemark = new ymaps.Placemark(resource.location, {
            balloonContent: `
                <div>
                    <h5>${resource.name}</h5>
                    <p><strong>Адрес:</strong> ${resource.address}</p>
                    <p><strong>Часы работы:</strong> ${resource.hours}</p>
                    <p><strong>Контакт:</strong> ${resource.contact}</p>
                    <p><strong>Описание:</strong> ${resource.description}</p>
                </div>
            `
        });

        map.geoObjects.add(placemark); // Добавляем маркер на карту
        markers.push(placemark); // Сохраняем маркер в массив
    });
}

// Функция для поиска ресурсов
function searchResources() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();

    // Скрываем все маркеры
    markers.forEach(marker => {
        marker.options.set('visible', false);
    });

    // Перебираем ресурсы и показываем только те, которые соответствуют поисковому запросу
    const filteredResources = [
        {
            name: "Языковой клуб",
            address: "ул. Тверская, 15",
            hours: "09:00 - 21:00",
            contact: "+7 (495) 123-45-67",
            description: "Занятия по разговорному русскому языку.",
            location: [55.759, 37.617]
        },
        {
            name: "Библиотека им. Пушкина",
            address: "ул. Маяковская, 5",
            hours: "10:00 - 20:00",
            contact: "+7 (495) 123-45-68",
            description: "Библиотека с русскоязычными ресурсами.",
            location: [55.764, 37.617]
        },
        {
            name: "Кафе языкового обмена",
            address: "ул. Арбат, 20",
            hours: "08:00 - 22:00",
            contact: "+7 (495) 123-45-69",
            description: "Кафе для языкового обмена.",
            location: [55.749, 37.605]
        }
    ];

    filteredResources.forEach(resource => {
        if (resource.name.toLowerCase().includes(searchTerm) || resource.description.toLowerCase().includes(searchTerm)) {
            const placemark = new ymaps.Placemark(resource.location, {
                balloonContent: `
                    <div>
                        <h5>${resource.name}</h5>
                        <p><strong>Адрес:</strong> ${resource.address}</p>
                        <p><strong>Часы работы:</strong> ${resource.hours}</p>
                        <p><strong>Контакт:</strong> ${resource.contact}</p>
                        <p><strong>Описание:</strong> ${resource.description}</p>
                    </div>
                `
            });

            map.geoObjects.add(placemark); // Добавляем маркер на карту
            placemark.options.set('visible', true); // Показываем маркер
            markers.push(placemark); // Сохраняем маркер в массив
        }
    });
}

// Инициализация карты после загрузки
ymaps.ready(initMap);