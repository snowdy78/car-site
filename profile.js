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
    let sel_cars = JSON.parse(sessionStorage.getItem("selected-cars"));
    if (sel_cars === null)
    { 
        renting.className = '';
        renting.innerHTML = `
            вы ничего не выбирали 
        `;
    }
    else {
        // load...
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