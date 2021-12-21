const leftBowl = document.querySelector('.scales-left-part .scales-bowl');
const rightBowl = document.querySelector('.scales-right-part .scales-bowl');
let offsetX;
let offsetY;
let userName = "";
let theme = false;
let level;
let levelTime = 3;
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
    setInterval(startGame(), 5000);
    level =1;    
})

//2 уровень
document.getElementById('1').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.game-page').classList.remove('hide');
    timeEnds();
    level =2;
})
//3 уровень
document.getElementById('1').addEventListener('click',()=>{
    document.querySelector('.menu-page').classList.add('hide');
    document.querySelector('.game-page').classList.remove('hide');
    timeEnds();
    level =3;
})

//таймер
function timeEnds(){
  
    let timerId = null;
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
          //закончилось время
        clearInterval(timerId);
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
function startGame(){
     
     
    let appearingSide = document.querySelector('.game-page');
    let newNumber = document.createElement('div');
    newNumber.classList.add('zero');
    newNumber.classList.add('anim-show');
    newNumber.draggable=true;
    appearingSide.appendChild(newNumber);
    //перетаскивание цифр
    newNumber.addEventListener('dragstart', function(event) {
        offsetX = event.offsetX;
        offsetY = event.offsetY;
        });
        newNumber.addEventListener('dragend',function(event){
        newNumber.style.top = (event.pageY - offsetY) + 'px';
        newNumber.style.left = (event.pageX - offsetX) + 'px';
        //left = elem.getBoundingClientRect();
    });
    
}


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



