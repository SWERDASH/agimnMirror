import { posts, savePOSTS, loadPOSTS } from './news.js';
import { loadStyle, rgbToHex, Colors, Reset } from "./settings.js";
import { expandimages } from './functions.js';
var elements = {
    other: ["BG", "HWFR", "TAS", "TES"],
    text: ["TEX", "e"]
}
if (document.querySelector('.ver')){
    document.querySelector('.ver').addEventListener('click', () => {
        ver();
    });
}

export var loginN;
var loginsN = [{
    login:"swerdash",
    password:"anim"
},
{
    login:"TaskManager",
    password:"password"
}];
function ver(){
    loginN = document.querySelector('.login').value;
    var passN = document.querySelector('.password').value;
    let n = loginsN.map(function (e) {
        return e.login;
    }).indexOf(loginN);
    if(n != -1){
        if((passN == loginsN[n].password)){
            loadNewsManager(loginN);
        }else{
            alert('Неверный логин или пароль');
        }
    }else{alert('Неверный логин или пароль');}
}

function loadNewsManager(loginN){
    let newScript1 = document.createElement("script");
    newScript1.src = '/public/js/newsmanager.js';
    newScript1.type = 'module';
    let newScript2 = document.createElement("script");
    newScript2.src = '/public/js/main.js';
    newScript2.type = 'module';
    document.querySelector('.taskpage').innerHTML=
    `
    <div class="expanded-image"></div>
    <div class="newsCreate HWFR">
        <a class="button imageConvert" href="https://postimages.org/" target="_blank"><img class="icon" src="/public/icons/autorenew_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">Конвертировать изображение в ссылку</a>
        <div class="news-images-added"><input placeholder="Ссылка на изображение" class="upload-image" type="text"><img class="button addIMG" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></div>
        <textarea class="news-text-input" placeholder="Новость" rows="5" cols="33"></textarea>
        <img class="button addNews" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">
    </div>
    <div class="loginNow">${loginN}</div>
    <div class="newsFrame HWFR">
        <div class="news"></div>
    </div>
    `
    document.body.appendChild(newScript1);
    document.body.appendChild(newScript2);
    var images = [];
    load(images);
    renderPostsManager(loginN);
}

