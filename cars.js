
let cars_json = {
    0: {
        "name": "LADA Granta I",
        "number": "а123бв",
        "price": 2100,
        "filial": "",
        "img": "img/c1.png"
    },
    1: {
        "name": "BMW X5 30d",
        "number": "г456де",
        "price": 5400,
        "filial": "",
        "img": "img/c2.png"
    },
    2: {
        "name": "Porsche Cayenne GTS Coupé",
        "number": "ж789зи",
        "price": 23400,
        "filial": "",
        "img": "img/c3.png"
    },
    3: {
        "name": "Toyota Land Cruiser",
        "number": "к012лм",
        "price": 2500,
        "filial": "",
        "img": "img/c4.png"
    } ,
    4: {
        "name": "Mitsubishi Lancer",
        "number": "н345оп",
        "price": 1200,
        "filial": "",
        "img": "img/c5.png"
    }
    ,
    5: {
        "name": "",
        "number": "р678ст",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    6: {
        "name": "",
        "number": "у901фч",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    7: {
        "name": "",
        "number": "з234пе",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    8: {
        "name": "",
        "number": "р567ов",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    },
    9: {
        "name": "",
        "number": "и736ет",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    10: {
        "name": "",
        "number": "к032от",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
};


function rend(id)
{
    let car_str = sessionStorage.getItem('selected-cars');
    if (car_str == null)
    { 
        sessionStorage.setItem("selected-cars", JSON.stringify("{}"));
    }

    let car = JSON.parse(car_str);

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
            <div class=price>
                ${cars_json[i]["price"]}р.
            </div>
            <div class='flex x-center w100-box h100-box'>
                <input type='button' class='button h80-box rmar-5' value='Аренда' onclick='rend(${i})'>
                <input type='button' class='button h80-box' value='Подробнее' onclick='rend(${i})'>
            </div>
        `;
        
        car_cell.appendChild(car_descr_block);
        car_field.appendChild(car_cell);
    }
}