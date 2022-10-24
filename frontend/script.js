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