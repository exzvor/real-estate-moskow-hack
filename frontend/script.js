'use strict'

const form = document.getElementById('form');
const url = "http://localhost:8080/api/user/new";


const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    let preparedData = JSON.stringify([...data].flat());
    console.log(preparedData)

    fetch(url, {
        method: "POST",
        body: preparedData,
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});


// inmplementing fileReader

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
        console.log(result);
    };
    reader.readAsArrayBuffer(oFile);
}

document.querySelector('#input__file').addEventListener('change', function (e1) {
    fileReader(e);
});