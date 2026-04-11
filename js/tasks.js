import { renderTaskManager, login } from "./taskmanager.js";
import { loadStyle } from "./settings.js";
import { elements } from "./hometaskpage.js";
import { expandimages } from "./functions.js";

export let tasks = [];
var checkeds = [];
loadTasksFromStorage();

export function saveTasksToStorage(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://agimn.online/api/save.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", "rasp0va51k");

    const data = JSON.stringify(tasks);

    xhr.send(data);
}

export function loadTasksFromStorage(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://agimn.online/api/save.php", true);
    xhr.setRequestHeader("x-api-key", "rasp0va51k");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            tasks = JSON.parse(xhr.responseText);
            renderTasks();
            const urlParams = new URLSearchParams(window.location.search);
            const isFocused = urlParams.get('isFocused') == "True"
            const focusedTask = parseInt(urlParams.get('task'),10)
            const MovePos = document.querySelector(`.taskID${focusedTask}`).getBoundingClientRect().top - window.outerHeight/4
            if (isFocused){
                window.scrollTo({top: MovePos, behavior:"smooth"})
                setTimeout(()=> {document.querySelector(`.taskID${focusedTask}`).classList.add('focused')}, 500)
            }
        }
        else{
            document.querySelector('.homework').innerHTML = `
            <div class="placeHolder">
                <div class="error"></div>
                Простите, но сервер не ответил. Попробуйте снова.    
            </div>
            `
        }
    };
    xhr.send();
}

export function isDuplicate(itemINFO, itemID, itemDATE, itemTYPE){
    var dubl = 1;
    tasks.forEach((task) => {
        if ((task.task === itemINFO) & (task.id === itemID) & (task.date === itemDATE) & (task.typeId === itemTYPE)){
            dubl = 0;
        } else { dubl = 1; }
    });
    return dubl;
}

export function addTask(){
    var x, t, taskinfo;
    x = document.getElementById('subj');
    t = document.getElementById('type');
    taskinfo = document.querySelector('.text').value;
    console.log(taskinfo)
    if (taskinfo == undefined){
        taskinfo = document.querySelector('.text').innerHTML;
    }
    let date = document.querySelector('.date').value;
    let id = parseInt(x.selectedOptions[0].id, 10);
    let typeId = parseInt(t.selectedOptions[0].id, 10);
    let name = '';
    let type = '';
    switch(id){
        case 1:
            name = "Математика";
            break;
        case 2:
            name = "Русский";
            break;
        case 3:
            name = "Литература";
            break;
        case 4:
            name = "Английский";
            break;
        case 5:
            name = "Физика";
            break;
        case 6:
            name = "Химия";
            break;
        case 7:
            name = "История";
            break;
        case 8:
            name = "Общество";
            break;
        case 9:
            name = "География";
            break;
        case 10:
            name = "Биология";
            break;
        case 11:
            name = "Педагогика";
            break;
        case 12:
            name = "Информатика";
            break;
        case 13:
            name = "Раб_с_текстом";
            break;
        case 14:
            name = "ОБЗР";
            break;
    }
    switch(typeId){
        case 1:
            type = "Устно";
            break;
        case 2:
            type = "Письменно";
            break;
        case 3:
            type = "Уст. пис.";
            break;
    }
    if ((id != 0) & (date.length != 0) & (taskinfo.length != 0) & (type.length != 0)){
        console.log(id, date, type, taskinfo);
        console.log(isDuplicate(taskinfo, id, date, typeId));
        if (isDuplicate(taskinfo, id, date, typeId)){
                tasks.push({
                    index: Math.floor(Math.random() * 999999),
                    id: id,
                    typeId: typeId,
                    name: name,
                    task: taskinfo,
                    date: date,
                    type: type,
                    author: login
                });
                alert(`
                    Задание добавлено: 
                    ${name} 
                    ${date} 
                    ${type} 
                    ${taskinfo}
                    `);
                    console.log(`added ${id} ${date} ${type} ${taskinfo}`);
                    saveTasksToStorage();
                    renderTaskManager(login);
            } else{
                alert('Дубликат');
            }
    } else {
        alert('Укажите всю информацию');
    }
}
var reactionsAvaible = [
    "/public/reactions/oh.png",
    "/public/reactions/aga.png",
    "/public/reactions/buh.gif",
    "/public/reactions/catkiss.gif",
    "/public/reactions/NOOOO.gif",
    "/public/reactions/taah.gif",
    "https://cdn.7tv.app/emote/01FFWH9WV80000JT8GHDKHJNZC/4x.gif",
    "https://cdn.7tv.app/emote/01HMMNVPF80000JD9H290NVA3C/4x.gif",
    "https://cdn.7tv.app/emote/01G9TPSGDG000AGTWTH4BHTCTY/4x.gif",
    "https://cdn.7tv.app/emote/01GAZMM0SR00054XE34QYRVAZG/4x.gif",
    "https://cdn.7tv.app/emote/01H8H7MN4800026Q8KSZWQ30VS/4x.gif",
    "https://cdn.7tv.app/emote/01FFJYQM4G0009CAK0J1468WQN/4x.gif",
    "https://cdn.7tv.app/emote/01F6W8904G0008ZF14F6H9W2RD/4x.gif",
    "https://cdn.7tv.app/emote/01HAW25R200005HE0A9M4Z18RC/4x.png",
    "https://cdn.7tv.app/emote/01GA9PTTXG0008XHFRJVH0QGND/4x.gif"
    ]
