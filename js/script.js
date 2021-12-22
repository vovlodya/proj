const leftBowlCounter = document.querySelector('.scales-left-part .scales-bowl .counters');
const rightBowlCounter = document.querySelector('.scales-right-part .scales-bowl .counters');
const leftBowlPart = document.querySelector('.scales-left-part');
const rightBowlPart = document.querySelector('.scales-right-part');
let offsetX;
let offsetY;
let userName = "";
let theme = false;
let level;
let levelTime = 1;
let numberOnDelete = null;
let dragged;
let isIn = 0;
let draggedId;
let endGame= null;
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

//1 уровень
document.getElementById('1').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.game-page').classList.remove('hide');
    timeEnds();
    level =1;  
    setTimeout(createNumber,3000);
      
})

//2 уровень
document.getElementById('2').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.game-page').classList.remove('hide');
    timeEnds();
    level =2;
    setTimeout(createNumber,3000);
})
//3 уровень
document.getElementById('3').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.game-page').classList.remove('hide');
    timeEnds();
    level =3;
    setTimeout(createNumber,3000);
})

//таймер
function timeEnds(){
  
    let timerId = null;
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
          //закончилось время
        clearInterval(timerId);
        clearTimeout(endGame);
        clearTimeout(numberOnDelete);
        if(leftBowlCounter.innerHTML===rightBowlCounter.innerHTML)
        {
            document.querySelector('.end-game-score').innerHTML='Ваш результат: '+leftBowlCounter.innerHTML;
        }
        leftBowlCounter.innerHTML=0;
        rightBowlCounter.innerHTML=0;
        document.querySelector('.game-page').classList.add('hide');
        document.querySelector('.end-game-page').classList.remove('hide');
        document.querySelector('.end').addEventListener('click', ()=>{
            document.querySelector('.end-game-page').classList.add('hide');
            document.querySelector('.menu-page').classList.remove('hide');
        })
      }
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    let dateStart=new Date();
    let deadline = dateStart;
    deadline.setMinutes(deadline.getMinutes()+levelTime);
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
  }

//создание элементов
function createNumber(){
     
    let appearingSide = document.querySelector('.game-page');
    let newNumber = document.createElement('div');
    newNumber.classList.add('zero');
    newNumber.classList.add('anim-show');
    draggedId = getRandomInt(level,7+level);
    newNumber.id=draggedId;
    newNumber.style.backgroundImage =  'url(../img/' + draggedId + '.png)';
    newNumber.draggable=true;
    newNumber.style.left = getRandomInt(800,1701)+'px';
    newNumber.style.top = getRandomInt(1,721)+'px';
    appearingSide.appendChild(newNumber);
    //перетаскивание цифр
    newNumber.addEventListener('dragstart', function(event) {
        dragged = newNumber;
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        });
        newNumber.addEventListener('dragend',function(event){
        newNumber.style.top = (event.pageY - offsetY) + 'px';
        newNumber.style.left = (event.pageX - offsetX) + 'px';
    });
    numberOnDelete = setTimeout( ()=>{
        let elem=document.querySelector('.zero');
        elem.classList.remove('anim-show');
        elem.classList.add('anim-remove');
        setTimeout( ()=>{elem.remove()},2000);
    },7000);
   endGame=setTimeout(createNumber,3000);
}

//меняет цвет чаши
document.addEventListener("dragenter", function( event ) {
    if ( event.target.className == "scales-bowl" ) {
        event.target.style.background = "purple";
    }

}, false);
//восстанавливает цвет чаши
document.addEventListener("dragleave", function( event ) {
    if ( event.target.className == "scales-bowl" ) {
        event.target.style.background = "";
    }

}, false);
//отпускание цифры в чашу
document.addEventListener("drop", function( event ) {
    if ( event.target.className == "scales-bowl" ) {
        event.target.style.background = "";
        clearTimeout(numberOnDelete);
        dragged.classList.remove('anim-show');
        dragged.classList.add('anim-remove');
        let todel =dragged;
        if(event.target.parentNode=== leftBowlPart)
        leftBowlCounter.innerHTML=Number(leftBowlCounter.innerHTML)+Number(dragged.id);
        else rightBowlCounter.innerHTML = Number(rightBowlCounter.innerHTML)+Number(dragged.id);
        setTimeout( ()=>{dragged.parentNode.removeChild(todel)},2000);
    }
  
}, false);
//функция рандома [min, max)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }
