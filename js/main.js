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
        open("/homepage.html", "_top");
    });
};

if (document.querySelector('.daily')){
    document.querySelector('.daily').addEventListener('click', () => {
        daily();
    });
};

if (document.querySelector('.ht')){
    document.querySelector('.ht').addEventListener('click', () => {
        open("/hometask.html", "_top");
    });
};

if (document.querySelector('.news-page')){
    document.querySelector('.news-page').addEventListener('click', () => {
        open("/news.html", "_top");
    });
};
  
  
