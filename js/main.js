import { loadFromStorage, themeSwitch, themeSwitcher, daily} from './functions.js';
loadFromStorage();
themeSwitch();
if(document.querySelector(".themeSwitch")){
    document.querySelector('.themeSwitch').addEventListener('click', () => {
            themeSwitcher();
            themeSwitch();
    });
} 

if (document.querySelector('.mainBack')){
document.querySelector('.mainBack').addEventListener('click', () => {
        open("/agimnMirror/homepage.html", "_top");
    });
};

if (document.querySelector('.daily')){
    document.querySelector('.daily').addEventListener('click', () => {
        daily();
    });
};

if (document.querySelector('.ht')){
    document.querySelector('.ht').addEventListener('click', () => {
        open("/agimnMirror/hometask.html", "_top");
    });
};

if (document.querySelector('.news-page')){
    document.querySelector('.news-page').addEventListener('click', () => {
        open("/agimnMirror/news.html", "_top");
    });
};

function formD(x=String){
    var s = ""
    if(5 <= parseInt(String(x).at(-1)) && parseInt(String(x).at(-1)) <= 9){
        s = "Дней"
    }
    if(String(x).endsWith("1") && x != "11"){
        s = "День"
    }
    if(String(x).at(0) != "1" && (1 < parseInt(String(x).at(-1)) && parseInt(String(x).at(-1)) <= 4) && String(x).length > 1){
        s = "Дня"
    }
    return s
}

function zeroFormat(x){
    if (String(x)[0] != "0" && String(x).length < 2){
        return `0${x}`
    }else{
        return x
    }
}
function timeDelta( start, end, params, only_totals ) {

    var delta = {}
      , measurements = {
            w: 604800000,
            d: 86400000,
            h: 3600000,
            m: 60000,
            s: 1000
            }
      , flags = params || 'wdhms'
    ;//var

    delta.ttl = delta.ms = Math.abs( end.getTime() - start.getTime() );

    // do caclulations for each flag
    for( var i = 0; i < flags.length; i++ ) {
        delta[ flags[i] ] = delta.ms / measurements[ flags[i] ];
        // unless totals are specified,
        // value is broken down into components
        if( !only_totals ) {
            delta[ flags[i] ] = Math.floor( delta[ flags[i] ] );
            delta.ms -= delta[ flags[i] ] * measurements[ flags[i] ];
        }
    };
    
    return delta;
}
function setTime(timer){
    var now = new Date()
    var until = new Date("2026-06-04T00:00:00Z")
    var still = timeDelta(now, until, "dhms", 0)
    timer.innerHTML = `До ЕГЭ по русскому: ${still.d} ${formD(still.d)}, ${zeroFormat(still.h)}:${zeroFormat(still.m)}:${zeroFormat(still.s)}`
    setTimeout(() =>{setTime(timer)}, 500)
}

if (document.querySelector(".upperButtons")){
    var timer = document.createElement("DIV")
    timer.setAttribute("class", "timer")
    document.querySelector(".upperButtons").append(timer)
    setTime(timer)
}
