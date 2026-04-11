let themes;
//Переключение темы
export function themeSwitcher(){
    if (themes == 0){
        themes = 1;
    }
    else{
        themes = 0;
    }
    saveToStorage();
}

export function themeSwitch(){
    if (document.querySelector(".themeSwitch")){
        if (themes == 0){
        document.querySelector('html').classList.add('theme-inv');
        document.querySelector('.themeSwitch').innerHTML = '<img class="themeImg" src="/agimnMirror/icons/light_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">';
        }
        else {
            document.querySelector('html').classList.remove('theme-inv');
            document.querySelector('.themeSwitch').innerHTML = '<img class="themeImg" src="/agimnMirror/icons/dark_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg">';
        }
    }  
}

export function loadFromStorage(){
    themes = localStorage.getItem('themes');
    if (!themes){
        themes = 1;
    }
}

export function saveToStorage(){
    localStorage.setItem('themes', themes);
}
//Расписание
export function daily(){
    const date = new Date();
    const time = date.getHours() + 5;
    var den = date.getDate();
    var wek = date.getDay(date.setDate(den));
    var mes = date.getMonth();
    var god = date.getFullYear();
    var dayw = "";
    var month = "";
    if (!(wek == 6 || wek == 7) & (parseInt(time, 10) >= 12)){
        den = date.getDate(date.setDate(den + 1));
        wek = date.getDay(date.getDate(wek));
        mes = date.getMonth(date.getDate(mes));
    }
    switch(wek){
        case 1:
            dayw = "ponedelnik";
            break;
        case 2:
            dayw = "vtornik";
            break;
        case 3:
            dayw = "sreda";
            break;
        case 4:
            dayw = "chetverg";
            break;
        case 5:
            dayw = "piatnitsa";
            break;
        case 6:
            while (wek != 1){
                den = date.getDate(date.setDate(den + 1));
                wek = date.getDay(date.getDate(wek));
                mes = date.getMonth(date.getDate(mes));
                console.log(wek);
            }
        case 7:
            while (wek != 1){
                den = date.getDate(date.setDate(den + 1));
                wek = date.getDay(date.getDate(wek));
                mes = date.getMonth(date.getDate(mes));
                console.log(wek);
            }
        default:
            while (wek != 1){
                den = date.getDate(date.setDate(den + 1));
                wek = date.getDay(date.getDate(wek));
                mes = date.getMonth(date.getDate(mes));
                console.log(wek);
            }
            dayw = "ponedelnik";
    }
    switch(mes){
        case 0:
            month = "ianvaria";
            break;
        case 1:
            month = "fevralia";
            break;
        case 2:
            month = "marta";
            break;
        case 3:
            month = "aprelia";
            break;
        case 4:
            month = "maia";
            break;
        case 8:
            month = "sentiabria";
            break;
        case 9:
            month = "oktiabria";
            break;
        case 10:
            month = "noiabria";
            break;
        case 11:
            month = "dekabria";
            break;
    }
    var url = `https://gimn25.eduface.ru/uploads/62400/62391/section/2192375/${den}_${month}_${god}_goda__${dayw}_.pdf`;
    open(url, "_blank");
};

export function expandimages(task, index){
    var xs;
    if (document.querySelector('.e')){
        document.querySelectorAll('.e').forEach((b, index) => {
            if (b.getAttribute('id') == null){
                if (task.postI == 1){
                    task.head.forEach((image, indexx) => {
                        if (b.getAttribute('id') != `e${indexx-1}`){
                            b.setAttribute('id', `e${indexx}`)
                            xs = document.getElementById(`e${indexx}`);
                            applyexp(xs);
                        }
                    })
                }else{
                    b.setAttribute('id', `e${index}`);
                    xs = document.getElementById(`e${index}`);
                    applyexp(xs);
                }
            }
        })
    }
}
function applyexp(xs){
    if (xs != null){    
        if(xs.getAttribute('listener') != "True"){
            xs.setAttribute('listener', "True")
            xs.addEventListener('click', () => {
                document.querySelector('.expanded-image').innerHTML = `<img class="ExpI" src="${xs.getAttribute('src')}">`
                document.querySelector('.expanded-image').classList.add('expands');
                setTimeout(() => {
                    document.querySelector('.expanded-image').addEventListener('click', () => {
                        xs.setAttribute('listener', "False")
                        document.querySelector('.expanded-image').innerHTML = '';
                        document.querySelector('.expanded-image').classList.remove('expands');
                    });
                }, 100);
            });
        }
    }
}
