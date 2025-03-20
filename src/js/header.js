const header = document.getElementById('header');
header.innerHTML += `
<div class='header__container'>
    <ul>
        <li><a href="./sclad.html">Склад</a></li>
        <li><a href="./naklad.html">Накладная</a></li>
        <li><a href="./uslug.html">Услуги</a></li>
    </ul>
    <a href="./main.html"><img src="./img/logo.png" alt="logo"></a>
    <ul>
        <li><a href="./index.html">Выход</a></li>
        <li><a href="./clients.html">Клиенты</a></li>
        <li><a href="./history.html">Изменения</a></li>
    </ul>
</div>
`
console.log(header)