import { tasks, saveTasksToStorage } from "./tasks.js";
import { expandimages } from "./functions.js"; 
var logi = localStorage.getItem('login');
var parl = localStorage.getItem('parl')
let logins = ['admin', 'TaskManager', 'swerdash'];
let passwords = ['TaskAdmin', 'password', 'anim'];

if (document.querySelector('.ver')){
    document.querySelector('.ver').addEventListener('click', () => {
        verify();
    });
    setTimeout(autoVer(logi, parl), 100);
}

export let login = localStorage.getItem('login');

function autoVer(login, pass){
    let n = (element) => element == login;
    if ((logins.findIndex(n) != -1) & (pass == passwords[logins.findIndex(n)])){
        loadTaskManagerPanel(login)
    }
}

function verify(){
    login = document.querySelector('.login').value;
    let pass = document.querySelector('.password').value;
    let n = (element) => element == login;
    if ((logins.findIndex(n) != undefined) & (pass == passwords[logins.findIndex(n)])){
         loadTaskManagerPanel(login);
         localStorage.setItem('login', login);
         localStorage.setItem('parl', pass);
    }else{
        alert('Неверный логин или пароль');
    }
}

export function loadTaskManagerPanel(login){
    let newScript1 = document.createElement("script");
    newScript1.src = '/public/js/main.js';
    newScript1.type = 'module';
    let newScript2 = document.createElement("script");
    newScript2.src = '/public/js/select2.js';
    newScript2.type = 'module';
    let newScript3 = document.createElement("script");
    newScript3.src = '/public/js/tasks.js';
    newScript3.type = 'module';
    let newScript4 = document.createElement("script");
    newScript4.src = '/public/js/taskmanager.js';
    newScript4.type = 'module';
    let newScript5 = document.createElement("script");
    newScript5.src = '/public/js/select3.js';
    newScript5.type = 'module';
        document.querySelector('.page').innerHTML = `
        <div class="expanded-image"></div>
        <div class="taskframe">
            <div class="filter tskm">
                <div class="custom-select custom-tskm">
                    <select class="subjf" id="subj" title="Предмет" name="select">
                        <option id="0" src="/public/icons/subjects.svg">Предметы</option>
                        <option id="1" src="/public/icons/Математика.svg">Математика</option>
                        <option id="2" src="/public/icons/Русский.svg">Русский</option>
                        <option id="3" src="/public/icons/Литература.svg">Литература</option>
                        <option id="4" src="/public/icons/Английский.svg">Английский</option>
                        <option id="5" src="/public/icons/Физика.svg">Физика</option>
                        <option id="6" src="/public/icons/Химия.svg">Химия</option>
                        <option id="7" src="/public/icons/История.svg">История</option>
                        <option id="8" src="/public/icons/Общество.svg">Общество</option>
                        <option id="9" src="/public/icons/География.svg">География</option>
                        <option id="10" src="/public/icons/Биология.svg">Биология</option>
                        <option id="11" src="/public/icons/Педагогика.svg">Педагогика</option>
                        <option id="12" src="/public/icons/Информатика.svg">Информатика</option>
                        <option id="13" src="/public/icons/Раб_с_текстом.svg">Раб с текстом</option>
                        <option id="14" src="/public/icons/ОБЗР.svg">ОБЗР</option>
                        <option id="0" src="/public/icons/subjects.svg">Предметы</option>
                    </select>
                </div>
                <input type="date" class="date date-tskm DATE">
                <div class="custom-select custom-tskm">
                    <select class="typef" id="type" title="Не важно" name="select">
                        <option id="0" src="/public/icons/0.svg">Не важно</option>
                        <option id="1" src="/public/icons/1.svg">Устно</option>
                        <option id="2" src="/public/icons/2.svg">Письменно</option>
                        <option id="3" src="/public/icons/3.svg">Уст. пис.</option>
                        <option id="0" src="/public/icons/0.svg">Не важно</option>
                    </select>
                </div>
            </div>
            <img class="icon-url" src="/public/icons/urlk.svg">
            <textarea class="text text-input" placeholder="Задание" rows="5" cols="33"></textarea>
            <img title="Добавить задание" class="button addTask" src="/public/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">
        </div>
        <div class="taskmanager">
            <div class="filter-frame">
                    <div class="filter">
                        <div class="custom-select taskm">
                            <select class="subj" id="subjf" title="Предмет" name="select">
                                <option id="0" src="/public/icons/subjects.svg">Предметы</option>
                                <option id="1" src="/public/icons/Математика.svg">Математика</option>
                                <option id="2" src="/public/icons/Русский.svg">Русский</option>
                                <option id="3" src="/public/icons/Литература.svg">Литература</option>
                                <option id="4" src="/public/icons/Английский.svg">Английский</option>
                                <option id="5" src="/public/icons/Физика.svg">Физика</option>
                                <option id="6" src="/public/icons/Химия.svg">Химия</option>
                                <option id="7" src="/public/icons/История.svg">История</option>
                                <option id="8" src="/public/icons/Общество.svg">Общество</option>
                                <option id="9" src="/public/icons/География.svg">География</option>
                                <option id="10" src="/public/icons/Биология.svg">Биология</option>
                                <option id="11" src="/public/icons/Педагогика.svg">Педагогика</option>
                                <option id="12" src="/public/icons/Информатика.svg">Информатика</option>
                                <option id="13" src="/public/icons/Раб_с_текстом.svg">Раб с текстом</option>
                                <option id="14" src="/public/icons/ОБЗР.svg">ОБЗР</option>
                                <option id="0" src="/public/icons/subjects.svg">Предметы</option>
                            </select>
                        </div>
                        <input type="date" class="date date-choose DATE">
                        <div class="custom-select taskm">
                            <select class="type" id="typef" title="Не важно" name="select">
                                <option id="0" src="/public/icons/0.svg">Не важно</option>
                                <option id="1" src="/public/icons/1.svg">Устно</option>
                                <option id="2" src="/public/icons/2.svg">Письменно</option>
                                <option id="3" src="/public/icons/3.svg">Уст. пис.</option>
                                <option id="0" src="/public/icons/0.svg">Не важно</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="task-frame">
                    <div class="homework">
                    </div>
                </div>
        </div>
        <div class="loginNow">${login}</div>
        `;
        document.body.appendChild(newScript1);
        document.body.appendChild(newScript2);
        document.body.appendChild(newScript3);
        document.body.appendChild(newScript4);
        document.body.appendChild(newScript5);
        setTimeout(() => {
            urlButton();
            renderTaskManager(login);
        }, 250);
        document.querySelectorAll('.taskm').forEach((bt) => {
            bt.addEventListener('click', () =>{
                renderTaskManager(login);
            })
        });
        document.querySelector('.date-choose').addEventListener('change', () => {
            renderTaskManager(login);
        });
}

