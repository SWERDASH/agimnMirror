import { renderImages } from "./newsmanager.js";
import { expandimages } from "./functions.js";
import { loadStyle, rgbToHex, Colors, Reset } from "./settings.js";

var elements = {
    other: ["BG", "HWFR", "TAS", "TES"],
    text: ["TEX", "e"]
}

const preview = document.querySelector('.news-images-added');
const input = document.querySelector('.upload-image');

export var posts = [{
    text:"error",
    head:"error",
    date:"error",
    author:"error"
}];

if(document.querySelector('.newsManager')){
    document.querySelector('.newsManager').addEventListener('click', () => {
        open('newsmanager', '_top')
    });
}

loadPOSTS();
renderPosts();

export function savePOSTS(){
    const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://agimn.online/api/posts.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-api-key", "rasp0va51k");
    
        const data = JSON.stringify(posts);
    
        xhr.send(data);
}

export function loadPOSTS(){
    const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://agimn.online/api/posts.php", true);
        xhr.setRequestHeader("x-api-key", "rasp0va51k");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                posts = JSON.parse(xhr.responseText);
                renderPosts();
            }
        };
        xhr.send();
    if (posts == null){
        posts = [{
            text:"error",
            head:"error",
            date:"error",
            author:"error"
        }]
    }
}

function renderPosts(){
    var html = '';
    posts.forEach((post, index) => {
        if(post.text !== "error"){
            html += `
                <div class="news-item TAS" id="news-item${index}">
                    <div class="news-images" id="images${index}">
                        post.head
                    </div>
                    <p class="news-text TES TEX">${post.text}</p>
                    <div class="news-date TES TEX">${post.date}</div>
                    <div class="news-author TES TEX">${post.author}</div>
                </div>`
        }
        setTimeout(() => {
            renderImages(post, index);
        }, 100);
    });
    if(document.querySelector('.news')){
        document.querySelector('.news').innerHTML = html;
    }
    elements.other.forEach((other) => {loadStyle(other, false)});
    elements.text.forEach((text) => {loadStyle(text, true)});
}

document.querySelector('.settings').addEventListener('click', () => {
    if(!document.querySelector('.settingsContainer')){
        OpenSettings();
        document.querySelector('.settingsImg').setAttribute('src', "/public/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg");
        document.querySelector('.settings').setAttribute('style', "border-color:yellow;");
    }
    else{
        CloseSettings();
        document.querySelector('.settingsImg').setAttribute('src', "/public/icons/settings.svg");
        document.querySelector('.settings').setAttribute('style', "");
    }
});

function OpenSettings(){
    var settingsContainer = document.createElement("DIV");
    document.body.append(settingsContainer);
    settingsContainer.setAttribute("class", "settingsContainer");
    settingsContainer = document.querySelector('.settingsContainer');
    settingsContainer.innerHTML = `<div class="settingsGroup groupOther"></div>
    <div class="settingsGroup groupText"></div>
    <div class="resetButton"><img class="settingsImg" src="/public/icons/reset.svg"></div>`; 
    document.querySelector('.resetButton').addEventListener('click', () => {
        elements.other.forEach((other) => {Reset(other, "", false)});
        elements.text.forEach((text) => {Reset(text, "", true)});
    });
    var otherGroup = document.querySelector('.groupOther');
    var textGroup = document.querySelector('.groupText');
    elements.other.forEach((other) => {
        otherGroup.innerHTML += `<div class="icon-settings"><div class="task-icon task-${other} ${other}"></div><input type="color" class="customColor color${other}"></div>`;
    });
    elements.other.forEach((other) => {Colors(other, false)});
    elements.text.forEach((text) => {
        textGroup.innerHTML += `<div class="icon-settings"><div class="task-icon task-${text} ${text}"></div><input type="color" class="customColor color${text}"></div>`;
    });
    elements.text.forEach((text) => {Colors(text, true)});
}

function CloseSettings(){
    document.querySelector('.settingsContainer').classList.add('settingsContainerRemove');
    setTimeout(() => {document.querySelector('.settingsContainer').remove();}, 900);
}