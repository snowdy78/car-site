
let registrasion_button = document.getElementById('cac-button');
registrasion_button.addEventListener('click', () => {
    let is_filled = false;
    let reg_fields = [];
    let reg_elements = document.getElementsByClassName('reg-grid');
    if (reg_elements.length != 0)
    {
        for (let i = 0; i < reg_elements.length; i++)
        {
            let cells = reg_elements[i].getElementsByClassName('cell');
            if (cells.length != 0)
                is_filled = true;
            for(let j = 0; j < cells.length; j++)
            {
                let reg_field = cells[j].getElementsByClassName('text-input')[0];
                is_filled = is_filled && reg_field.value != "";
                reg_fields.push(reg_field);
            }
        }
    }
    else 
    {
        let log_elements = document.getElementsByClassName('login-grid');
        for (let i = 0; i < log_elements.length; i++)
        {
            let cells = log_elements[i].getElementsByClassName('cell');
            if (cells.length != 0)
                is_filled = true;
            for(let j = 0; j < cells.length; j++)
            {
                let reg_field = cells[j].getElementsByClassName('text-input')[0];
                is_filled = is_filled && reg_field.value != "";
                reg_fields.push(reg_field);
            }
        }
    }

    if (is_filled) 
    {
        let header_states = JSON.parse(sessionStorage.getItem('header-states'));
        header_states["was_logged"] = true;
        let data = document.getElementsByClassName('text-input');
        let data_list = [];
        for (let i of data) {
            data_list.push(i.id, i.value);
        }  
        sessionStorage.setItem('log-states', JSON.stringify(data_list));
        sessionStorage.setItem('header-states', JSON.stringify(header_states));
    }
    else {
        let fill_err = document.getElementById('err-state');
        fill_err.style.display = 'block';
    }
});