export function renderTaskManager(login){
    var x, t, Taskicon, Typeicon;
    x = document.getElementById('subjf');
    t = document.getElementById('typef');
    let id = parseInt(x.selectedOptions[0].id, 10);
    let date = document.querySelector('.date-choose').value;
    let type = parseInt(t.selectedOptions[0].id, 10);
    if (document.querySelector('.taskframe')){
        let output = document.querySelector('.homework');
        let outputHTML = '';
        tasks.forEach((task, index) => {
            if ((task.id === id || id === 0) 
                & (task.date === date || !date & task.dateId !== 0)
                & (task.typeId === type || type === 0)){
                Taskicon = `<div class="task-icon task-${task.name} ${task.name}" style="mask-image: url(/public/icons/${task.name}.svg);"></div>`
                Typeicon = `<div class="type-icon task-${task.typeId} type-${task.typeId}" style="mask-image: url(/public/icons/${task.typeId}.svg);"></div>`
                if((task.dateId != 0) & ((login == task.author) || (login == "swerdash"))){
                    const html = `<div id="item${index}" class="task-item  TAS">
                    <div class="task-top">
                        <div class="task-name TES TEX">${Taskicon}${task.name.replaceAll('_', ' ')}</div>
                        <div id="top${index}" class="editTools">
                            <img title="Удалить" src="/public/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="delete" id="${task.index}">
                            <img title="Редактировать" class="editT editT${index}" id="${index}" src="/public/icons/edit_note_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">
                        </div>
                    </div>
                    <pre class="task task${task.index} TES TEX">${task.task}</pre>
                    <div class="task-bottom task-bottomE">
                        <div class="task-date TES TEX">${task.date}</div>
                        <div class="task-type TES TEX">${Typeicon}${task.type}</div>
                        <div class="task-author TES TEX">${task.author}</div>
                    </div>
                        </div>`;
                    outputHTML += html
                }else{
                    if((task.dateId != 0)){
                        const html = `<div class="task-item TAS">
                        <div class="task-top">
                            <div class="task-name TES TEX">${Taskicon}${task.name.replaceAll('_', ' ')}</div>
                        </div>
                        <pre class="task task${task.index} TES TEX">${task.task}</pre>
                        <div class="task-bottom task-bottomE">
                            <div class="task-date TES TEX">${task.date}</div>
                            <div class="task-type TES TEX">${Typeicon}${task.type}</div>
                            <div class="task-author TES TEX">${task.author}</div>
                        </div>
                            </div>`;
                        
                        outputHTML += html
                    }
                }
            }
            setTimeout(() => {
                edit(task, index);
                deleter(task, index);
                expandimages(task, index);
            }, 100);
        output.innerHTML = outputHTML;
        });
    }
}

