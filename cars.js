
let cars_json = {
    0: {
        "name": "LADA Granta, 2019",
        "number": "а123бв",
        "price": 3100,
        "filial": "Новосибирский",
        "img": "img/c1.png"
    },
    1: {
        "name": "BMW X5 30d, 2020",
        "number": "г456де",
        "price": 5400,
        "filial": "Барнаульский",
        "img": "img/c2.png"
    },
    2: {
        "name": "Porsche Cayenne GTS Coupé, 2022",
        "number": "ж789зи",
        "price": 32400,
        "filial": "Челябинский",
        "img": "img/c3.png"
    },
    3: {
        "name": "Toyota Land Cruiser, 2008",
        "number": "к012лм",
        "price": 2500,
        "filial": "Московский",
        "img": "img/c4.png"
    },
    4: {
        "name": "Mitsubishi Lancer, 2006",
        "number": "н345оп",
        "price": 2000,
        "filial": "Питербургский",
        "img": "img/c5.png"
    },
    5: {
        "name": "Skoda Octavia, 2021",
        "number": "р678ст",
        "price": 15600,
        "filial": "Московский",
        "img": "img/c6.png"
    },
    6: {
        "name": "Ford Mustang, 2019",
        "number": "у901фч",
        "price": 7100,
        "filial": "Барнаульский",
        "img": "img/c7.png"
    },
    7: {
        "name": "Lexus LS Long 600h L, 2007",
        "number": "з234пе",
        "price": 4300,
        "filial": "Питербургский",
        "img": "img/c8.png"
    },
    8: {
        "name": "Rolls-Royce Phantom Long Extended, 2021",
        "number": "р567ов",
        "price": 41800,
        "filial": "Московский",
        "img": "img/c9.png"
    },
    9: {
        "name": "Kia EV6 Long Range, 2022",
        "number": "и736ет",
        "price": 10400,
        "filial": "Новосибирский",
        "img": "img/c10.png"
    },
    10: {
        "name": "Porsche Cayman GTS 4.0, 2022",
        "number": "к032от",
        "price": 21500,
        "filial": "Барнаульский",
        "img": "img/c11.png"
    },
    11: {
        "name": "Honda Civic, 2007",
        "number": "к032от",
        "price": 4300,
        "filial": "Челябинский",
        "img": "img/c12.png"
    },
    12: {
        "name": "Kia Ceed, 2018",
        "number": "к032от",
        "price": 8200,
        "filial": "Челябинский",
        "img": "img/c13.png"
    },
    13: {
        "name": "Suzuki Swift, 2010",
        "number": "к032от",
        "price": 3400,
        "filial": "Новосибирский",
        "img": "img/c14.png"
    },
    14: {
        "name": "Nissan X-Trail, 2022",
        "number": "к032от",
        "price": 18900,
        "filial": "Питербургский",
        "img": "img/c15.png"
    }
};

function getOrders()
{
    let str_orders = sessionStorage.getItem("orders");
    if (str_orders === null)
    {
        str_orders = "{}";
        sessionStorage.setItem("orders", str_orders);
    }
    return JSON.parse(str_orders);
}
function appendOrder(ids_of_cars) 
{
    let orders = getOrders();
    let order = {};
    for (let id of ids_of_cars)
    {
        order[id] = cars_json[id];
    }
    let order_id = Object.keys(orders).length;
    orders[order_id] = order;
    sessionStorage.setItem('orders', JSON.stringify(orders));
}

