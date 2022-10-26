'use strict'

class Table {
    constructor(location, rooms, age, floors, material, currentFloor, squareFlat, squareKitchen, balcony, subway, condition) {
        this.location = location;
        this.rooms = rooms;
        this.age = age;
        this.floors = floors;
        this.material = material;
        this.currentFloor = currentFloor;
        this.squareFlat = squareFlat;
        this.squareKitchen = squareKitchen;
        this.balcony = balcony;
        this.subway = subway;
        this.condition = condition;
    }
    makeRow() {
        const row = `<td class="location">${this.location}</td><td class="rooms">${this.rooms}</td><td class="age">${this.age}</td><td class="floors">${this.floors}</td><td class="material">${this.material}</td><td class="currentFloor">${this.currentFloor}</td><td class="squareFlat">${this.squareFlat}</td><td class="squareKitchen">${this.squareKitchen}</td><td class="balcony">${this.balcony}</td><td class="subway">${this.subway}</td><td class="condition">${this.condition}</td>`;
        const table = document.querySelector('.table');
        table.insertAdjacentHTML('beforeend', row);
    };
    createTable() {
        this.makeRow();
    };
}

const form = document.getElementById('form');
const url = "https://hack-auth.herokuapp.com/api/user/login";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    let preparedData = JSON.stringify([...data].flat());
    console.log(preparedData);

    fetch(url, {
        method: "POST",
        // headers: myHeaders,
        body: preparedData,
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});

function fileReader(oEvent) {
    const oFile = oEvent.target.files[0];
    const sFilename = oFile.name;

    const reader = new FileReader();
    const result = {};

    reader.onload = function (e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(workbook);
        const result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            if (roa.length) result[sheetName] = roa;
        });
        console.log(typeof result);
        getRows(result);
        // console.log(JSON.stringify(result));
    };
    reader.readAsArrayBuffer(oFile);
}

// inplementing checking user data

const body = JSON.stringify({
    mode: "raw",
    raw: "[\"TDOC\, \"ADRES\"]"
})

function checkStreet(str) {
    console.log(str);
    // let obj = {};
    // fetch("https://apidata.mos.ru/v1/datasets/2044/rows?&$filter=global_id eq 58481065&api_key=5650e2cd63716f4dc8319a168c93b080", {
    //     method: "GET",
    //     headers: myHeaders
    //     // body: body
    // }).then(response => response.text())
    //     .then(result => {
    //         console.log(result);
    //         obj = JSON.parse(result)
    //         console.log(obj);
    //     })
    //     .catch(error => console.log('error', error));
}

function checkRange() {

}

function validation(str) {
    let firstColumn = 0;
    checkStreet(str[firstColumn]);
    checkRange();
}

function getRows(result) {
    let firstIndex = 0;
    let arr = Array.from(Object.values(result));
    console.dir(arr)
    for (let i = 1; i < arr[firstIndex].length; i++) {
        const consideredString = arr[firstIndex][i];
        console.log(consideredString);

        let table = new Table(arr[0][i][0], arr[0][i][1], arr[0][i][2], arr[0][i][3], arr[0][i][4], arr[0][i][5], arr[0][i][6], arr[0][i][7], arr[0][i][8], arr[0][i][9], arr[0][i][10]);
        table.createTable();

        if (consideredString[0] != null) {
            validation(consideredString);
        }
    }
}

document.querySelector('#input__file').addEventListener('change', function (e) {
    fileReader(e);
});

