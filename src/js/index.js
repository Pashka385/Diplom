
document.addEventListener('DOMContentLoaded', async () => {
    const requestContainer = document.getElementById('request-container');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    let currentRequestId;
    
    // Fetch requests from the server
    try {
        
        const response = await fetch('http://localhost:3000/requests');
        if (!response.ok) throw new Error('Ошибка загрузки данных');

        const requests = await response.json();

        requests.forEach(request => {
            const card = document.createElement('div');
            card.className = 'request-card';
            card.draggable = true;
            card.dataset.id = request.id;
            
            card.innerHTML = `
                <h3>Заявка №${request.id}</h3>
                <p><strong>Фамилия Имя:</strong> ${request.Surname || 'Нет описания'}</p>
                <p><strong>Статус:</strong> <span class="status">${request.status}</span></p>
                <p><strong>Комментарии:</strong> ${request.comments || 'Нет комментариев'}</p>
                <p><strong>Сотрудник:</strong> ${request.employeer || 'Не назначен'}</p>
                <p><strong>Дата открытия:</strong> ${request.TimeOpen || 'Не назначен'}</p>
                <p><strong>Дата закрытия:</strong> ${request.TimeClose || 'Не назначен'}</p>
                <p><strong>Дата перевода в статус в процессе:</strong> ${request.Process_date || 'Не назначен'}</p>
                <p><strong>Дата талона клиента:</strong> <span style='color:red;font-weight:bold;'>${request.Person_come || 'Не назначен'}</span></p>
                <p><strong>Описание:</strong> ${request.Opisanie || 'Нет описания'}</p>
                <p><strong>Стоимость:</strong> ${request.Cost || 'Нет описания'}</p>
                <p><strong>Номер телефона клиента:</strong> ${request.telephone || 'Нет описания'}</p>
                <button class="delete-btn" data-id="${request.id}">Удалить</button>
                <button class="edit-btn" data-id="${request.id}">Редактировать</button>
                <button class="send-notification-btn" data-telephone="${request.telephone}">Отправить уведомление</button>
            `;

            const section = document.querySelector(`[data-status="${request.status}"]`) || document.getElementById('openreq');
            section.appendChild(card);
            const sendNotificationButton = card.querySelector('.send-notification-btn');
            sendNotificationButton.addEventListener('click', () => {
                const telephone = request.telephone;
                const message = 'Добрый день!Напоминаем вам о вашей записис на прием завтра.Ждем вас с нетерпением:)';
                if (telephone) {
                    window.open(`https://wa.me/${telephone}?text=${encodeURIComponent(message)}`, '_blank');
                } else {
                    alert('Номер телефона отсутствует');
                }
            });
            
            const editButton = card.querySelector('.edit-btn');
        editButton.addEventListener('click', () => {
            currentRequestId = request.id;
            // Set the modal fields to the selected request's data
            document.getElementById('surname').value = request.Surname || '';  // Set surname
            document.getElementById('opisanie').value = request.Opisanie || ''; // Set description
            document.getElementById('comment').value = request.comments || '';  // Set comments
            document.getElementById('cost').value = request.Cost || '';          // Set cost
            editModal.style.display = 'flex'; // Show the modal
            openEditModal(request)
        })
            // Add delete button functionality
            const deleteButton = card.querySelector('.delete-btn');
            deleteButton.addEventListener('click', async (e) => {
                const requestId = e.target.getAttribute('data-id');
                try {
                    const response = await fetch(`http://localhost:3000/deletePost/${requestId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        alert('Заявка успешно удалена');
                        e.target.closest('.request-card').remove();
                    } else {
                        alert('Ошибка при удалении заявки');
                    }
                } catch (error) {
                    console.error('Ошибка при удалении заявки:', error);
                    alert('Ошибка при удалении заявки');
                }
            });

            // Add drag event listeners
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
        });
        
        // Add drag and drop functionality to sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.addEventListener('dragover', handleDragOver);
            section.addEventListener('dragenter', handleDragEnter);
            section.addEventListener('dragleave', handleDragLeave);
            section.addEventListener('drop', handleDrop);
        });

    } catch (error) {
        console.error('Ошибка отображения данных:', error);
        requestContainer.innerHTML = '<p>Ошибка загрузки заявок. Попробуйте позже.</p>';
    }

    // Modal Form Submit (Edit Request)
    editForm.addEventListener('submit', async (e) => {
e.preventDefault();
const updatedData = {
Surname: document.getElementById('surname').value,
Opisanie: document.getElementById('opisanie').value,
Comment: document.getElementById('comment').value,
Cost: parseFloat(document.getElementById('cost').value) || 0,  // Convert to number, default to 0 if invalid
};


try {
    const response = await fetch(`http://localhost:3000/requests123/${currentRequestId}`, { // Updated endpoint
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    if (response.ok) {
        alert('Заявка успешно обновлена');
        location.reload();
    } else {
        // alert('Ошибка при обновлении заявки');
    }
} catch (error) {
    console.error('Ошибка при обновлении заявки:', error);
    // alert('Ошибка при обновлении заявки');
}
});



    // Close modal button
    document.getElementById('close-modal').addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Close modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});

// Drag and Drop Handlers
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    event.target.style.opacity = '0.5';
}

function handleDragEnd(event) {
    event.target.style.opacity = '1';
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDragEnter(event) {
    event.preventDefault();
    event.target.classList.add('dragover');
}

function handleDragLeave(event) {
    event.target.classList.remove('dragover');
}

async function handleDrop(event) {
    event.preventDefault();
    event.target.classList.remove('dragover');

    const requestId = event.dataTransfer.getData('text/plain');
    const card = document.querySelector(`.request-card[data-id="${requestId}"]`);

    if (!card) return;

    const newStatus = event.target.dataset.status;
    const statusElement = card.querySelector('.status');

    if (!newStatus) return;

    // Update status on the server
    try {
        const response = await fetch(`http://localhost:3000/requests/${requestId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        location.reload()
        if (response.ok) {
            statusElement.textContent = newStatus;
            event.target.appendChild(card);
        } else {
            alert('Ошибка изменения статуса');
        }
    } catch (error) {
        console.error('Ошибка изменения статуса:', error);
    }
}
document.getElementById("addRequestBtn").addEventListener("click", function () {
    document.getElementById("addRequestModal").style.display = "flex";
    loadEmployees();
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("addRequestModal").style.display = "none";
});

// Функция для загрузки сотрудников
async function loadEmployees() {
    const response = await fetch("http://localhost:3000/employeesCreate");
    const employees = await response.json();
    const select = document.getElementById("employeeSelect");
    select.innerHTML = "<option value=''>Выберите сотрудника</option>"; // Опция по умолчанию
    employees.forEach(emp => {
        let option = document.createElement("option");
        option.textContent = emp.family;  // Фамилия сотрудника
        select.appendChild(option);
    });
}
document.getElementById("addRequestForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Получаем текущую дату в формате YYYY-MM-DD
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const TimeOpen = `${year}-${month}-${day}`;

    // Получаем данные из формы
    const requestData = {
        Surname: document.querySelector(".surname").value || null,
        comments: document.getElementById("comments").value || null,
        personTele:document.querySelector(".personTele").value,
        employeer: document.getElementById("employeeSelect").value || null, // ID выбранного сотрудника
        person_come: document.querySelector(".personCome").value,
        Opisanie: document.querySelector(".opisanie").value || null,
        Cost: document.querySelector(".cost").value ? parseFloat(document.querySelector(".cost").value) : null,
        TimeOpen: TimeOpen // Передаём дату создания заявки
    };

    console.log("Данные перед отправкой:", requestData);

    if (!requestData.employeer) {
        return alert("Пожалуйста, выберите сотрудника");
    }

    try {
        const response = await fetch("http://localhost:3000/requestsnew", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            alert("Заявка добавлена!");
            document.getElementById("addRequestModal").style.display = "none";
            window.location.reload()
        } else {
            const errorData = await response.json();
            alert("Ошибка при добавлении заявки: " + errorData.error);
        }
    } catch (error) {
        alert("Ошибка при добавлении заявки: " + error.message);
    }
});
