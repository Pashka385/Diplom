document.getElementById('find_btn').addEventListener('click', async () => {
    const lastName = document.getElementById('find_input').value.trim();

    if (!lastName) {
        alert('Введите фамилию клиента');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/findByLastName/${encodeURIComponent(lastName)}`);
        const resultBlock = document.querySelector('.result_find');

        if (response.ok) {
            const data = await response.json();
            resultBlock.innerHTML = ''; // Очищаем блок перед добавлением нового результата

            data.forEach((request) => {
                const requestDiv = document.createElement('div');
                requestDiv.className = 'request-item';
                requestDiv.dataset.id = request.id; // Сохраняем ID заявки
                requestDiv.innerHTML = `
                    <h3>Заявка №${request.id}</h3>
                    <p><strong>Фамилия Имя:</strong> ${request.Surname || 'Нет описания'}</p>
                    <p><strong>Статус:</strong> <span class="status">${request.status}</span></p>
                    <p><strong>Комментарии:</strong> ${request.comments || 'Нет комментариев'}</p>
                    <p><strong>Сотрудник:</strong> ${request.employeer || 'Не назначен'}</p>
                    <p><strong>Дата открытия:</strong> ${request.TimeOpen || 'Не назначен'}</p>
                    <p><strong>Дата закрытия:</strong> ${request.TimeClose || 'Не назначен'}</p>
                    <p><strong>Номер телефона клиента:</strong> ${request.telephone || 'Нет описания'}</p>
                    <p><strong>Дата перевода в статус в процессе:</strong> ${request.Process_date || 'Не назначен'}</p>
                    <p><strong>Дата талона клиента:</strong> ${request.Person_come || 'Не назначен'}</p>
                    <p><strong>Описание:</strong> ${request.Opisanie || 'Нет описания'}</p>
                    <p><strong>Стоимость:</strong> ${request.Cost || 'Нет описания'}</p>
                    <button class="delete-btn" data-id="${request.id}">Удалить</button>
                    <button class="edit-btn" data-id="${request.id}">Редактировать</button>
                `;
                resultBlock.appendChild(requestDiv);

                // Обработчик кнопки редактирования
                requestDiv.querySelector('.edit-btn').addEventListener('click', () => openEditModal(request));

                // Обработчик кнопки удаления
                requestDiv.querySelector('.delete-btn').addEventListener('click', () => deleteRequest(request.id, requestDiv));
            });
        } else if (response.status === 404) {
            resultBlock.innerHTML = '<p>Заявки с такой фамилией не найдены.</p>';
        } else {
            throw new Error('Ошибка при выполнении запроса');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при поиске заявки. Попробуйте позже.');
    }
});

// Очистка поиска
document.getElementById('clear_btn').addEventListener('click', () => {
    document.getElementById('find_input').value = '';
    document.querySelector('.result_find').innerHTML = '';
});

// Функция удаления заявки
async function deleteRequest(requestId, requestDiv) {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;

    try {
        const response = await fetch(`http://localhost:3000/deletePost/${requestId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Заявка успешно удалена');
            requestDiv.remove();
        } else {
            alert('Ошибка при удалении заявки');
        }
    } catch (error) {
        console.error('Ошибка при удалении заявки:', error);
        alert('Ошибка при удалении заявки');
    }
}

// Функция открытия модального окна для редактирования
function openEditModal(request) {
    document.getElementById('surname').value = request.Surname || '';
    document.getElementById('opisanie').value = request.Opisanie || '';
    document.getElementById('comment').value = request.comments || '';
    document.getElementById('cost').value = request.Cost || '';

    document.getElementById('save-edit-btn').dataset.id = request.id; // Сохраняем ID заявки в кнопку
    document.getElementById('edit-modal').style.display = 'flex';
}