function addPost(images){
    document.querySelector('.addNews').addEventListener('click', () => {
        document.querySelector('.addNews').setAttribute('listener', false);
        const now = new Date();
        const date = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()} | ${now.getUTCHours() + 5}:${now.getUTCMinutes()}`
        const text = document.querySelector('.news-text-input').value;
        const index = Math.floor(Math.random() * 999999);
        posts.push({
            text:text,
            head:images,
            date:date,
            author:loginN,
            index:index,
            postI:1
        });
        alert('Новость добавлена');
        console.log(posts);
        savePOSTS();
        renderPostsManager(loginN);
    });
}

function load(images){
    if (document.querySelector('.addIMG')){
        document.querySelector('.addIMG').addEventListener('click', () => {
            const img = document.querySelector('.upload-image').value;
            images.push(img);
            document.querySelector('.news-images-added').innerHTML += '<input placeholder="Ссылка на изображение" class="upload-image" type="text"><img class="button addIMG" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">'
            document.querySelector('.news-images-added').innerHTML = document.querySelector('.news-images-added').innerHTML.replace('<input placeholder="Ссылка на изображение" class="upload-image" type="text"><img class="button addIMG" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">', `<img class="news-image" src=${img}><img class="trash" src='/public/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'>`);
            setTimeout(() =>{
                load(images);
            }, 100);
        }); 
    }
    if(document.querySelector('.addNews')){
        if(document.querySelector('.addNews').getAttribute('listener') != "true"){
            document.querySelector('.addNews').setAttribute('listener', true);
            addPost(images)
        }
    }
}

function renderPostsManager(loginN){
    var html = '';
    posts.forEach((post, index) => {
        if(post.text !== "error"){
            if((post.author == loginN) || (loginN == "swerdash")){
                html += `
                <div class="news-item TAS" id="news-item${index}">
                    <div id="top${index}" class="editTools editNews">
                            <img title="Удалить" src="/public/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="delete deletenews" id="${post.index}">
                            <img title="Редактировать" class="editT editnews editT${index}" id="${index}" src="/public/icons/edit_note_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">
                    </div>
                    <div class="news-images" id="images${index}">
                        post.head
                    </div>
                    <p class="news-text TEX TES">${post.text}</p>
                    <div class="news-date TEX TES">${post.date}</div>
                    <div class="news-author TEX TES">${post.author}</div>
                </div>`
            }else{
                html += `
                <div class="news-item TAS" id="news-item${index}">
                    <div class="news-images" id="images${index}">
                        post.head
                    </div>
                    <p class="news-text TEX TES">${post.text}</p>
                    <div class="news-date TEX TES">${post.date}</div>
                    <div class="news-author TEX TES">${post.author}</div>
                </div>`
            }
        }
        setTimeout(() => {
            var images = post.head;
            edit(post, index, images);
            deleter(post, index);
            renderImages(post, index);
            elements.other.forEach((other) => {loadStyle(other, false)});
            elements.text.forEach((text) => {loadStyle(text, true)});
        }, 100)
    });
    if(document.querySelector('.news')){
        document.querySelector('.news').innerHTML = html;
    }
}

export function renderImages(post, inx){
    var ima = ''
    if(post.head.forEach){
        post.head.forEach((image, index) => {
            if (image != ''){
                ima += `<div class="image-container image-container${index}"><img class="e news-image news-image${index}" src=${image}><img class="trash trash${index}" src='/public/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'></div>`
            }else{
                ima = '';
            }
        });
    }else{
        ima += ``;
    }
    if(document.getElementById(`images${inx}`)){document.getElementById(`images${inx}`).innerHTML = ima; expandimages(post, inx);}
}

function renderEdited(post, inx, images){
    var ima = ''
    images = String(images).split(',')
    if(images.forEach){
        images.forEach((image, index) => {
            if (image != ''){
                ima += `<div class="image-container image-container${index}"><img class="news-image news-image${index}" src=${image}><img class="trash trash${index}" src='/public/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'></div>`
            }else{
                ima = '';
            }
        });
    }else{
        ima += ``;
    }
    if(document.getElementById(`images${inx}`)){
        document.getElementById(`images${inx}`).innerHTML = ima; 
        imagedeleter(post, inx, images);
        loadEditing(post, inx, images);
        renderImages(post, inx);
        console.log(images);
    }
}

function loadEditing(post, index, images){
    images = String(images).split(',')
    console.log(images);
    if (document.querySelector(`.addIMGEditing${post.index}`)){
        document.querySelector(`.addIMGEditing${post.index}`).addEventListener('click', () => {
            const img = document.getElementById(`edit-images${post.index}`).value;
            images.push(img);
            post.head = String(images).split(',');
            setTimeout(() =>{
                renderEdited(post, index, images);
                document.getElementById(`images${index}`).innerHTML += `<div class="news-images-added editImage"><input placeholder="Ссылка на изображение" class="upload-image" id="edit-images${post.index}" type="text"><img class="button addIMG addIMGEditing${post.index}" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></div>`
                loadEditing(post, index, images);
            }, 100);
            setTimeout(() => {
                imagedeleter(post, index, images, 1);}, 200);
        });
    }
}

function deleter(post, index){
    if ((document.getElementById(post.index)) && (document.getElementById(post.index).getAttribute('listener') !== "true")){
        document.getElementById(post.index).setAttribute('listener', true);
        document.getElementById(post.index).addEventListener('click', () =>{
            document.getElementById(`news-item${index}`).classList.add('deleted-task');
            setTimeout(() => {
                posts.splice(index, 1);
                savePOSTS();
                renderPostsManager(loginN);
            }, 200);
        });
    }
}

function edit(post, index, images){
    console.log(images);
    var buttons = `<img title="Отменить изменения" src="/public/icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="cancel cancelNews" id="${index}"> <img title="Подтвердить изменения" src="/public/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="conf${index} conf confNews">`;
    if (document.querySelector(`.editT${index}`)){
        if (!(document.querySelector(`.editT${index}`).checked) && (document.querySelector(`.editT${index}`).getAttribute('listener') !== "true")){
            document.querySelector(`.editT${index}`).setAttribute('listener', true);
            document.querySelector(`.editT${index}`).addEventListener('click', () => {
                document.getElementById(post.index).setAttribute('listener', false);
                setTimeout(() => {deleter(post, index);}, 100)
                images = String(images).split(',')
                document.getElementById(`images${index}`).innerHTML += `<div class="news-images-added editImage"><input placeholder="Ссылка на изображение" class="upload-image" id="edit-images${post.index}" type="text"><img class="button addIMG addIMGEditing${post.index}" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></div>`;
                document.getElementById(`images${index}`).classList.add('editing');
                document.getElementById(`news-item${index}`).innerHTML = document.getElementById(`news-item${index}`).innerHTML.replace(`<p class="news-text">${post.text}</p>`, `<textarea class="inser ins${index}"></textarea>`);
                document.getElementById(`top${index}`).innerHTML += buttons
                document.querySelector(`.ins${index}`).value = posts.at(index).text;
                imagedeleter(post, index, images);
                loadEditing(post, index, images);
                document.getElementById(`news-item${index}`).classList.add('chos')
                document.querySelector(`.editT${index}`).checked = 1;
                setTimeout(() => {confirm(post, index, buttons, images);}, 10);
                cancel(post, index, buttons, images);
            });
        }
    }
}

function imagedeleter(post, index, images, added){
    if(post.head.forEach){
        post.head.forEach((image, indexs) => {
            var Trashv = document.querySelector(`.trash${indexs}`);
            if (Trashv){
                if (added == 1){Trashv.setAttribute('listener', "False");}
                if (Trashv.getAttribute('listener') != 'True'){
                    Trashv.addEventListener('click', () => {
                        Trashv.setAttribute('listener', "False");
                        images.splice(indexs, 1);
                        post.head = String(images).split(',');
                        renderEdited(post, index, images);
                        document.getElementById(`images${index}`).innerHTML += `<div class="news-images-added editImage"><input placeholder="Ссылка на изображение" class="upload-image" id="edit-images${post.index}" type="text"><img class="button addIMG addIMGEditing${post.index}" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></div>`;
                        loadEditing(post, index, images);
                    });
                    Trashv.setAttribute('listener', "True");
                }
            }
        });
    }
}

function cancel(post, index, buttons, images){
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    document.querySelector('.cancel').addEventListener('click', () => {
        document.getElementById(post.index).setAttribute('listener', false);
        setTimeout(() => {deleter(post, index);}, 100)
        showCurr(post, index, buttons, images);
    });
    document.querySelector(`.editT${index}`).addEventListener('click', () => {
        document.getElementById(post.index).setAttribute('listener', false);
        setTimeout(() => {deleter(post, index);}, 100)
        showCurr(post, index, buttons, images);
    });
}

function confirm(post, index, buttons, images){
    console.log(images);
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    document.querySelector(`.conf${index}`).addEventListener('click', () => {
        var v = document.querySelector(`.ins${index}`).value;
        console.log(images);
        if (document.querySelector(`.editT${index}`).checked){
            post.text = v;
            posts.head = images;
            document.getElementById(post.index).setAttribute('listener', false);
            savePOSTS();
            showCurr(post, index, buttons, images);
        }
    });
}

function showCurr(post, index, buttons, images){
    images = String(images).split(',')
    document.getElementById(`news-item${index}`).classList.remove('chos')
    document.getElementById(`images${index}`).classList.remove('editing');
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    setTimeout(() => {deleter(post, index);}, 100)
    document.getElementById(`news-item${index}`).innerHTML = document.getElementById(`news-item${index}`).innerHTML.replace(`<textarea class="inser ins${index}"></textarea>`, `<p class="news-text">${post.text}</p>`);
    document.getElementById(`news-item${index}`).innerHTML = document.getElementById(`news-item${index}`).innerHTML.replace(buttons, '');
    document.getElementById(`images${index}`).innerHTML = images;
    document.querySelector(`.editT${index}`).checked = 0;
    edit(post, index, images);
    renderImages(post, index, images);
}