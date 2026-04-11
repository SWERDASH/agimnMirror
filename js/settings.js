export function loadStyle(id, isText){
    var param = localStorage.getItem(id);
    if (param != null){
        if(isText){
            document.querySelectorAll(`.${id}`).forEach((el) => {el.style.color = param;});
        }
        else{
            document.querySelectorAll(`.${id}`).forEach((el) => {el.style.backgroundColor = param;});
        }
    }
}

export function SaveStyle(id, param){
    localStorage.setItem(id, param);
}

export function Colors(type, isText){
    var inputColor = document.querySelector(`.color${type}`);
    if(inputColor)
    {
        if (isText){
            var BG = (document.querySelector(`.${type}`).style.color).replace(/[rgb()]/g, "").split(", ");
        }
        else{
            var BG = (document.querySelector(`.${type}`).style.backgroundColor).replace(/[rgb()]/g, "").split(", ");
        }
        inputColor.value = rgbToHex(BG[0], BG[1], BG[2]);
        inputColor.addEventListener('input', () => {
            SaveStyle(`${type}`, inputColor.value);
            loadStyle(`${type}`, isText);
        });
    }
    loadStyle(`${type}`, isText);
}

export function Reset(type, base, isText){
    if(isText){
        document.querySelectorAll(`.${type}`).forEach((el) => {el.style.color = base});
        console.log(isText);
    }
    else{
        document.querySelectorAll(`.${type}`).forEach((el) => {el.style.backgroundColor = base});
    }
    var inputColor = document.querySelector(`.color${type}`);
    inputColor.value = base;
    localStorage.removeItem(type);
}

export function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}