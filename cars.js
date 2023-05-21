
let cars_json = {
    0: {
        "name": "LADA Granta, 2019",
        "number": "а123бв",
        "price": 3100,
        "filial": "",
        "img": "img/c1.png"
    },
    1: {
        "name": "BMW X5 30d, 2020",
        "number": "г456де",
        "price": 5400,
        "filial": "",
        "img": "img/c2.png"
    },
    2: {
        "name": "Porsche Cayenne GTS Coupé, 2022",
        "number": "ж789зи",
        "price": 32400,
        "filial": "",
        "img": "img/c3.png"
    },
    3: {
        "name": "Toyota Land Cruiser, 2008",
        "number": "к012лм",
        "price": 2500,
        "filial": "",
        "img": "img/c4.png"
    },
    4: {
        "name": "Mitsubishi Lancer, 2006",
        "number": "н345оп",
        "price": 2000,
        "filial": "",
        "img": "img/c5.png"
    },
    5: {
        "name": "Skoda Octavia, 2021",
        "number": "р678ст",
        "price": 15600,
        "filial": "",
        "img": "img/c6.png"
    },
    6: {
        "name": "Ford Mustang, 2019",
        "number": "у901фч",
        "price": 7100,
        "filial": "",
        "img": "img/c7.png"
    },
    7: {
        "name": "Lexus LS Long 600h L, 2007",
        "number": "з234пе",
        "price": 4300,
        "filial": "",
        "img": "img/c8.png"
    },
    8: {
        "name": "Rolls-Royce Phantom Long Extended, 2021",
        "number": "р567ов",
        "price": 41800,
        "filial": "",
        "img": "img/c9.png"
    },
    9: {
        "name": "Kia EV6 Long Range, 2022",
        "number": "и736ет",
        "price": 10400,
        "filial": "",
        "img": "img/c10.png"
    },
    10: {
        "name": "Porsche Cayman GTS 4.0, 2022",
        "number": "к032от",
        "price": 21500,
        "filial": "",
        "img": "img/c11.png"
    },
    11: {
        "name": "Honda Civic, 2007",
        "number": "к032от",
        "price": 4300,
        "filial": "",
        "img": "img/c12.png"
    },
    12: {
        "name": "Kia Ceed, 2018",
        "number": "к032от",
        "price": 8200,
        "filial": "",
        "img": "img/c13.png"
    },
    13: {
        "name": "Suzuki Swift, 2010",
        "number": "к032от",
        "price": 3400,
        "filial": "",
        "img": "img/c14.png"
    },
    14: {
        "name": "Nissan X-Trail, 2022",
        "number": "к032от",
        "price": 18900,
        "filial": "",
        "img": "img/c15.png"
    }
};


function rend(id)
{
    let car_str = sessionStorage.getItem('selected-cars');
    if (car_str === null)
    { 
        sessionStorage.setItem("selected-cars", "{}");
        car_str = "{}";
    }
    let selected_cars = JSON.parse(car_str);
    selected_cars[id] = cars_json[id];
    console.log(cars_json[id]);
    console.log(selected_cars);
    sessionStorage.setItem("selected-cars", JSON.stringify(selected_cars));
}
function showCarDetails(car_id) 
{
    let car_d = document.createElement('div');
    car_d.id = "car-details-block";
    
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