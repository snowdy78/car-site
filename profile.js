function onPageEnter()
{
    let hs = JSON.parse(sessionStorage.getItem('header-states'));
    if (!hs["was_logged"])
    {
        window.location.href = 'login.html';
    }
    let sel_cars = sessionStorage.getItem('selected-cars');
    console.log(sel_cars);
}