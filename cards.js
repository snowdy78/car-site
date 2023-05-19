function onCardNumberInput() {
    this.value = this.value.replace(/[^0-9]/g , '');
    let str = "" 
    for (let i = 0; i < this.value.length; i++) {
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
        type_block.textContent = "";
    }
    else if (id == '2222')
    {
        type_block.id = "master-card-sys"
        type_block.textContent = "";
    }
    else if (id == '3333')
    {
        type_block.id = "mir-sys"
        type_block.textContent = "";
    }
    else 
    {
        type_block.id = null;
        type_block.textContent = "Банковская Карта";
    }
}
function onCardMonthInput() {

}
function onCardYearInput() {

}
function onCardCVVInput() {

}
document.querySelector('#incn').oninput = onCardNumberInput;
document.querySelector('#inmonth').oninput = onCardMonthInput;
document.querySelector('#inyear').oninput = onCardYearInput;
document.querySelector('#incvv').oninput = onCardCVVInput;