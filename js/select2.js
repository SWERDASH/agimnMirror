
var x, i, j, l, ll, selElmnt, a, b, c, icon;
x = document.getElementsByClassName("custom-tskm");
l = x.length;
for (i = 0; i < l; i++) {
    if(x[i].getElementsByClassName("subjf")[0]){
      selElmnt = x[i].getElementsByClassName("subjf")[0];
      icon = `<img class='task-choose-icon' src="${selElmnt.selectedOptions[i].getAttribute('src')}">`
    }
    else{
      selElmnt = x[i].getElementsByClassName("typef")[0];
      icon = `<img class='task-choose-icon' src="${selElmnt.options[i-1].getAttribute('src')}">`
    }
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected tskm-selected FEB");
    a.innerHTML = icon + selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide tskm-items FEB");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      icon = `<img class='task-choose-icon' src="${selElmnt.options[j].getAttribute("src")}">`;
      c.innerHTML = icon + selElmnt.options[j].innerHTML;
      c.setAttribute("class", "opti")
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          if(this.parentNode.parentNode.getElementsByClassName("subjf")[0]){
            s = this.parentNode.parentNode.getElementsByClassName("subjf")[0];
          }
          else{
            s = this.parentNode.parentNode.getElementsByClassName("typef")[0];
          }
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            icon = `<img class="task-choose-icon" src="${s[i].getAttribute('src')}">`;
            if (icon + s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

  import { addTask } from "./tasks.js";

  document.querySelector('.addTask').addEventListener('click', () => {
    addTask();
  });