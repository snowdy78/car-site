
let cars_json = {
    0: {
        "mark": "LADA",
        "model": "Vesta SW",
        "name": "",
        "number": "а123бв",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    },
    1: {
        "mark": "LADA",
        "model": "Priora I",
        "name": "",
        "number": "г456де",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    },
    2: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "ж789зи",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    },
    3: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "к012лм",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    } ,
    4: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "н345оп",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    5: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "р678ст",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    6: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "у901фч",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    7: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "з234пе",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    8: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "р567ов",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    9: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "и736ет",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
    ,
    10: {
        "mark": "",
        "model": "",
        "name": "",
        "number": "к032от",
        "price": -1,
        "filial": "",
        "img": "img/c1.png"
    }
};


function rend(id) {
    let car_str = sessionStorage.getItem('selected-cars');
    if (car_str == null)
    { 
        sessionStorage.setItem("selected-cars", JSON.stringify("{}"));
    }

    let car = JSON.parse(car_str)[id];

}