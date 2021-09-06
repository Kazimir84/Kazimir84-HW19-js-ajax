let url = new URL('http://localhost:3000/posts');
let author = document.getElementById('author');
let formId = document.getElementById('formId');
let ul = document.getElementById('posts');
let submit = document.getElementById('submit');

let getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr = typeof XMLHttpRequest != 'undefined'
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            let status = xhr.status;
            if(status === 200) {
                console.log(`Данные с адресса : ${url} - успешно получены и выведены в низ списка на экране.`);
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
         xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
             } else {
                console.log(`Получено ${event.loaded} байт`);
            }            
          };
        xhr.onerror = () => {
            reject(`Возникла ошибка при подключении к: ${url}`);
        }
        xhr.send();
    });
};

getJSON(url)
    .then(function(data) {
        console.log('Success ', data);
        let output = '<ul> Posts ';
        
        for(let i in data) {
            output += '<li>' + data[i].title + ' '  + data[i].author + ' ' + ' id : ' + data[i].id +'</li>';
        };
            output += '</ul>';
        let ul = document.getElementById('posts');
        ul.innerHTML = output;
    }, function(status) {
        console.log(`Failed to load resource: the server responded with a status of ${status} (Not Found) ОШИБКА  ${status}`);
    })
// =======================================================
let saveJson = function(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr = typeof XMLHttpRequest != 'undefined'
		? new XMLHttpRequest()
		: new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.responseType = 'json';
        xhr.onload = () => {
            let status = xhr.status;
            if (status === 200) {
                console.log(`Данные на ${url} успешно отправлены.`);
                resolve(xhr.response);
            } else { 
                console.log(`Данные на ${url} успешно отправлены.`);
                reject(status);
            };
        };
        xhr.onerror = (e) => {
            console.log(`ОШИБКА - Данные неотправлены. Ошибка с подклчением к: ${url}`);
            reject(`Возникла ошибка при подключении к: ${url}`);
        };
        xhr.send(data);
    });
};
let getFormData = function(form) {
    let obj = {};
    let elements = form;

    for(let i = 0; i < elements.length; ++i) {
        let element = elements[i];
        let name = element.name;
        let value = element.value;

        if(name) {
            obj[name] = value;
        };
    };
    return obj;
};

let form = document.forms.posts;
form.addEventListener('submit', () => {
    saveJson(url, JSON.stringify(getFormData(form)))        
        .then(() => ul.innerHTML = getFormData)
        .catch(error => console.log('Возникла ошибка:', error))
});
// ==============================================================
