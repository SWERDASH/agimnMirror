import { renderTasks } from "./tasks.js";
import { Colors, Reset, loadStyle, rgbToHex } from "./settings.js";
import { expandimages } from "./functions.js";

if(document.querySelector('.date-choose') && document.querySelectorAll('.custom-select')){
    document.querySelector('.date-choose').addEventListener('change', () => {
        renderTasks();
    });
    document.querySelectorAll('.custom-select').forEach((bt) => {
        bt.addEventListener('click', () =>{
            renderTasks();
        })
    });
}


export var elements = {
    name: ["Математика", "Русский", "Литература", "Английский", "Физика", "Химия", "История", "Общество", "География", "Биология", "Педагогика", "Информатика", "Раб_с_текстом", "ОБЗР"],
    Tasktype: ["type-1", "type-2", "type-3"],
    other: ["BG", "HWFR", "FEB", "DATE", "TAS", "TES"],
    text: ["TEX", "e"]
}


document.querySelector('.settings').addEventListener('click', () => {
    if(!document.querySelector('.settingsContainer')){
        OpenSettings();
        document.querySelector('.settingsImg').setAttribute('src', "/public/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg");
        document.querySelector('.settings').setAttribute('style', "border-color:yellow");
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
    settingsContainer.innerHTML = `<div class="settingsGroup groupSubjectIcons"></div>
    <div class="settingsGroup groupTypeIcons"></div>
    <div class="settingsGroup groupOther"></div>
    <div class="settingsGroup groupText"></div>
    <div class="resetButton"><img class="settingsImg" src="/public/icons/reset.svg"></div>`; 
    document.querySelector('.resetButton').addEventListener('click', () => {
        elements.name.forEach((name) => {Reset(name, rgbToHex(255, 255, 255), false)});
        elements.Tasktype.forEach((Tasktype) => {Reset(Tasktype, rgbToHex(255, 255, 255), false)});
        elements.other.forEach((other) => {Reset(other, "", false)});
        elements.text.forEach((text) => {Reset(text, "", true)});
    });
    var typeGroup = document.querySelector('.groupTypeIcons');
    var subjGroup = document.querySelector('.groupSubjectIcons');
    var otherGroup = document.querySelector('.groupOther');
    var textGroup = document.querySelector('.groupText');
    elements.name.forEach((name) => {
        subjGroup.innerHTML += `<div class="icon-settings"><div class="task-icon task-${name} ${name}" style="mask-image: url(/public/icons/${name}.svg);"></div><input type="color" class="customColor color${name}"></div>`;
    });
    elements.name.forEach((name) => {Colors(name, false);});
    elements.Tasktype.forEach((Tasktype, index) => {
        typeGroup.innerHTML += `<div class="icon-settings"><div class="type-icon task-${index + 1} ${Tasktype}" style="mask-image: url(/public/icons/${index+1}.svg);"></div><input type="color" class="customColor color${Tasktype}"></div>`;
    });
    elements.Tasktype.forEach((Tasktype) => {Colors(Tasktype, false)});
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
