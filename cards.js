function filt(v) 
{
    return v.replace(/[^0-9]/g , '');
}

function onCardNumberInput() 
{
    this.value = filt(this.value);
    let str = "" 
    for (let i = 0; i < this.value.length; i++) 
    {
        if (i % 4 == 0 && i != 0)
        {
            str+= "-";
        }
        str += this.value[i];
    }
    this.value = str;
    let type_block = document.getElementsByClassName('card-type-label')[0];
    let id = this.value.split('-')[0];
    if (id == '1111')
    {
        type_block.id = "visa-sys"
        type_block.classList.add('pay-system-img');
        let x = type_block.getElementsByTagName('div')[0];
        x.style.display='none';
    }
    else if (id == '2222')
    {
        type_block.id = "master-card-sys"
        type_block.classList.add('pay-system-img');
        let x = type_block.getElementsByTagName('div')[0];
        x.style.display='none';
    }
    else if (id == '3333')
    {
        type_block.classList.add('pay-system-img');
        type_block.id = "mir-sys"
        let x = type_block.getElementsByTagName('div')[0];
        x.style.display = "none";
    }
    else 
    {
        type_block.removeAttribute('id');
        let x = type_block.getElementsByTagName('div')[0];
        x.removeAttribute('style');
        type_block.appendChild(x);
    }
    let correction = document.getElementsByClassName('card-correct-label')[0];
    if (isCorrectCardNumber()) 
    {
        correction.style.color = '#ffb100';
        correction.textContent = 'Неизвестный номер карты';
    }
    else
    {
        correction.style.color = '';
        correction.textContent = '';
    }
}
function updateCardData()
{
    let correction = document.getElementsByClassName('card-correct-label')[0];
    if (isCorrectDate())
    {
        correction.style.color = '#ffb100';
        correction.textContent = 'Срок действия карты истек';
    }
    else {
        correction.style.color = '';
        correction.textContent = '';
    }
}
function onCardMonthInput() 
{
    this.value = filt(this.value);
    updateCardData();
}
function onCardYearInput() 
{
    this.value = filt(this.value);
    updateCardData();
}
function onCardCVVInput() 
{
    this.value = filt(this.value);
    let correction = document.getElementsByClassName('card-correct-label')[0];
    if (this.value.length < 3) 
    {
        correction.style.color = '#ffb100';
        correction.textContent = 'Неверный CVV';
    }
    else
    {
        correction.style.color = '';
        correction.textContent = '';
    }
}
function cvvIsCorrect() 
{
    let incvv = document.getElementById('incvv');
    return incvv.value.length >= 3;
}
function isCorrectDate() 
{
    let month_block = document.getElementById('inmonth');
    let year_block = document.getElementById('inyear'); 
    let date = new Date();
    let mon = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear() - 2000;
    let inmon = +month_block.value;
    let inyear = +year_block.value;
    if (inmon < mon && year === inyear || inyear < year)
    {
        return true;
    }
    return false;
}
function monthIsCorrect() 
{
    let month = document.getElementById('inmonth');
    return (+month.value) <= 12; 
}
function yearIsCorrect() 
{
    return isCorrectDate();
}
function isCorrectCardNumber() 
{
    let incn = document.getElementById('incn');
    return incn.value.length < 19;
}
function onCardAdd() 
{
    let str_cards = sessionStorage.getItem('cards');
    if (str_cards === null)
    {
        sessionStorage.setItem('cards', "{}");
        str_cards = "{}";
    }
    let cards = JSON.parse(str_cards);
    let id = Object.keys(cards).length;
    if (isCorrectCardNumber() && monthIsCorrect() && yearIsCorrect() && cvvIsCorrect())
    {
        cards[id] = {
            'card-number': +document.getElementById('incn').value,
            'month': +document.getElementById('inmonth').value,
            'year': +document.getElementById('inyear').value,
            'cvv': +document.getElementById('incvv').value
        };
        sessionStorage.setItem('cards', JSON.stringify(cards));
    }  

    
}
document.querySelector('#incn').oninput = onCardNumberInput;
document.querySelector('#inmonth').oninput = onCardMonthInput;
document.querySelector('#inyear').oninput = onCardYearInput;
document.querySelector('#incvv').oninput = onCardCVVInput;