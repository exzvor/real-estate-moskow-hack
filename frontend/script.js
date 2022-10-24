'use strict'

const login = document.querySelector('.login');
const password = document.querySelector('.password');
const button = document.querySelector('.button');

const data = {};

data.login = login.value;
data.pass = password.value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(data);
console.log(raw);

const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
};

const url = "";  // СЮДА ВСТАВЬ URL

button.addEventListener('click', () => {
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})
