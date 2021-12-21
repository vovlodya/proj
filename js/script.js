let elem = document.querySelector('.zero');
const leftBowl = document.querySelector('.scales-left-part .scales-bowl');
const rightBowl = document.querySelector('.scales-right-part .scales-bowl');
let offsetX;
let offsetY;
let userName = "";
let theme = false;
document.querySelector('body').addEventListener('dragover',(event)=>{
event.preventDefault();    
})
//переход на страницу авторизации
document.querySelector('.start-btn').addEventListener('click', ()=>{
    document.querySelector('.start-page').classList.add('hide');
    document.querySelector('.login-page').classList.remove('hide');
})
//переход на страницу с меню
document.querySelector('.next').addEventListener('click', ()=>{

    userName = document.querySelector('input').value;
    if(userName != ""){
    document.querySelector('.login-page').classList.add('hide');
    document.querySelector('.menu-page').classList.remove('hide');
    document.querySelector('.theme').classList.remove('hide');
    document.querySelector('.greeting').innerHTML = "Привет " + userName + ", выбирай уровень";
    }
    else{
        alert('Вы забыли ввести имя');
    }
})
//смена темы
document.querySelector('.theme').addEventListener('click', ()=>{
    if(theme) {
        theme=false;
        document.querySelector('body').style.background='linear-gradient(to bottom right, #0C7BB3, #F2BAE8)';
    }
    else{
    document.querySelector('body').style.background='linear-gradient(137deg, #131337,#2f273a,#48342e)';  
    theme=true;
    }
})
//перетаскивание цифр
elem.addEventListener('dragstart', function(event) {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
});

elem.addEventListener('dragend',function(event){
    elem.style.top = (event.pageY - offsetY) + 'px';
    elem.style.left = (event.pageX - offsetX) + 'px';
    
    left = elem.getBoundingClientRect();
});

document.getElementById('1').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.scales').classList.remove('hide');
    //ubrati
    document.querySelector('.zero').classList.remove('hide');
})
//проверка нахождения в чаше
function IsInLeftBowl (){
    return intersects(leftBowl.getBoundingClientRect(),elem.getBoundingClientRect());
}

function IsInRightBowl (){
    return intersects(rightBowl.getBoundingClientRect(),elem.getBoundingClientRect());
}

function intersects ( a, b ) {
    return !( a.top > b.bottom || a.bottom < b.bottom || a.right < b.left+(b.right-b.left)/2 || a.left > b.right-(b.right-b.left)/2 );
  }



