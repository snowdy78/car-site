function load_header_profile()
{ 
    const i = {
        "was_logged": false,
    };
    let hs = sessionStorage.getItem('header-states');
    if (hs == null)
    { 
        sessionStorage.setItem("header-states", JSON.stringify(i));
    }

    let was_logged = JSON.parse(sessionStorage.getItem("header-states"))["was_logged"];


    let logged_header = document.getElementById('logged-header');
    let unlogged_header = document.getElementById('no-log-header');

    if (was_logged)
    {
        
        let prof_case = document.createElement('div');
        prof_case.id = "prof-case";
        prof_case.className = 'element font-l br-d3';
        prof_case.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
        if (unlogged_header != null) 
        {
            unlogged_header.id = "logged-header";   
            unlogged_header.className = 'log-header-template-columns bg-d2';
            unlogged_header.appendChild(prof_case);
        }
        else 
        {
            logged_header.className = 'log-header-template-columns bg-d2';
            logged_header.appendChild(prof_case);
        }
    }
    else
    {
        
        let log_case = document.createElement('div');
        log_case.className = 'element font-l br-d3';
        log_case.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
        log_case.textContent = "Вход";
        let reg_case = document.createElement('div');
        reg_case.className = 'element font-l br-d3';
        reg_case.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
        reg_case.textContent = "Регистрация";
        if (logged_header != null) 
        {
            logged_header.id = 'no-log-header';
            logged_header.className = 'no-log-header-template-columns bg-d2';
            logged_header.appendChild(log_case);
            logged_header.appendChild(reg_case);    
        }
        else {
            unlogged_header.className = 'no-log-header-template-columns bg-d2';
            unlogged_header.appendChild(log_case);
            unlogged_header.appendChild(reg_case);
        }
    }

}
let nav = document.getElementById('nav-menu');
nav.addEventListener('click', () => {
    let viewmenu = document.getElementById('vm');
    if (viewmenu.className === "no-display")
    {
        viewmenu.className = "display";
        let grid = document.getElementById('vm-grid');
        let was_logged = JSON.parse( sessionStorage.getItem('header-states'))["was_logged"];
        console.log(was_logged);
        if (was_logged)
        {
            grid.className = 'grid-lk';
            let elems = grid.getElementsByClassName('elem');
            elems[0].textContent = "Лич. кабинет";
            elems[1].textContent = "История Бронирования";
            elems[0].setAttribute('onclick', 
                "window.location.href = 'profile.html';");
            elems[1].setAttribute('onclick', 
                "window.location.href = 'history.html';");
        }
        else 
        {
            grid.className = 'grid';
            let elems = grid.getElementsByClassName('elem');
            elems[0].textContent = "Вход";
            
            elems[1].textContent = "Регистрация";
        }
    }
    else 
    {
        viewmenu.className = 'no-display';
    }; 
});
//addEventListener("resize", () => {
    //let viewmenu = document.getElementById('vm');
    //viewmenu.style.display = '';
//});