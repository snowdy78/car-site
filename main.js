
console.log(is_register)
if (is_register)
{
    let header = document.getElementById('header');
    let element = document.createElement('div');
    element.className = 'element';
    element.id = 'account';
    header.appendChild(element);

}
else
{
    let header = document.getElementById('header');
    let element = document.createElement('div');
    element.className = 'element';
    element.id = 'reg';
    element.onclick = () => {
        is_register = true;
        window.location.href = 'register.html';
    }
    header.appendChild(element);
}