function deleter(task, index){
    if ((document.getElementById(task.index)) && (document.getElementById(task.index).getAttribute('listener') !== "true")){
        document.getElementById(task.index).setAttribute('listener', true);
        document.getElementById(task.index).addEventListener('click', () =>{
            document.getElementById(`item${index}`).classList.add('deleted-task');
            setTimeout(() => {
                tasks.splice(index, 1);
                saveTasksToStorage();
                renderTaskManager(login);
            }, 200);
        });
    }
}

function edit(task, index){
    var buttons = `<img title="Отменить изменения" src="/public/icons/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="cancel" id="${index}"> <img title="Подтвердить изменения" src="/public/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" class="conf${index} conf">`;
    if (document.querySelector(`.editT${index}`)){
        if (!(document.querySelector(`.editT${index}`).checked) && (document.querySelector(`.editT${index}`).getAttribute('listener') !== "true")){
            document.querySelector(`.editT${index}`).setAttribute('listener', true);
            document.querySelector(`.editT${index}`).addEventListener('click', () => {
                document.getElementById(task.index).setAttribute('listener', false);
                setTimeout(() => {deleter(task, index);}, 100)
                var t = `<select class="typer typer${index}" id="typef" title="Не важно" name="select">
                            <option id="1">Устно</option>
                            <option id="2">Письменно</option>
                            <option id="3">Уст. пис.</option>
                        </select>`;
                document.querySelector(`.task${task.index}`).innerHTML = '';
                document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<pre class="task task${task.index} TES TEX">${task.task}</pre>`, `<textarea class="inser ins${index}"></textarea>`)
                document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<pre class="task task${task.index} TES TEX"></pre>`, `<textarea class="inser ins${index}"></textarea>`)
                document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<div class="task-date TES TEX">${task.date}</div>`, `<input class="datechanger dater${index}" type="date">`)
                document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<div class="task-type TES TEX"><div class="type-icon task-${task.typeId} type-${task.typeId}" style="mask-image: url(/public/icons/${task.typeId}.svg);"></div>${task.type}</div>`, t);
                document.getElementById(`top${index}`).innerHTML += buttons
                document.querySelector(`.ins${index}`).value = tasks.at(index).task;
                document.querySelector(`.dater${index}`).value = tasks.at(index).date;
                document.querySelector(`.typer${index}`).value = tasks.at(index).type;
                document.getElementById(`item${index}`).classList.add('chos')
                document.querySelector(`.editT${index}`).checked = 1;
                setTimeout(() => {confirm(task, index, buttons);}, 100);
                cancel(task, index, buttons);
            });
        }
    }
}

function cancel(task, index, buttons){
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    document.querySelector('.cancel').addEventListener('click', () => {
        document.getElementById(task.index).setAttribute('listener', false);
        setTimeout(() => {deleter(task, index);}, 100)
        showCurr(task, index, buttons);
    });
    document.querySelector(`.editT${index}`).addEventListener('click', () => {
        document.getElementById(task.index).setAttribute('listener', false);
        setTimeout(() => {deleter(task, index);}, 100)
        showCurr(task, index, buttons);
    });
}

function confirm(task, index, buttons){
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    document.querySelector(`.conf${index}`).addEventListener('click', () => {
        var v = document.querySelector(`.ins${index}`).value;
        var d = document.querySelector(`.dater${index}`).value;
        var t = document.querySelector(`.typer${index}`).value;
        var ti = parseInt(document.querySelector(`.typer${index}`).selectedOptions[0].id, 10);
        if (document.querySelector(`.editT${index}`).checked){
            tasks.at(index).task = v;
            tasks.at(index).date = d;
            tasks.at(index).type = t;
            tasks.at(index).typeId = ti;
            document.getElementById(task.index).setAttribute('listener', false);
            saveTasksToStorage();
            showCurr(task, index, buttons);
        }
    });
}

