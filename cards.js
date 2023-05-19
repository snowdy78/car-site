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
    if (this.value.length < 19) 
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
    let month_block = document.getElementById('inmonth');
    let year_block = document.getElementById('inyear'); 
    let date = new Date();
    let mon = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear() - 2000;
    let inmon = +month_block.value;
    let inyear = +year_block.value;

    let not_correct_date = false;
    if (inmon < mon && year === inyear)
    {
        not_correct_date = true;
    }
    else if (inyear < year)
    {
        not_correct_date = true;
    } 
    let correction = document.getElementsByClassName('card-correct-label')[0];
    if (not_correct_date)
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
document.querySelector('#incn').oninput = onCardNumberInput;
document.querySelector('#inmonth').oninput = onCardMonthInput;
document.querySelector('#inyear').oninput = onCardYearInput;
document.querySelector('#incvv').oninput = onCardCVVInput;