const CompanyRequest = document.querySelector('.ComponyRequest');
CompanyRequest.addEventListener('click', () => {
    loadRequestsEmployees123();
});

async function loadRequestsEmployees123() {
    try {
        // Загружаем заявки
        const requestsResponse = await fetch('http://localhost:3000/requests');
        if (!requestsResponse.ok) throw new Error('Ошибка загрузки заявок');
        const requests = await requestsResponse.json();

        // Фильтруем выполненные заявки
        const closeStatus = ["Закрыто"];
        const closeRequests = requests.filter(req => closeStatus.includes(req.status));

        let totalAmount = 0;
        closeRequests.forEach(element => {
            totalAmount += element.Cost;
        });
        let LastPrice = totalAmount * 0.3
        let closeCount = closeRequests.length;
        console.log("Количество выполненных заявок:", closeCount);
        console.log("Общая сумма по выполненным заявкам:", totalAmount);

        // Формирование отчета
        const reportContent = `
        ОТЧЕТ О ВЫПОЛНЕННЫХ ЗАЯВКАХ
    
        Дата формирования отчета: ${new Date().toLocaleDateString()}
        -----------------------------------------
    
        Общее количество выполненных заявок: ${closeCount}
        Итоговая сумма всех выполненных заявок: ${LastPrice} руб.
    
        Введение:
        Данный отчет содержит информацию о количестве и общей стоимости выполненных заявок компании за отчетный период.
    
        Основная информация:
        За отчетный период успешно выполнено ${closeCount} заявок. Общая стоимость прибыли компании а именно 30% от суммы оказанных услуг составляет ${LastPrice} руб.
    
        Детали процесса:
        - Прием и обработка заявок клиентами
        - Назначение сотрудников для выполнения работ
        - Оказание услуг согласно регламенту
        - Завершение и подтверждение выполнения заявок
    
        Заключение:
        Данные показатели отражают текущую эффективность работы компании. В дальнейшем рекомендуется анализировать динамику заявок для улучшения сервиса и оптимизации рабочих процессов.
    
        -----------------------------------------
        Подпись руководителя: _______________
        `;
        
        // Генерация и скачивание отчета в формате .doc
        const blob = new Blob([reportContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Отчет_по_выполненным_заявкам_${new Date().toLocaleDateString()}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.log('Ошибка:', error.message);
    }
}