export function renderTasks(){
    var x, t, Taskicon, Typeicon;
    x = document.getElementById('subj');
    t = document.getElementById('type');
    let id = parseInt(x.selectedOptions[0].id, 10);
    let date = document.querySelector('.date').value;
    let type = parseInt(t.selectedOptions[0].id, 10);
    let output = document.querySelector('.homework');
    let outputHTML = '';
    console.log(id, date, type);
    tasks.forEach((task, index) => {
        var reactioned = ''
        if (task.reactions){
            task.reactions.forEach((ele, indexs) => {
                if (ele.COUNT != 0){
                    reactioned += `<div class="react_box">${ele.COUNT}<img class="reaction" id="react${ele.ID}${task.index}" src='${reactionsAvaible[ele.ID]}'></div>`
                }
            });
        }
        Taskicon = `<div class="task-icon task-${task.name} ${task.name}" style="mask-image: url(/public/icons/${task.name}.svg);"></div>`
        Typeicon = `<div class="type-icon task-${task.typeId} type-${task.typeId}" style="mask-image: url(/public/icons/${task.typeId}.svg);"></div>`
        if ((task.id === id || id === 0) 
        & (task.date === date || !date & task.dateId !== 0)
        & (task.typeId === type || type === 0)){
            outputHTML += `<div class="task-item TAS ${task.author} taskID${task.index}" id='task-item${index}' >
                        <div class="task-top">
                            <div class="task-name TES TEX">${Taskicon}${task.name.replaceAll('_', ' ')}</div>
                            <div class="reactB" id="reactB${index}" style="mask-image: url(/public/icons/react.svg);"></div>
                        </div>
                        <pre class="task TES TEX">${task.task}</pre>
                        <div class="task-bottom">
                            <div class="task-date TES TEX">${task.date}</div>
                            <div class="task-type TES TEX">${Typeicon}${task.type}</div>
                            <input class="task-check" type="checkbox" id="${task.index}">
                            <div class="copy" id="copy${task.index}" style="mask-image: url(/public/icons/copy.svg);"></div>
                        </div>
                        <div class="reaction-space">${reactioned}</div>
                            </div>`;
        }
        setTimeout(() => { 
            if(document.getElementById(task.index)){
                document.getElementById(task.index).addEventListener("click", () => saveChecked(task));
                loadChecked(task);
                expandimages(task, index);
            }
        }, 100);
        });
    output.innerHTML = outputHTML;
    elements.name.forEach((name) => {loadStyle(name, false);});
    elements.Tasktype.forEach((Tasktype) => {loadStyle(Tasktype, false);});
    elements.other.forEach((other) => {loadStyle(other, false)});
    elements.text.forEach((text) => {loadStyle(text, true)});
    tasks.forEach((task, index) => {
        if(document.getElementById(`reactB${index}`)){
            document.getElementById(`reactB${index}`).onclick = function(){
                reactionWindow(task, task.index);
            };
        }
        if(task.reacted){
            task.reactions.forEach((ele, indexs) => {
                if(document.getElementById(`react${ele.ID}${task.index}`)){
                    document.getElementById(`react${ele.ID}${task.index}`).onclick = function() {addReaction(ele.ID, task)}
                }
            });
        }
        if(document.getElementById(`copy${task.index}`)){
            document.getElementById(`copy${task.index}`).onclick = function(){
                navigator.clipboard.writeText(`https://agimn.ru/hometask?isFocused=True&task=${task.index}`)
            };
        }
    })
}

