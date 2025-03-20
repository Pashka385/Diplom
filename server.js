const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

// Настройка CORS
app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

// Конфигурация подключения к базе данных
const dbConfig = {
    host: "localhost",
    user: "root",
    database: "Pavel344",
    password: "12345AZD",
    port: 3006
};

// Функция для получения текущей даты в формате ГГГГ-ММ-ДД
const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Формат: YYYY-MM-DD
};

// Эндпоинт для получения всех заявок
app.get('/requests', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, Surname, status, comments, employeer, 
                   DATE_FORMAT(TimeOpen, '%d.%m.%Y') AS TimeOpen,
                   DATE_FORMAT(TimeClose, '%d.%m.%Y') AS TimeClose,
                   DATE_FORMAT(Process_date, '%d.%m.%Y') AS Process_date,
                   Person_come,
                   Opisanie, Cost,telephone
            FROM Services
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
app.get('/ServicesCatalog', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT *
            FROM ServicesCatalog 
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
app.delete('/ServicesCatalog/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`DELETE FROM ServicesCatalog WHERE id = ?`, [id]);
        await connection.end();
        res.sendStatus(204); // Успешное удаление без содержимого
    } catch (err) {
        console.error('Ошибка при удалении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
app.get('/clients', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, Surname,telephone
            FROM Services
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
// Получение промокодов по фамилии
app.get('/promo/search', async (req, res) => {
    const { family } = req.query; // Получаем фамилию из параметров запроса
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, promo_code, family
            FROM PromoCode
            WHERE family = ?
        `, [family]);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
app.get('/promo', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, promo_code,family
            FROM PromoCode
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});
// Добавление нового промокода
app.post('/promo', async (req, res) => {
    const { promo_code, family } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`
            INSERT INTO PromoCode (promo_code, family) VALUES (?, ?)
        `, [promo_code, family]);
        await connection.end();
        res.status(201).send('Промокод добавлен');
    } catch (err) {
        console.error('Ошибка при добавлении промокода:', err);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/ServicesCatalog', async (req, res) => {
    const { service_name, description,price,duration } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`
            INSERT INTO ServicesCatalog (service_name, description,price,duration) VALUES (?, ?, ?, ?)
        `, [service_name, description,price,duration]);
        await connection.end();
        res.status(201).send('Промокод добавлен');
    } catch (err) {
        console.error('Ошибка при добавлении промокода:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Активация промокода
app.post('/promo/activate', async (req, res) => {
    const { promo_code } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT * FROM PromoCode WHERE promo_code = ?
        `, [promo_code]);

        if (rows.length > 0) {
            // Промокод найден, удаляем его
            await connection.execute(`
                DELETE FROM PromoCode WHERE promo_code = ?
            `, [promo_code]);
            await connection.end();
            return res.status(200).json({ message: 'Промокод успешно активирован.' }); // Изменено с 204 на 200
        } else {
            await connection.end();
            return res.status(404).json({ message: 'Промокод не найден.' });
        }
    } catch (err) {
        console.error('Ошибка при активации промокода:', err);
        return res.status(500).json({ message: 'Ошибка сервера.' });
    }
});

// Эндпоинт для получения всех заявок
app.get('/requestsSclad', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, name,product_count,sclad_type,product_opisanie FROM Sclad`);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Эндпоинт для добавления новой заявки
app.post('/requestsSclad', async (req, res) => {
    const { name, product_count, sclad_type, product_opisanie } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const result = await connection.execute(`
            INSERT INTO Sclad (name, product_count, sclad_type, product_opisanie) 
            VALUES (?, ?, ?, ?)`, [name, product_count, sclad_type, product_opisanie]);
        await connection.end();
        res.status(201).json({ id: result[0].insertId, name, product_count, sclad_type, product_opisanie });
    } catch (err) {
        console.error('Ошибка при добавлении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Эндпоинт для редактирования заявки
app.put('/requestsSclad/:id', async (req, res) => {
    const { id } = req.params;
    const { name, product_count, sclad_type, product_opisanie } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`
            UPDATE Sclad 
            SET name = ?, product_count = ?, sclad_type = ?, product_opisanie = ? 
            WHERE id = ?`, [name, product_count, sclad_type, product_opisanie, id]);
        await connection.end();
        res.sendStatus(204); // Успешное обновление без содержимого
    } catch (err) {
        console.error('Ошибка при редактировании данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Эндпоинт для удаления заявки
app.delete('/requestsSclad/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`DELETE FROM Sclad WHERE id = ?`, [id]);
        await connection.end();
        res.sendStatus(204); // Успешное удаление без содержимого
    } catch (err) {
        console.error('Ошибка при удалении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Эндпоинт для получения всех заявок
app.post('/autorization', async (req, res) => {
    const { login, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `SELECT id FROM Authorization WHERE login = ? AND password = ?`, [login, password]
        );
        await connection.end();

        res.json({ success: rows.length > 0 });
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

app.get('/moderators', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`SELECT * FROM Authorization WHERE login != 'admin'`);
        await connection.end();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

app.post('/moderators', async (req, res) => {
    const { login, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`INSERT INTO Authorization (login, password) VALUES (?, ?)`, [login, password]);
        await connection.end();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

app.delete('/moderators/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`DELETE FROM Authorization WHERE id = ?`, [id]);
        await connection.end();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
});

app.get('/requestsEmployees', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT id, family ,count_work
            FROM employees
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

app.post('/addEmployee', async (req, res) => {
    const { family, count_work } = req.body;

    if (!family || typeof count_work !== 'number') {
        return res.status(400).send('Некорректные данные');
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(`
            INSERT INTO employees (family, count_work) VALUES (?, ?)
        `, [family, count_work]);
        await connection.end();

        res.status(201).send('Сотрудник успешно добавлен');
    } catch (err) {
        console.error('Ошибка при добавлении сотрудника:', err);
        res.status(500).send('Ошибка сервера');
    }
});


app.delete('/deleteEmployee/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(`
            DELETE FROM employees WHERE id = ?
        `, [id]);

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Сотрудник не найден');
        }

        res.status(200).send('Сотрудник успешно удалён');
    } catch (err) {
        console.error('Ошибка при удалении сотрудника:', err);
        res.status(500).send('Ошибка сервера');
    }
});

app.delete('/deletePost/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(`
            DELETE FROM Services WHERE id = ?
        `, [id]);

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Заявка не найдена');
        }

        res.status(200).send('Заявка успешно удалена');
    } catch (err) {
        console.error('Ошибка при удалении сотрудника:', err);
        res.status(500).send('Ошибка сервера');
    }
});


// Эндпоинт для создания новой заявки (автоматически добавляет дату открытия)
app.post('/requests', async (req, res) => {
    const { Surname, family_email, comments, employee_id, Opisanie, Cost } = req.body;
    const TimeOpen = getFormattedDate(); // Дата открытия заявки

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            `INSERT INTO Services (Surname, family_email, status, comments, employee_id, TimeOpen, TimeClose, Process_date, Person_come, Opisanie, Cost) 
             VALUES (?, ?, 'Открыто', ?, ?, ?, NULL, NULL, NULL, ?, ?)`,
            [Surname, family_email, comments, employee_id, TimeOpen, Opisanie, Cost]
        );
        await connection.end();
        res.status(201).json({ id: result.insertId, message: 'Заявка успешно создана' });
    } catch (err) {
        console.error('Ошибка при создании заявки:', err);
        res.status(500).send('Ошибка сервера');
    }
});


app.patch('/requests123/:id', async (req, res) => {
    const { id } = req.params;
    const { Surname, Opisanie, Cost, Comment } = req.body;

    // Ensure Cost is a valid number
    const cost = parseFloat(Cost);
    if (isNaN(cost)) {
        return res.status(400).send('Стоимость должна быть числом');
    }

    const query = `
        UPDATE Services 
        SET Surname = ?, Opisanie = ?, comments = ?, Cost = ?
        WHERE id = ?
    `;
    const values = [Surname, Opisanie, Comment, cost, id];

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(query, values);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Заявка с таким ID не найдена');
        }

        res.send('Заявка успешно отредактирована');
    } catch (err) {
        console.error('Ошибка при редактировании заявки:', err);
        res.status(500).send('Ошибка сервера');
    }
});

// Эндпоинт для обновления статуса заявки
app.patch('/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const currentDate = getFormattedDate(); // Текущая дата в формате YYYY-MM-DD

    let query, values;

    switch (status) {
        case "Закрыто":
            query = "UPDATE Services SET status = ?, TimeClose = ?, Process_date = NULL WHERE id = ?";
            values = [status, currentDate, id];
            break;
        case "В процессе":
            query = "UPDATE Services SET status = ?, Process_date = ? WHERE id = ?";
            values = [status, currentDate, id];
            break;
        case "Открыто":
            query = "UPDATE Services SET status = ?, TimeClose = NULL, Process_date = NULL WHERE id = ?";
            values = [status, id];
            break;
        default:
            return res.status(400).send('Некорректный статус');
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(query, values);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).send('Заявка с таким ID не найдена');
        }

        res.send('Статус заявки успешно обновлен');
    } catch (err) {
        console.error('Ошибка при обновлении статуса заявки:', err);
        res.status(500).send('Ошибка сервера');
    }
});




app.post("/requestsnew", async (req, res) => {
    let { Surname, comments, employeer, person_come, Opisanie, Cost, TimeOpen,personTele } = req.body;

    console.log("Данные получены от клиента:", req.body);

    // Если TimeOpen не передан, создаём его на сервере
    if (!TimeOpen) {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();
        TimeOpen = `${year}-${month}-${day}`;
        console.log("TimeOpen было пустым, установлено:", TimeOpen);
    }

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            "INSERT INTO Services (Surname, comments, employeer, Person_come, Opisanie, Cost, TimeOpen, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [Surname, comments, employeer, person_come, Opisanie, Cost, TimeOpen,personTele]
        );

        res.status(201).json({ message: "Заявка добавлена", id: result.insertId });
    } catch (error) {
        console.error("Ошибка при добавлении заявки:", error);
        res.status(500).json({ error: "Ошибка при добавлении заявки" });
    } finally {
        if (connection) await connection.end();
    }
});



app.get("/employeesCreate", async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        // Получаем и ID, и фамилию сотрудника
        const [rows] = await connection.execute(`
            SELECT id, family FROM Employees
        `);
        await connection.end();
        res.json(rows);  // Возвращаем массив сотрудников с id и фамилией
    } catch (err) {
        console.error('Ошибка при получении данных:', err);
        res.status(500).send('Ошибка сервера');
    }
});

app.get('/findByLastName/:lastName', async (req, res) => {
    const { lastName } = req.params;
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM Services WHERE Surname = ?", [lastName]);

        if (rows.length === 0) {
            return res.status(404).send('Заявки с такой фамилией не найдены');
        }

        res.json(rows); // Отправка найденных заявок
    } catch (err) {
        console.error('Ошибка при поиске заявки по фамилии: ', err);
        res.status(500).send('Ошибка сервера');
    } finally {
        if (connection) await connection.end();
    }
});

app.get('/findByDateRange/:startDate/:endDate', async (req, res) => {
    const { startDate, endDate } = req.params;

    // Преобразуем формат даты из DD.MM.YYYY в YYYY-MM-DD
    const formattedStartDate = startDate.split('.').reverse().join('-');
    const formattedEndDate = endDate.split('.').reverse().join('-');

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            "SELECT * FROM Services WHERE (STR_TO_DATE(TimeOpen, '%Y-%m-%d') BETWEEN ? AND ?) OR (STR_TO_DATE(TimeClose, '%Y-%m-%d') BETWEEN ? AND ?)",
            [formattedStartDate, formattedEndDate, formattedStartDate, formattedEndDate]
        );
        if (rows.length === 0) {
            return res.status(404).send('Заявки в этом диапазоне не найдены');
        }
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при поиске заявок по диапазону дат: ', err);
        res.status(500).send('Ошибка сервера');
    } finally {
        if (connection) await connection.end();
    }
});

app.get('/findByDateRangeAndEmployee/:lastName/:startDate/:endDate', async (req, res) => {
    const { lastName, startDate, endDate } = req.params;

    // Преобразуем формат даты из DD.MM.YYYY в YYYY-MM-DD
    const formattedStartDate = startDate.split('.').reverse().join('-');
    const formattedEndDate = endDate.split('.').reverse().join('-');

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `SELECT * FROM Services 
             WHERE employeer = ? 
             AND ((STR_TO_DATE(TimeOpen, '%Y-%m-%d') BETWEEN ? AND ?) 
             OR (STR_TO_DATE(TimeClose, '%Y-%m-%d') BETWEEN ? AND ?))
             AND status  = 'Открыто' OR 'В процессе'
             `,
             
            [lastName, formattedStartDate, formattedEndDate, formattedStartDate, formattedEndDate]
        );
        if (rows.length === 0) {
            return res.status(404).send('Заявки сотрудника в этом диапазоне не найдены');
        }
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при поиске заявок сотрудника по диапазону дат: ', err);
        res.status(500).send('Ошибка сервера');
    } finally {
        if (connection) await connection.end();
    }
});



app.get('/getRequestDetails/:id', async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            "SELECT * FROM Services WHERE ID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).send('Заявка не найдена');
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('Ошибка при получении деталей заявки:', err);
        res.status(500).send('Ошибка сервера');
    } finally {
        if (connection) await connection.end();
    }
});

app.delete('/deleteRequest/:id', async (req, res) => {
    const { id } = req.params;
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute("DELETE FROM Services WHERE ID = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send("Заявка не найдена");
        }

        res.send("Заявка успешно удалена");
    } catch (err) {
        console.error("Ошибка при удалении заявки:", err);
        res.status(500).send("Ошибка сервера");
    } finally {
        if (connection) await connection.end();
    }
});

app.get("/getServicesByDate", async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: "Дата не указана" });
    }

    const query = "SELECT * FROM Services WHERE Person_come = ?";
    
    try {
        const [rows] = await db.execute(query, [date]);
        res.json(rows);
    } catch (error) {
        console.error("Ошибка запроса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});
app.put('/updateEmployee/:id', async (req, res) => {
    const { id } = req.params;
    const { count_work } = req.body;

    // Проверяем, указано ли количество выполненных задач
    if (count_work === undefined) {
        return res.status(400).json({ error: "Количество выполненных задач не указано" });
    }

    const query = 'UPDATE Employees SET count_work = ? WHERE id = ?';

    try {
        // Создаем новое соединение с базой данных
        const connection = await mysql.createConnection(dbConfig);
        
        // Выполняем SQL-запрос
        const [results] = await connection.execute(query, [count_work, id]);
        
        // Закрываем соединение
        await connection.end();

        // Проверяем, было ли обновлено хотя бы одно значение
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Сотрудник не найден' });
        }

        res.json({ message: 'Количество выполненных задач обновлено' });
    } catch (error) {
        console.error('Ошибка при обновлении:', error); // Логируем ошибку
        res.status(500).json({ error: 'Ошибка при обновлении' });
    }
});

app.get('/change-log', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT * FROM ChangeLog ORDER BY changed_at DESC
        `);
        await connection.end();
        res.json(rows);
    } catch (err) {
        console.error('Ошибка при получении истории изменений:', err);
        res.status(500).send('Ошибка сервера');
    }
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен по адресу: http://localhost:${port}`);
});