// Обработчик сохранения изменений
document.getElementById('save-edit-btn').addEventListener('click', async () => {
    const requestId = document.getElementById('save-edit-btn').dataset.id;
    if (!requestId) {
        return;
    }
    const Surname = document.getElementById('surname').value.trim();
    const Opisanie = document.getElementById('opisanie').value.trim();
    const Cost = document.getElementById('cost').value.trim();
    const Comment = document.getElementById('comment').value.trim();

    try {
        const response = await fetch(`http://localhost:3000/requests123/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Surname, Opisanie, Cost, Comment }),
        });

        if (response.ok) {
            alert('Заявка успешно обновлена');
            document.getElementById('edit-modal').style.display = 'none';
            document.getElementById('find_btn').click(); // Обновляем список заявок
        } else {
            
        }
    } catch (error) {

    }
});



document.addEventListener("DOMContentLoaded", function () {
    const startDateInput = document.getElementById("start_date_input");
    const endDateInput = document.getElementById("end_date_input");
    const findBtn = document.getElementById("date_range_find_btn");
    const clearBtn = document.getElementById("date_range_clear_btn");
    const resultContainer = document.querySelector(".result_find2");

    // Обновленные элементы модального окна
    const modal = document.getElementById("details_modal_find");
    const modalContent = document.getElementById("modal_content_find");
    const modalClose = document.getElementById("modal_close");

    console.log("Скрипт поиска по диапазону дат загружен");

    findBtn.addEventListener("click", async () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        console.log(`Нажата кнопка "Найти". Выбран диапазон: с ${startDate} по ${endDate}`);

        if (!startDate || !endDate) {
            console.warn("Попытка поиска без выбора диапазона дат");
            alert("Выберите начальную и конечную дату для поиска!");
            return;
        }

        // Форматируем даты в нужный формат (например, YYYY.MM.DD)
        const formattedStartDate = startDate.split('-').reverse().join('.');
        const formattedEndDate = endDate.split('-').reverse().join('.');

        console.log(`Форматированные даты: с ${formattedStartDate} по ${formattedEndDate}`);

        try {
            console.log(`Отправка запроса на сервер: /findByDateRange/${formattedStartDate}/${formattedEndDate}`);
            const response = await fetch(`http://localhost:3000/findByDateRange/${formattedStartDate}/${formattedEndDate}`);

            if (!response.ok) {
                console.warn(`Ответ сервера: ${response.status} - ${response.statusText}`);
                resultContainer.innerHTML = "Заявки в этом диапазоне не найдены";
                return;
            }

            const data = await response.json();
            console.log("Получены данные:", data);

            resultContainer.innerHTML = data
                .map(
                    (request) =>
                        `<div class="request-item">
                            <p><strong>ID:</strong> ${request.id}</p>
                            <p><strong>Фамилия</strong> ${request.Surname}</p>
                            <p><strong>Статус:</strong> ${request.status}</p>
                            <p><strong>Открыта:</strong> ${request.TimeOpen}</p>
                            <p><strong>Закрыта:</strong> ${request.TimeClose}</p>
                            <p><strong>Сотрудник:</strong> ${request.employeer}</p>
                            <p><strong>Сумма к оплате:</strong> ${request.Cost || 'Не назначенно'}</p>
                            <button class="details-btn" data-id="${request.id}">Подробнее</button>
                            <button id="delete_request_btn" class="delete-btn">Удалить</button>
                        </div>`
                )
                .join("");

            document.querySelectorAll(".details-btn").forEach((button) => {
                button.addEventListener("click", async (event) => {
                    const requestId = event.target.getAttribute("data-id");
                    console.log(`Запрос данных для заявки ID: ${requestId}`);

                    try {
                        const response = await fetch(`http://localhost:3000/getRequestDetails/${requestId}`);
                        if (!response.ok) {
                            console.warn(`Ошибка при получении данных: ${response.status} - ${response.statusText}`);
                            return;
                        }

                        const data = await response.json();
                        console.log("Детальная информация:", data);

                        modalContent.innerHTML = `
                            <p><strong>ID:</strong> ${data.id}</p>
                            <p><strong>Фамилия:</strong> ${data.Surname}</p>
                            <p><strong>Описание заявки:</strong> ${data.Opisanie || 'Не указано'}</p>
                            <p><strong>Сотрудник:</strong> ${data.employeer || 'Не указан'}</p>
                            <p><strong>Статус:</strong> ${data.status || 'Не указан'}</p>
                            <p><strong>Номер телефона клиента:</strong> ${data.telephone || 'Нет описания'}</p>
                            <p><strong>Дата создания заявки:</strong> ${data.TimeOpen || 'Не указан'}</p>
                            <p><strong>Дата начала процесса ремонта:</strong> ${data.Process_date || 'Не указано'}</strong></p>
                            <p><strong>Дата талона клиента:</strong> ${data.Person_come || 'Не указано'}</strong></p>
                            <p><strong>Дата закрытия заявки:</strong> ${data.TimeClose || 'Не указан'}</p>
                            <p><strong>Комментарий:</strong> ${data.Comment || 'Не указан'}</p>
                            <p><strong>Сумма к оплате:</strong> ${data.Cost || 'Не назначенно'}</p>
                        `;
                        

                        modal.style.display = "flex";
                    } catch (error) {
                        console.error("Ошибка при получении деталей заявки: ", error);
                    }
                });
            });
        } catch (error) {
            console.error("Ошибка при поиске заявок по диапазону дат: ", error);
            resultContainer.innerHTML = "Ошибка сервера";
        }
    });

    clearBtn.addEventListener("click", () => {
        console.log("Нажата кнопка 'Очистить'");
        startDateInput.value = "";
        endDateInput.value = "";
        resultContainer.innerHTML = "";
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Другие элементы
    const resultContainer = document.querySelector(".result_find2");

    resultContainer.addEventListener("click", async function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const requestId = event.target.closest(".request-item").querySelector(".details-btn").getAttribute("data-id");

            if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;

            event.target.disabled = true; // Блокируем кнопку

            try {
                const response = await fetch(`http://localhost:3000/deleteRequest/${requestId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    console.warn(`Ошибка при удалении: ${response.status} - ${response.statusText}`);
                    alert("Ошибка при удалении заявки!");
                    return;
                }

                alert("Заявка успешно удалена!");
                event.target.closest(".request-item").remove(); // Удаляем элемент из списка
            } catch (error) {
                console.error("Ошибка при удалении заявки: ", error);
                alert("Ошибка сервера при удалении заявки!");
            } finally {
                event.target.disabled = false; // Разблокируем кнопку
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const startDateInput = document.getElementById("start_date_input_employee");
    const endDateInput = document.getElementById("end_date_input_employee");
    const lastNameInput = document.getElementById("secondname_employee");
    const findBtn = document.getElementById("search_employee");
    const clearBtn = document.getElementById("unsearch_employee");
    const resultContainer = document.querySelector(".result_find_employee");
    const modal = document.getElementById("details_modal_find");
    const modalContent = document.getElementById("modal_content_find");
    const modalClose = document.getElementById("modal_close");

    console.log("Скрипт поиска заявок сотрудника загружен");

    findBtn.addEventListener("click", async () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const lastName = lastNameInput.value.trim();

        if (!startDate || !endDate || !lastName) {
            alert("Введите фамилию сотрудника и выберите даты!");
            return;
        }

        const formattedStartDate = startDate.split('-').reverse().join('.');
        const formattedEndDate = endDate.split('-').reverse().join('.');

        try {
            const response = await fetch(`http://localhost:3000/findByDateRangeAndEmployee/${lastName}/${formattedStartDate}/${formattedEndDate}`);

            if (!response.ok) {
                resultContainer.innerHTML = "Заявки не найдены";
                return;
            }

            const data = await response.json();

            resultContainer.innerHTML = data.map((request) =>
                `<div class="request-item">
                    <p><strong>ID:</strong> ${request.id}</p>
                    <p><strong>Фамилия клиента:</strong> ${request.Surname}</p>
                    <p><strong>Статус:</strong> ${request.status}</p>
                    <p><strong>Дата талона клиента:</strong> ${request.Person_come}</p>
                    <p><strong>Открыта:</strong> ${request.TimeOpen}</p>
                    <p><strong>Дата перевода заявки в работу:</strong> ${request.TimeClose || 'Не указанно'}</p>
                    <button class="details-btn" data-id="${request.id}">Подробнее</button>
                    <button class="delete-btn" data-id="${request.id}">Удалить</button>
                </div>`
            ).join("");

            document.querySelectorAll(".details-btn").forEach(button => {
                button.addEventListener("click", async (event) => {
                    const requestId = event.target.getAttribute("data-id");
                    try {
                        const response = await fetch(`http://localhost:3000/getRequestDetails/${requestId}`);
                        if (!response.ok) return;

                        const data = await response.json();
                        modalContent.innerHTML = `
                        
                            <p><strong>ID:</strong> ${data.id}</p>
                            <p><strong>Фамилия:</strong> ${data.Surname}</p>
                            <p><strong>Описание:</strong> ${data.Opisanie || 'Не указано'}</p>
                            <p><strong>Сотрудник:</strong> ${data.employeer || 'Не указан'}</p>
                            <p><strong>Статус:</strong> ${data.status || 'Не указан'}</p>
                            <p><strong>Номер телефона клиента:</strong> ${data.telephone || 'Нет описания'}</p>
                            <p><strong>Дата открытия:</strong> ${data.TimeOpen || 'Не указано'}</p>
                            <p><strong>Дата перевода заявки в работу:</strong> ${data.TimeClose || 'Не указано'}</p>
                            <p><strong>Комментарий:</strong> ${data.comments || 'Не указан'}</p>
                            <p><strong>Сумма к оплате:</strong> ${data.Cost || 'Не назначено'}</p>
                        `;
                        modal.style.display = "flex";
                    } catch (error) {
                        console.error("Ошибка при получении деталей заявки: ", error);
                    }
                });
            });
        } catch (error) {
            resultContainer.innerHTML = "Ошибка сервера";
        }
    });

    clearBtn.addEventListener("click", () => {
        startDateInput.value = "";
        endDateInput.value = "";
        lastNameInput.value = "";
        resultContainer.innerHTML = "";
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    resultContainer.addEventListener("click", async function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const requestId = event.target.getAttribute("data-id");
            if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;

            event.target.disabled = true;
            try {
                const response = await fetch(`http://localhost:3000/deleteRequest/${requestId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    alert("Ошибка при удалении заявки!");
                    return;
                }

                alert("Заявка успешно удалена!");
                event.target.closest(".request-item").remove();
            } catch (error) {
                alert("Ошибка сервера при удалении заявки!");
            } finally {
                event.target.disabled = false;
            }
        }
    });
});