function reactionWindow(el, index){
    var reactionList = document.createElement('DIV');
    var PosX = window.event.clientX;
    var PosY = window.event.clientY;
    reactionList.style.right = `${PosX/4}px`
    reactionList.style.top = `${PosY}px`
    reactionList.setAttribute('class', 'reactionList');
    reactionsAvaible.forEach((reaction, indexs) => {
        reactionList.innerHTML += `<img class="reaction" id="reactID${indexs}${index}" src=${reaction}>`
    });
    document.body.appendChild(reactionList);
    setTimeout( () => {
        document.body.onclick = function () {DelView(reactionList)};
        reactionList.childNodes.forEach((ele, indexs) => {
        document.getElementById(`reactID${indexs}${index}`).addEventListener('click', () => {
                addReaction(indexs, el);
            });
        });
    }, 100);
}

function addReaction(reactID, el){
    if (!el.reactions){
        el.reactions = [{
            ID: reactID,
            COUNT: 1
        }]
        el.reacted = [reactID]
        localStorage.setItem(`react${reactID}${el.index}`, 1);
    }
    else{
        if(el.reacted.indexOf(reactID) != -1){
            if(localStorage.getItem(`react${reactID}${el.index}`) == 1){
                el.reactions[el.reacted.indexOf(reactID)].COUNT--;
                localStorage.setItem(`react${reactID}${el.index}`, undefined);
            }else{
                el.reactions[el.reacted.indexOf(reactID)].COUNT++;
                localStorage.setItem(`react${reactID}${el.index}`, 1);
                console.log(localStorage.getItem(`react${reactID}${el.index}`))
            }
        }else{
            el.reactions.push({
                ID: reactID,
                COUNT: 1
            })
            el.reacted.push(reactID)
            localStorage.setItem(`react${reactID}${el.index}`, 1);
        }
    }
    saveTasksToStorage(tasks)
    renderTasks()
}

function DelView(el){
    if(document.body.hasChildNodes(el)){
        try{
            document.body.removeChild(el);
        } catch {
            console.log("node doesn't exist");
        }
    }
}

checkeds = [];
function saveChecked(task){
    var checked = document.getElementById(task.index).checked;
    checkeds.push({
        checked: checked,
        task: task.index
    });
    localStorage.setItem('checked', JSON.stringify(checkeds));
}
function loadChecked(task){
    if(localStorage.getItem('checked')){
        checkeds = JSON.parse(localStorage.getItem('checked'));
        checkeds.forEach((checkeds) => {
            if (task.index == checkeds.task){
                document.getElementById(task.index).checked = ((checkeds.checked));
            }
        });
    }
}