function generateFooter()
{
    let footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class=page-block>
        <div class=page-lists>
            <div class=page-list>
                <a class="page font-gray" href="car-select.html">
                    Аренда
                </a>
                <a class="page font-gray" href="cards.html">
                    Банковские карты
                </a>
                <a class="page font-gray" href="history.html">
                    История бронирования
                </a>
            </div>
            <div class=page-list>
                <a class="page font-gray" href="branches.html">
                    Филиалы
                </a>
                <a class="page font-gray" href=about.html>
                    О Нас
                </a>
                <a class="page font-gray" href=profile.html>
                    Личный кабинет
                </a>
            </div>
        </div>
            
        </div>
        <div class="phone-number font-gray" align=center>
            Телефон: 8 (800) 555-35-3
        </div>
    `;
}

function generateHeader()
{
    let header = document.getElementById('no-log-header');
    if (header === null)
    {
        header = document.getElementById('logged-header');
    }
    header.innerHTML = `
        <div class="logo-element font-r fam-kaus" onclick="window.location.href='index.html';">
        </div>
        <div class="element font-l br-d3" onclick="window.location.href='car-select.html';">
            Аренда
        </div>
        <div class="element font-l br-d3" onclick="window.location.href='cards.html';">
            Оплата
        </div>
        <div class="element font-l br-d3" onclick="window.location.href='branches.html';">
            Филиалы
        </div>
        <div id=nav-menu>

        </div>
        <div id=vm class=no-display>
            <div id=vm-grid>
                <div class=elem onclick="window.location.href='login.html'">
                    Вход
                </div>
                <div class=elem onclick="window.location.href='register.html'">
                    Регистрация
                </div>
                <div class=elem onclick="window.location.href='car-select.html'">
                    Аренда
                </div>
                <div class=elem onclick="window.location.href='cards.html'">
                    Оплата 
                </div>
                <div class=elem onclick="window.location.href='branches.html'">
                    Филиалы 
                </div>
            </div>
        </div>
    `
}