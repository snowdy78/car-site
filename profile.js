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
    let orders = getOrders();
    if (orders === null)
    { 
        renting.className = '';
        renting.innerHTML = `
            вы ничего не выбирали 
        `;
    }
    else 
    {
        for (let order of Object.keys(orders))
        {
            let order_block = document.createElement('div');
            order_block.className = 'order';
            let order_cars = document.createElement('div');
            order_cars.className = 'order-cars';
            let buttons = document.createElement('div');
            let accept_order = document.createElement('div');
            accept_order.type = 'button';
            accept_order.className = 'button';
            accept_order.onclick = () => {
                // moving oreder to order history
            };
            accept_order.value = 'Оформить';
            let cancel_order = document.createElement('input');
            cancel_order.type = 'button';
            cancel_order.className = 'button';
            cancel_order.onclick = () => {
                eraseOrder(order);
                order_block.remove();
            };
            cancel_order.value = 'Отменить';
            buttons.appendChild(accept_order);
            buttons.appendChild(cancel_order);
            console.log(Object.keys(orders[order]));
            for (let start of Object.keys(orders[order]))
            {
                let car = document.createElement('div');
                car.className = 'car';
                let car_price = document.createElement('div');
                let car_name = document.createElement('div');
                let cancel_car_btn = document.createElement('input');
                cancel_car_btn.type = 'button';
                cancel_car_btn.className = 'button';
                cancel_car_btn.onclick = () => {
                    eraseFromOrder(order, start);
                    car.remove();
                    if (Object.keys(orders[order]).length == 0)
                    {
                        order_block.remove();   
                    }
                };
            
                cancel_car_btn.value = 'Убрать';
                car_name.className = 'name';
                car_name.textContent = cars_json[start]['name'];
                car_price.className = 'price';
                car_price.textContent = `${cars_json[start]["price"]}р./сутки`
                let car_img = document.createElement('div');
                car_img.className = 'car-image';
                car_img.style.backgroundImage = `url(${cars_json[start]["img"]})`;
                car.appendChild(car_img);
                car.appendChild(car_name);
                car.appendChild(car_price);
                car.appendChild(cancel_car_btn);
                order_cars.appendChild(car);
            }
            order_block.appendChild(order_cars);
            order_block.appendChild(buttons);
            renting.appendChild(order_block);
        }    
    }
    content.appendChild(renting);

}
function loadRentingHistory() 
{
    let content = document.getElementById('profile-content');
    let rent_history = document.createElement('div');
    let car_history = JSON.parse(sessionStorage.getItem("rent-history"));
    if (car_history === null)
    {
        rent_history.className = '';
        rent_history.innerHTML = `
            вы ничего не бронировали 
        `;
    }
    else {
        // load...
    }
    content.appendChild(rent_history);
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
            вы ничего не бронировали. 
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