function appendToOrder(order_id, car_id) 
{
    let orders = getOrders();
    if (orders[order_id] === undefined)
    {
        appendOrder([]);
        return;
    }
    orders[order_id][car_id] = cars_json[car_id];
    
    sessionStorage.setItem('orders', JSON.stringify(orders));
}
function eraseOrder(order_id)
{
    let orders = getOrders();
    if (orders[order_id] === undefined) 
        return;
    if (Object.keys(orders).length > 0)
    {
        for (let car of Object.keys(orders[order_id]))
        {
            delete orders[order_id][car];
        }
        delete orders[order_id];
    }
    else 
    {
        order[order_id] = {};
    }
    sessionStorage.setItem('orders', JSON.stringify(orders));
}
function eraseFromOrder(order_id, car_id) 
{
    let orders = getOrders();
    if (orders[order_id] === undefined)
    {
        return;
    }
    else if (orders[order_id] === undefined)
    {
        return;
    } 
    delete orders[order_id][car_id];
    if (Object.keys(orders).length > 0 && Object.keys(orders[order_id]).length === 0)
    {
        delete orders[order_id];
    }
    sessionStorage.setItem('orders', JSON.stringify(orders));
}
function rend(id)
{
    let car_str = sessionStorage.getItem('selected-cars');
    let orders = getOrders();
    if (car_str === null)
    { 
        sessionStorage.setItem("selected-cars", "{}");
        car_str = "{}";
    }
    let selected_cars = JSON.parse(car_str);
    selected_cars[id] = cars_json[id];
    
    appendToOrder(0, id);
    sessionStorage.setItem("selected-cars", JSON.stringify(selected_cars));
}
function hideCarDetails() {
    let before_car_d = document.getElementById('car-details');
    if (before_car_d != null)
        before_car_d.remove();
}
function getCarsByFilialName(filial_name) 
{
    let cars = {};
    let len = Object.keys(cars_json).length;
    for (let i = 0; i < len; i++)
    {
        if (cars_json[i]["filial"] === filial_name)
        {
            cars[i] = cars_json[i];
        }
    }
    return cars;

}
function showCarDetails(car_id) 
{
    hideCarDetails();
    let content = document.getElementById('content');
    let car_details = document.createElement('div');
    let car = cars_json[car_id];
    let car_name = car["name"]; 
    let car_mark_id = car_name.search(' ');
    let car_mark = car_name.slice(0, car_mark_id);
    let car_year_id = car_name.search(', ') + 1;
    let car_model = car_name.slice(car_mark_id, car_year_id - 1);
    let car_year = car_name.slice(car_year_id, car_name.length);
    let srd = new Date();
    let daycount = 1;
    car_details.id = "car-details";
    car_details.innerHTML = `
        <h1>
            ${cars_json[car_id]["name"]}
        </h1>
        <div class="X-block x-right y-top grid-1x-1y tmar-5 rmar-5" onclick="hideCarDetails()">
            <div class="X xy-center"></div>
        </div>
        <div class="car-img" style="background-image:url(${car["img"]})">
        </div>
        <div class="text">
            Марка: ${car_mark}
        </div>
        <div class="text">
            Модель: ${car_model}
        </div>
        <div class="text">
            Год: ${car_year}
        </div>
        <div class="text" id="start-date">
            Дата начала аренды: ${srd.getDate()}.${srd.getMonth() + 1}.${srd.getFullYear()}
        </div>
        <div class="text" id="end-date">
            Дата конца аренды: ${srd.getDate() + daycount}.${srd.getMonth() + 1}.${srd.getFullYear()}
        </div>
        <div class="text">
            Дни аренды:
            <input id="daycount" type="number" value="${daycount}" min="1">
        </div>
        <div class="text"> 
            Филиал: ${car['filial']}
        </div>
        <div id="car-rend-price" class="text">
            Цена: ${car['price']}р.
        </div>
        <div class="text w100-box flex x-center">
            <input type="button" class="button" onclick="rend(${car_id})" value="Аренда">
        </div>
    `;
    content.appendChild(car_details);
    let f = () => {
        
        let dc = document.getElementById('daycount'); // day count
        let car_price = document.getElementById('car-rend-price');
        let day_count = +dc.value;
        let incr = ` (за сутки ${car['price']}р.)`
        if (day_count == 1)
            incr = ""
        car_price.textContent = `Цена: ${car['price']*day_count}р.` + incr;
        let ed = new Date();
        ed.setDate(srd.getDate()+(+dc.value));
        let end_date = document.getElementById('end-date');
        end_date.textContent = `Дата конца аренды: ${ed.getDate()}.${ed.getMonth() + 1}.${ed.getFullYear()}`;

    }
    let dc = document.getElementById('daycount'); // day count
    dc.addEventListener('keyup', f);
    dc.addEventListener('mouseup', f);
}
function showCars(ids) 
{
    let elem = document.getElementById('car-view');
    if (elem !== null)
    {
        elem.remove();
    }
    
    let content = document.getElementById('content');
    let cars_block = document.createElement('div');
    cars_block.innerHTML = `
        <div class="first-field">
            <div class="X-block" onclick="document.getElementById('car-view').remove()">
                <div class="X xy-center"></div>
            </div>
        </div>
    `;
    cars_block.id = 'car-view';
    for (let start of ids)
    {
        let car = document.createElement('div');
        car.className = 'car';
        let car_price = document.createElement('div');
        let btn = document.createElement('input');
        btn.type = 'button';
        btn.onclick = () => {rend(start);};
        btn.value = "Арендовать";
        btn.className = "button";
        let car_name = document.createElement('div');
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
        car.appendChild(btn);
        cars_block.appendChild(car);
    }
    content.appendChild(cars_block);
}
function generateCars() 
{
    let car_field = document.getElementById('content').getElementsByClassName('car-select')[0];
    let len = Object.keys(cars_json).length;
    for (let i = 0; i < len; i++)
    {
        let car_cell = document.createElement('div');
        car_cell.className = "car-cell";
        let car_img = document.createElement('div'); 
        car_img.className = 'car-img';
        car_img.style.backgroundImage = `url(${cars_json[i]["img"]})`;
        car_cell.appendChild(car_img);
        let car_descr_block = document.createElement('div');
        car_descr_block.className = 'car-descr-block';
        car_descr_block.innerHTML = `
            <div class="car-name">
                ${cars_json[i]["name"]}
            </div>
            <div class="price x-left lmar-10">
                от ${cars_json[i]["price"]}р./сутки
            </div>
            <div class='flex x-center w100-box h100-box'>
                <input type='button' class='button h80-box rmar-5' value='Аренда' onclick='rend(${i})'>
                <input type='button' class='button h80-box' value='Подробнее' onclick='showCarDetails(${i})'>
            </div>
        `;
        
        car_cell.appendChild(car_descr_block);
        car_field.appendChild(car_cell);
    }
}