async function loadRequestsEmployees() {
    try {
        // Загружаем сотрудников
        const employeesResponse = await fetch('http://localhost:3000/requestsEmployees');
        if (!employeesResponse.ok) throw new Error('Ошибка загрузки данных сотрудников');
        const employees = await employeesResponse.json();

        // Загружаем заявки
        const requestsResponse = await fetch('http://localhost:3000/requests');
        if (!requestsResponse.ok) throw new Error('Ошибка загрузки заявок');
        const requests = await requestsResponse.json();

        console.log("Все заявки:", requests);

        // Фильтруем активные заявки
        const activeStatuses = ["Открыто", "В процессе"];
        const activeRequests = requests.filter(req => activeStatuses.includes(req.status));

        console.log("Активные заявки:", activeRequests);

        // Очищаем контейнер
        const employeesContainer = document.querySelector('.employees');
        employeesContainer.innerHTML = '';

        employees.forEach(employee => {
            // Подсчитываем количество активных заявок по фамилии сотрудника
            const employeeRequests = activeRequests.filter(req => req.employeer === employee.family);
            const activeCount = employeeRequests.length;
            
            // Рассчитываем сумму всех заявок сотрудника
            const totalCost = employeeRequests.reduce((sum, req) => sum + (req.Cost || 0), 0);

            const finalAmount = totalCost * 0.7; // Вычитаем 30%
            updateEmployeeWorkCount(employee.id, activeCount);

            console.log(`Сотрудник ${employee.family} - Активные заявки: ${activeCount}, Сумма (минус 30%): ${finalAmount}`);

            // Создаем карточку сотрудника
            const card = document.createElement('div');
            card.className = 'request-card';
            card.draggable = true;
            card.dataset.id = employee.id;
            card.innerHTML = `
                <div>
                    <h3>Сотрудник: ${employee.family}</h3>
                    <p>Активные заявки: ${activeCount}</p>
                    <p>Сумма заявок: ${finalAmount.toFixed(2)} руб.</p>
                    <button class='delete-employee' data-id="${employee.id}">Удалить сотрудника</button>
                    <button class='download-report' data-id="${employee.id}" data-family="${employee.family}" data-active-count="${activeCount}" data-final-amount="${finalAmount.toFixed(2)}">Скачать отчет</button>
                    
                </div>
            `;

            employeesContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error.message);
    }
}

loadRequestsEmployees();

// Функция для скачивания отчета в формате Word
function downloadReport(id, family, activeCount, finalAmount) {
    const docContent = `
    ОТЧЕТ О ДЕЯТЕЛЬНОСТИ СОТРУДНИКА

    Дата формирования отчета: ${new Date().toLocaleDateString()}
    -----------------------------------------

    Фамилия сотрудника: ${family}
    Общее количество активных заявок: ${activeCount}
    Итоговая сумма всех заявок (минус 30%): ${finalAmount} руб.

    Введение:
    Данный отчет содержит информацию о текущей загруженности сотрудника, количестве активных заявок и его роли в процессе выполнения работ.

    Основная информация:
    Сотрудник ${family} активно участвует в процессе обработки заявок. В данный момент у него ${activeCount} активных заявок, что отражает его занятость в системе. Сумма заявок с учетом удержания 30% составляет ${finalAmount} руб.

    Рабочий процесс:
    - Получение заявок от системы
    - Взаимодействие с клиентами и уточнение деталей
    - Выполнение поставленных задач в соответствии с регламентом
    - Передача выполненной заявки на финальную проверку

    Заключение:
    Текущий объем работы сотрудника указывает на его активную занятость. В дальнейшем рекомендуется проводить мониторинг нагрузки для оптимального распределения заявок.

    -----------------------------------------
    Подпись руководителя: _______________
    `;
    
    const blob = new Blob([docContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_${family}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Обработчик событий для скачивания отчета
document.querySelector('.employees').addEventListener('click', (event) => {
    if (event.target.classList.contains('download-report')) {
        const employeeId = event.target.dataset.id;
        const family = event.target.dataset.family;
        const activeCount = event.target.dataset.activeCount;
        const finalAmount = event.target.dataset.finalAmount;
        downloadReport(employeeId, family, activeCount, finalAmount);
    }
});
async function deleteEmployee(id) {
    if (!confirm('Вы уверены, что хотите удалить этого сотрудника?')) return;

    try {
        const response = await fetch(`http://localhost:3000/deleteEmployee/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Ошибка при удалении сотрудника');

        alert('Сотрудник удалён!');
        loadRequestsEmployees();
    } catch (error) {
        console.error(error.message);
        alert('Не удалось удалить сотрудника');
    }
}

document.querySelector('.employees').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-employee')) {
        const employeeId = event.target.dataset.id;
        await deleteEmployee(employeeId);
    }

    if (event.target.classList.contains('download-report')) {
        const employeeId = event.target.dataset.id;
        const family = event.target.dataset.family;
        const activeCount = event.target.dataset.activeCount;
        const finalAmount = event.target.dataset.finalAmount;
        downloadReport(employeeId, family, activeCount, finalAmount);
    }
});

document.querySelector('.add_emloyee').addEventListener('click', async () => {
    const family = prompt('Введите фамилию сотрудника:');
    const countWork = prompt('Введите количество выполненных задач:');

    if (!family || isNaN(countWork)) {
        alert('Некорректные данные!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/addEmployee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ family, count_work: Number(countWork) })
        });

        if (!response.ok) throw new Error('Ошибка при добавлении сотрудника');

        alert('Сотрудник добавлен!');
        loadRequestsEmployees();
    } catch (error) {
        console.error(error.message);
        alert('Не удалось добавить сотрудника');
    }
});
async function updateEmployeeWorkCount(id, countWork) {
    try {
        const response = await fetch(`http://localhost:3000/updateEmployee/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count_work: countWork })
        });

        if (!response.ok) throw new Error('Ошибка при обновлении количества выполненных задач');

        console.log(`Количество выполненных задач для сотрудника с ID ${id} обновлено на ${countWork}`);
    } catch (error) {
        console.error(error.message);
    }
}