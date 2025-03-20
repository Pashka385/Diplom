const addPromoCodeBtn = document.getElementById('addPromoCodeBtn');
const activatePromoCodeBtn = document.getElementById('activatePromoCodeBtn');
const searchPromoCodeBtn = document.getElementById('searchPromoCodeBtn');
const searchResults = document.getElementById('searchResults');

// Обработчик для добавления нового промокода
addPromoCodeBtn.addEventListener('click', async () => {
    const promoCode = document.getElementById('newPromoCode').value;
    const family = document.getElementById('newFamily').value;

    if (!promoCode || !family) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/promo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promo_code: promoCode, family: family }),
        });
        if (response.ok) {
            alert('Промокод успешно добавлен');
            document.getElementById('newPromoCode').value = '';
            document.getElementById('newFamily').value = '';
        } else {
            const result = await response.json();
            alert('Ошибка при добавлении промокода: ' + (result.message || 'Неизвестная ошибка.'));
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        alert('Произошла ошибка при выполнении запроса.');
    }
});

// Обработчик для активации промокода
activatePromoCodeBtn.addEventListener('click', async () => {
    const promoCode = document.getElementById('activatePromoCode').value;

    if (!promoCode) {
        alert('Пожалуйста, введите промокод.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/promo/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promo_code: promoCode }),
        });

        if (response.ok) {
                alert('Промокод на бесплатную консультанцию врача активирован!');
                document.getElementById('activatePromoCode').value = '';
        } else if (response.status === 404) {
            const result = await response.json();
            alert('Ошибка при активации промокода: ' + (result.message || 'Неизвестная ошибка.'));
        } else {
            alert('Ошибка при активации промокода:');
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        alert('Произошла ошибка при выполнении запроса.');
    }
});

// Обработчик для поиска промокодов по фамилии
searchPromoCodeBtn.addEventListener('click', async () => {
    const family = document.getElementById('searchFamily').value;

    if (!family) {
        alert('Пожалуйста, введите фамилию для поиска.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/promo/search?family=${encodeURIComponent(family)}`);
        
        if (response.ok) {
            const results = await response.json();
            // Отображаем результаты поиска
            searchResults.innerHTML = results.length > 0 
                ? results.map(promo => `<div>Промокод: ${promo.promo_code}, Семья: ${promo.family}</div>`).join('')
                : 'Промокоды не найдены.';
        } else {
            searchResults.innerHTML = 'Ошибка при поиске промокодов.';
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        searchResults.innerHTML = 'Произошла ошибка при выполнении запроса.';
    }
});