var reviews = [];

loadStorageReviews();

function loadStorageReviews(){
    const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://agimn.online/api/reviews.php", true);
        xhr.setRequestHeader("x-api-key", "rasp0va51k");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                reviews = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
}

function saveReviews(){
    const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://agimn.online/api/reviews.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-api-key", "rasp0va51k");
    
        const data = JSON.stringify(reviews);
    
        xhr.send(data);
        var text = reviews;
        console.log(text);
        fetch('https://localhost:8000/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({items: text})
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
            alert('Отзыв отправлен!');
            } else {
            alert('ОБРАТИСЬ К АДМИНУ(@SWERDASH) Ошибка: ' + data.error);
            }
        });
}


var elements = ["Look", "UserFr", "GenImp"];
var rating = [{}];
rating.pop(-1);
elements.forEach((el, elIndex) => {
    rating.push({category: el, rate: 1});
    var x = document.querySelector(`.${el}`);
    var y = document.querySelector(`.rate-${el}`);
    var rate = '';
        for(var i = 1; i < 6; i++){
            rate += `<img class="star star-${i}" id="${el}-${i}" src="/public/icons/star.svg">`;
        }
        y.innerHTML = ` ${rate}`;
        y.childNodes.forEach((star, index) => {
            if(document.getElementById(`${el}-${index}`)){
                document.getElementById(`${el}-${index}`).classList.add('star-unsel');
                document.getElementById(`${el}-${1}`).classList.add('star-selected');
            }
            star.addEventListener("mouseover", () => {
                for(var i = 0; i < index; i++){
                    document.getElementById(`${el}-${index-i}`).classList.add('star-sel');
                    if(document.getElementById(`${el}-${index+i+1}`)){
                        document.getElementById(`${el}-${index+i+1}`).classList.remove('star-sel');
                    }
                }
            });
            star.addEventListener('mouseout', () => {
                for(var i = 0; i < index; i++){
                    document.getElementById(`${el}-${index-i}`).classList.remove('star-sel');
                }
            });
            star.addEventListener('click', () => {
                rating.category = el;
                for(var i = 0; i < index; i++){
                    document.getElementById(`${el}-${index-i}`).classList.add('star-selected');
                    for(var v = 1; document.getElementById(`${el}-${index+v}`) && document.getElementById(`${el}-${index+v}`).classList.contains('star-selected'); v++){
                        document.getElementById(`${el}-${index+v}`).classList.remove('star-selected');
                    }
                }
                ReviewRate(rating, index, elIndex);
            });
        });
});

function ReviewRate(rating, value, id){
    rating[id].rate = value;
    var summary = rating[0].rate + rating[1].rate + rating[2].rate;
    var total = Number.parseFloat(summary/3).toFixed(2);
    document.getElementById('total').innerHTML = `${total}/5.00`;
    elements.forEach((el, index) => {
        document.getElementById(`value-${index}`).setAttribute('value', rating[index].rate);
    });
}

document.querySelector('.addButton').addEventListener('click', () => {
    addReview();
});

var haveReview;
function addReview(){
    var rate = document.querySelector('.total').innerHTML;
    var look = document.getElementById('value-0').getAttribute('value');
    var user = document.getElementById('value-1').getAttribute('value');
    var genimp = document.getElementById('value-2').getAttribute('value');
    var userData = document.querySelector('.User-data').value;
    var comment = document.querySelector('.reviewComment').value;
    if(userData != "" && comment != ""){
        var review = {
            Look: look,
            UserFr: user,
            GenImp: genimp,
            rate: rate,
            author: userData,
            text: comment
        };
        haveReview = localStorage.getItem('reviewed');
        if(!haveReview){
            reviews.push(review);
            saveReviews();
            localStorage.setItem('reviewed', 1);
        }
        else{
            alert("Отзыв оставлен");
        }
    }else{
        alert("Заполните все поля");
    }
}