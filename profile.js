function onPageEnter()
{
    let hs = JSON.parse(sessionStorage.getItem('header-states'));
    if (!hs["was_logged"])
    {
        window.location.href = 'login.html';
    }
    let sel_cars = sessionStorage.getItem('selected-cars');
    let tabs = document.getElementsByClassName('prof-tab');
    for (let tab of tabs) 
    {
        tab.addEventListener('click', () => {
            for (let tab of tabs)
            {
                tab.style.backgroundColor = '';
            }
            tab.style.backgroundColor = '#282732';
            if (tab.id === 'my-selected-cars')
            {
                clearProfileContent();
                loadRenting();
            }
            else if (tab.id === 'my-rent-history')
            {
                clearProfileContent();
                loadRentingHistory();
            }
            else if (tab.id === 'my-bank-cards')
            {
                clearProfileContent();
                loadBankCards();
            }
        });
    }
}
function clearProfileContent() 
{
    let content = document.getElementById('profile-content');
    content.innerHTML = '';
}
function loadRenting() 
{
    let content = document.getElementById('profile-content');
    let renting = document.createElement('div');
    let orders = new CarStorage('orders');
    if (orders === null || Object.keys(orders.items).length === 0)
    { 
        renting.className = '';
        renting.innerHTML = `
            У вас нет заказов. <a href="booking.html" class="font-l">Создать?</a>
        `;
    }
    else 
    {
        for (let order of Object.keys(orders.items))
        {
            let order_block = document.createElement('div');
            order_block.className = 'order';
            let order_number = document.createElement('div');
            order_number.textContent = `Заказ ${(+order) + 1}`;
            order_number.className = 'order-number';
            let order_price = document.createElement('div');
            order_price.className = 'order-price';
            let price = 0;
            for (let i of Object.keys(orders.items[order]))
            {
                price += orders.items[order][i]["price"];
            }
            order_price.textContent = `Итоговая стоимость: ${price}р./сутки`;
            let order_cars = document.createElement('div');
            order_cars.className = 'order-cars';
            let buttons = document.createElement('div');
            buttons.className = 'buttons';
            let accept_order = document.createElement('input');
            accept_order.type = 'button';
            accept_order.className = 'button';
            accept_order.onclick = () => {
                let history = new CarStorage('history');
                history.append(orders.items[order]);
                orders.erase(order);
                order_block.remove();
                let prof_content = document.getElementById('profile-content');
                let order_blocks = prof_content.getElementsByClassName('order');
                if (order_blocks.length === 0)
                {
                    renting.className = '';
                    renting.innerHTML = `
                        У вас нет заказов
                    `;
                }
            };
            accept_order.value = 'Оформить';
            let cancel_order = document.createElement('input');
            cancel_order.type = 'button';
            cancel_order.className = 'button';
            cancel_order.onclick = () => {
                orders.erase(order);
                order_block.remove();
                let prof_content = document.getElementById('profile-content');
                let order_blocks = prof_content.getElementsByClassName('order');
                if (order_blocks.length === 0)
                {
                    renting.className = '';
                    renting.innerHTML = `
                        У вас нет заказов
                    `;
                }
            };
            cancel_order.value = 'Отменить';
            buttons.appendChild(accept_order);
            buttons.appendChild(cancel_order);
            for (let start of Object.keys(orders.items[order]))
            {
                let car = document.createElement('div');
                let order_car = orders.items[order][start];
                car.className = 'car';
                car.innerHTML = `
                <div class="car-image" style='background-image:url(${order_car["img"]})'>
                </div>
                <div class="name">
                ${order_car["name"]}
                </div>
                <div class="price">
                ${order_car["price"]}р./сутки
                </div>
                `;
                let cancel_car_btn = document.createElement('input');
                cancel_car_btn.type = 'button';
                cancel_car_btn.className = 'button';
                cancel_car_btn.onclick = () => {
                    orders.eraseFrom(order, start);
                    car.remove();
                    if (order_block.getElementsByClassName('car').length === 0)
                    {
                        order_block.remove();   
                        renting.className = '';
                        renting.innerHTML = `
                        У вас нет заказов
                        `;
                    }
                };
                cancel_car_btn.value = 'Убрать';
                car.appendChild(cancel_car_btn);
                order_cars.appendChild(car);
            }
            order_block.appendChild(order_number);
            order_block.appendChild(order_cars);
            order_block.appendChild(order_price);
            order_block.appendChild(buttons);
            renting.appendChild(order_block);
        }    
    }
    content.appendChild(renting);

}
function loadRentingHistory() 
{
    let content = document.getElementById('profile-content');
    let renting = document.createElement('div');
    let order_history = new CarStorage('history');
    if (order_history === null || Object.keys(order_history.items).length === 0)
    { 
        renting.className = '';
        renting.innerHTML = `
            Вы ничего не бронировали.
        `;
    }
    else 
    {
        for (let order of Object.keys(order_history.items))
        {
            let order_block = document.createElement('div');
            order_block.className = 'order';
            let order_number = document.createElement('div');
            order_number.textContent = `Заказ ${(+order) + 1}`;
            order_number.className = 'order-number';
            let order_price = document.createElement('div');
            order_price.className = 'order-price';
            let price = 0;
            for (let i of Object.keys(order_history.items[order]))
            {
                price += order_history.items[order][i]["price"];
            }
            order_price.textContent = `Итоговая стоимость: ${price}р./сутки`;
            let buttons = document.createElement('div');
            buttons.className = 'buttons';
            let repeat_order = document.createElement('input');
            repeat_order.type = 'button';
            repeat_order.className = 'button';
            repeat_order.onclick = () => {
                let orders = new CarStorage('orders');
                orders.append(order_history.items[order]);
            };
            order_block.appendChild(order_number);
            repeat_order.value = 'Дублировать';
            buttons.appendChild(repeat_order);
            let order_cars = document.createElement('div');
            order_cars.className = 'order-cars';
            for (let start of Object.keys(order_history.items[order]))
            {
                let car = document.createElement('div');
                let order_car = order_history.items[order][start];
                car.className = 'car history-car-row-template';
                car.innerHTML = `
                    <div class="car-image" style='background-image:url(${order_car["img"]})'>
                    </div>
                    <div class="name">
                        ${order_car["name"]}
                    </div>
                    <div class="price">
                        ${order_car["price"]}р./сутки
                    </div>
                `;
                order_cars.appendChild(car);
            }
            order_block.appendChild(order_cars);
            order_block.appendChild(order_price);
            order_block.appendChild(buttons);
            renting.appendChild(order_block);
        }    
    }
    content.appendChild(renting);
}
function loadBankCards() 
{
    let content = document.getElementById('profile-content');
    let cards_block = document.createElement('div');
    let cards = JSON.parse(sessionStorage.getItem("cards"));
    if (cards === null)
    {
        cards_block.className = '';
        cards_block.innerHTML = `
            у вас нет способов оплаты. 
            <a href="cards.html" class="font-l">Добавить?</a>
        `;
    }
    else 
    {
        console.log(Object.keys(cards));
        for(let card_info of Object.keys(cards))
        {
            let card = document.createElement('div');
            card.className = 'card';
            let card_number = document.createElement('div');
            card_number.className = 'card-number';
            card_number.textContent = `Номер карты: ${cards[card_info]["card-number"]}`;
            let card_date = document.createElement('div');
            card_date.className = 'card-end-date';
            card_date.textContent = `Срок действия карты: ${cards[card_info]['month']}/${cards[card_info]['year']}`;
            let card_cvv = document.createElement('div');
            card_cvv.className = 'card-cvv';
            card_cvv.textContent = `CVV: ${cards[card_info]["cvv"]}`; 
            card.appendChild(card_number);
            card.appendChild(card_date);
            card.appendChild(card_cvv);
            cards_block.appendChild(card);
        }

    }
    content.appendChild(cards_block)
} 