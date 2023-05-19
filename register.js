let reg_btn = document.getElementById('cac-button');
reg_btn.addEventListener('click', () => {
    let header_states = JSON.parse(sessionStorage.getItem('header-states'));
    console.log();
    header_states["was_logged"] = true;
    sessionStorage.setItem('header-states', JSON.stringify(header_states));
});