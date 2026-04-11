import { loadStyle, rgbToHex, Colors, Reset } from "./settings.js";

var elements = ["BG", "HW", "D", "N"];
elements.forEach((name) => {loadStyle(name);});

document.querySelector('.settings').addEventListener('click', () => {
    if(!document.querySelector('.settingsContainer')){
        OpenSettings();
        document.querySelector('.settingsImg').setAttribute('src', "/agimnMirror/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg");
        document.querySelector('.settings').setAttribute('style', "border-color:yellow;");
    }
    else{
        CloseSettings();
        document.querySelector('.settingsImg').setAttribute('src', "/agimnMirror/icons/settings.svg");
        document.querySelector('.settings').setAttribute('style', "");
    }
});

function OpenSettings(){
    var settingsContainer = document.createElement("DIV");
    var resetButton = document.createElement("DIV");
    document.body.append(settingsContainer);
    document.querySelector('.upperButtons').append(resetButton);
    settingsContainer.setAttribute("class", "settingsContainer");
    resetButton.setAttribute("class", "resetButton");
    settingsContainer = document.querySelector('.settingsContainer');
    document.querySelector('.resetButton').innerHTML = `<img class="settingsImg" src="/agimnMirror/icons/reset.svg">`;
    document.querySelector('.resetButton').addEventListener('click', () => {
        elements.filter((word) => word != "BG").forEach((name) => {Reset(name, rgbToHex(230, 230, 230), false);});
        Reset("BG", rgbToHex(0, 0, 0), false);
    });
    elements.forEach((name) => {
        settingsContainer.innerHTML += `<input type="color" class="customColor color${name}">`
    });
    elements.forEach((name) => {Colors(name, false)});
}

function CloseSettings(){
    document.querySelector('.settingsContainer').classList.add('settingsContainerRemove');
    document.querySelector('.resetButton').remove();
    setTimeout(() => {document.querySelector('.settingsContainer').remove();}, 900);
}

function MakeAnnounce(title, text, buttonText){
    const announce = document.createElement("DIV");
    announce.setAttribute("class", "announcementFrame");
    announce.innerHTML = `
    <div class="announceTitle">${title}</div>
    <div class="announceText">${text}</div>
    <div class="announceButton">${buttonText}</div>
    `
    document.body.appendChild(announce)
    document.querySelector('.announceButton').addEventListener("click", () => {
        startExcursion();
    });
    document.body.addEventListener("click", () => {
        document.body.removeChild(announce);
    });
}

function startExcursion(){
    const excursionFog = document.createElement("DIV");
    excursionFog.setAttribute("class", "excursionFog");
    document.querySelector('.settings').classList.add("excursion");
    document.body.appendChild(excursionFog);
    document.querySelector('.excursionFog').innerHTML += "<div class='excursion-text'>Добавлена более гибкая настройка</div>";
    document.querySelector('.settings').addEventListener('click', () => {
        if(document.querySelector('.excursion-text').innerHTML == "Добавлена более гибкая настройка"){
            document.querySelector('.excursion-text').innerHTML = "Нажав на элемент, вы можете выбрать его цвет";
            document.querySelectorAll('.customColor').forEach((custom) => {
                custom.addEventListener('change', () => {
                    document.querySelector('.excursion-text').innerHTML = "↑ Нажмите, чтобы закрыть настройки, или на кнопку рядом, чтобы сбросить цвета";
            });
        });
        }
        else{
            stageTwo();
        }
    });
}

function stageTwo(){
    document.querySelector('.settings').classList.remove("excursion");
    document.querySelector('.review').classList.add("excursion");
    document.querySelector('.excursion-text').style.textAlign = "center";
    document.querySelector('.excursion-text').style.marginTop = "15px";
    document.querySelector('.excursion-text').innerHTML = "Также появилась возможность оставить отзыв";
}