function showCurr(task, index, buttons){
    document.getElementById(`item${index}`).classList.remove('chos')
    document.querySelector(`.editT${index}`).setAttribute('listener', false);
    setTimeout(() => {deleter(task, index);}, 100)
    var t = `<select class="typer typer${index}" id="typef" title="Не важно" name="select">
                            <option id="1">Устно</option>
                            <option id="2">Письменно</option>
                            <option id="3">Уст. пис.</option>
                        </select>`;
    document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<textarea class="inser ins${index}"></textarea>`, `<pre class="task task${task.index} TES TEX">${task.task}</pre>`)
    document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(`<input class="datechanger dater${index}" type="date">`, `<div class="task-date TES TEX">${task.date}</div>`)
    document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(t, `<div class="task-type TES TEX"><div class="type-icon task-${task.typeId} type-${task.typeId}" style="mask-image: url(/public/icons/${task.typeId}.svg);"></div>${task.type}</div>`)
    document.getElementById(`item${index}`).innerHTML = document.getElementById(`item${index}`).innerHTML.replace(buttons, '');
    document.querySelector(`.editT${index}`).checked = 0;
    expandimages(task, index);
    edit(task, index);
}

function getSelectedText(){
    let text = '';
    let start;
    let end;
    let posX = window.event.clientX;
    let posY = window.event.clientY;
    const j = document.createElement("DIV");
    const url = document.createElement("textarea");
    const but = document.createElement("button");
    if (window.getSelection){
        text = window.getSelection().toString();
        start = window.getSelection().getRangeAt(0).startOffset;
        end = window.getSelection().getRangeAt(0).endOffset;
    } else if (document.selection && document.selection.type != "Control"){
        text = window.selection.createRange().text;
        start = window.getSelection().getRangeAt(0).startOffset;
        end = window.getSelection().getRangeAt(0).endOffset;
    }
    if (text.toString() != '' && true){
        if (j){
            console.log(text)
            console.log(`[${posX}, ${posY}]`)
            j.setAttribute('class', 'can');
            document.body.appendChild(j);
            url.setAttribute('class', 'urls');
            but.setAttribute('class', 'accept');
            but.innerHTML = '✅'
            j.appendChild(url);
            j.appendChild(but);
            j.setAttribute('style', `transform: translate(${posX - 25}px, ${posY - 125}px)`);
            but.addEventListener('click', () => {accept(url.value, text, start, end)});
            document.querySelector('.text-input').addEventListener('click', DelView);
        }
    }
}

function accept(url, text, start, end){
    const edit = document.querySelector('.text-input');
    console.log(`url added ${url}`)
    edit.innerHTML = replaceUrl(edit.innerHTML, start, end, `<a target="_blank" class="url" href="${url}">${text}</a>`)
}

function DelView(){
    const j = document.querySelector('.can');
    if(document.body.hasChildNodes(j)){
        try{
            document.body.removeChild(j);
            document.querySelector('.text-input').removeEventListener('contextmenu', DelView)
        } catch {
            console.log("node doesn't exist");
        }
    }
}

function urlButton(){
    var isActive = false;
    document.querySelector('.icon-url').addEventListener('click', () => {
        if (!isActive){
            isActive = true
            const text = document.querySelector('.text-input').value;
            document.querySelector('.taskframe').removeChild(document.querySelector('.text-input'))
            var textBox = document.createElement("DIV")
            document.querySelector('.taskframe').appendChild(textBox)
            textBox.setAttribute('class', "text-input text")
            textBox.innerHTML = text
            document.querySelector('.text-input').addEventListener('contextmenu', () => {getSelectedText()});
        }else{
            isActive = false;
            const text = document.querySelector('.text-input').innerHTML;
            document.querySelector('.taskframe').removeChild(document.querySelector('.text-input'))
            var textBox = document.createElement("TEXTAREA")
            document.querySelector('.taskframe').appendChild(textBox)
            textBox.setAttribute('class', "text-input text")
            textBox.value = text
            document.querySelector('.text-input').addEventListener('contextmenu', () => {getSelectedText()});
        }
    });
}

function replaceUrl(textReplace, start, end, replace){
    const first = textReplace.slice(0, start);
    const last = textReplace.slice(end);
    return first + replace + last;
}
