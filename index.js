//Game details variables
const moveCount = document.querySelector('.moves');
const timeCount = document.querySelector('.time');
const restartGame = document.querySelector('.restart');
const stars = document.querySelector('em');

//Leader board variables
const leaderBoard = document.querySelector('.leader-board');

//Game dificulty variables
const option = document.querySelector('.option');
const levels = document.querySelector('.level');

//Game plateform variables 
const gamePlateform = document.querySelector('.game-platform');

//Play again vaibales
const overlay = document.querySelector('.overlay');
const gameFinished = document.querySelector('.game-completed');
const rating = document.querySelector('.rating');
const timeConsumed = document.querySelector('.seconds');
const totalMoves = document.querySelector('.moveCount');
const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');
const saveProgress = document.querySelector('.save-progress');

//Save details variables 
const saveName = document.querySelector('form');
const playerName = document.querySelector('#name');

//Document fragment variable
const gridFragment = new DocumentFragment();

//Array of symbol classes
const symbolEasy = ["fas fa-anchor", "fas fa-fish", "fas fa-feather", "fas fa-wrench", "fas fa-user-md", "fas fa-poo", "fas fa-anchor", "fas fa-fish", "fas fa-feather", "fas fa-wrench", "fas fa-user-md", "fas fa-poo"]

const symbolMedium = ["fas fa-smile", "fas fa-heart", "fas fa-hand-peace", "fas fa-hand-middle-finger", "fas fa-thumbs-up", "fas fa-kiss-wink-heart", "fas fa-dizzy", "fas fa-grin-stars", "fas fa-smile", "fas fa-heart", "fas fa-hand-peace", "fas fa-hand-middle-finger", "fas fa-thumbs-up", "fas fa-kiss-wink-heart", "fas fa-dizzy", "fas fa-grin-stars"]

const symbolHard = ["fas fa-ghost", "fas fa-mask", "fas fa-skull-crossbones", "fas fa-book-dead", "fas fa-poo-storm", "fas fa-robot", "fas fa-cloud-sun", "fas fa-cloud-sun-rain", "fas fa-grin-tongue-squint", "fas fa-grin-tongue-wink", "fas fa-ghost", "fas fa-mask", "fas fa-skull-crossbones", "fas fa-book-dead", "fas fa-poo-storm", "fas fa-robot", "fas fa-cloud-sun", "fas fa-cloud-sun-rain", "fas fa-grin-tongue-squint", "fas fa-grin-tongue-wink"]

// let orderArr = [];
// const map = new Map();

//Function for creating a new map
// function gameLevelMap(num, levelSymbol) {
//   let numArr = [];
//   while (numArr.length < num) {
//     let val = Math.floor(Math.random() * (num + 1));

//     if (numArr.every(el => el != val) && val != 0) {
//       numArr.push(val);
//     }
//   }
//   orderArr = Array.from(numArr);
//   numArr.sort((a, b) => a - b)

//   for (let i = 0; i < numArr.length; i++) {
//     let val = numArr[i];
//     val <= levelSymbol.length ? map.set(val, levelSymbol[i]) : map.set(val, levelSymbol[i - levelSymbol.length])
//   }

//   console.log(map);
// }

//Function for suffling the array
function suffleArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//Fuction for making divs
function makeDivs(rows, columns, levelSymbol) {
  let num = rows * columns;
  // gameLevelMap(num, levelSymbol)

  suffleArr(levelSymbol)
  for (let i = 0; i < num; i++) {
    let icon = document.createElement('div');
    icon.classList.add('icon');
    icon.setAttribute('id', `div-${i + 1}`);
    let iElem = document.createElement('i');
    // iElem.className = map.get(orderArr[i])
    iElem.className = levelSymbol[i];
    icon.appendChild(iElem);
    gridFragment.append(icon);
  }
  return gridFragment;
}

//Function for inserting fragment in the gameplatform
function appendFragment(fragment) {
  gamePlateform.appendChild(fragment);

}

//Function for setting grid property
function gridProperty(rows, columns, gridGap) {

  let styles = `display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-gap: ${gridGap};`
  gamePlateform.setAttribute('style', styles)
}

let twoStar = 0;
let oneStar = 0;
let rows = 0;
let columns = 0;
let levelFragment = null;
let gridGap = "0";

//Easy level of the game
function easyLevel() {
  rows = 3;
  columns = 4;
  gridGap = "70px 45px";
  if (window.innerWidth < 420) {
    rows = 4;
    columns = 3;
    gridGap = "30px 50px";
  }
  twoStar = 20;
  oneStar = 30;

  option.style.display = 'none'
  makeDivs(rows, columns, symbolEasy);
  gridProperty(rows, columns, gridGap);
}

//Medium level of the game
function mediumLevel() {
  rows = 4;
  columns = 4;
  gridGap = '20px 45px';
  if (window.innerWidth < 420) {
    gridGap = "20px 23px";
  }
  twoStar = 25;
  oneStar = 35;

  option.style.display = 'none';
  makeDivs(rows, columns, symbolMedium);
  gridProperty(rows, columns, gridGap);
}

//Hard level of the game
function hardLevel() {
  rows = 4;
  columns = 5;
  gridGap = '30px 45px';
  if (window.innerWidth < 420) {
    gridGap = "23px 10px";
  }
  twoStar = 25;
  oneStar = 30;

  option.style.display = 'none';
  makeDivs(rows, columns, symbolHard);
  gridProperty(rows, columns, gridGap);
}

let levelArr = ['easy', 'medium', 'hard'];
let levelFunction = [easyLevel, mediumLevel, hardLevel];
let symbolArr = [symbolEasy, symbolMedium, symbolHard];
let index = 0;

//Eventlistener for level buttons
option.addEventListener('click', (event) => {
  let clickedBtn = event.target;
  let levelId = clickedBtn.id;
  if (levelId === 'easy') {
    index = levelArr.indexOf(levelId);
    levelFunction[index]();
    appendFragment(gridFragment);
  }
  if (levelId == 'medium') {
    index = levelArr.indexOf(levelId);
    levelFunction[index]();
    appendFragment(gridFragment);
  }
  if (levelId == 'hard') {
    index = levelArr.indexOf(levelId);
    levelFunction[index]();
    appendFragment(gridFragment);
  }
})


let div1 = null;
let div2 = null;
let eventArr = [];
let matchedArr = [];
let moves = 0;
let time = 0;

//Function for visible the symbol
function visibleSymbol(clickedItem) {
  if (clickedDiv.classList.contains('icon')) {
    if (eventArr.length == 2) {
      return
    }
    clickedItem.className = 'icon visible';
  }
}

let star = 3;
//Function for managing stars by movesCount
function manageStars(moves, twoStar, oneStar) {
  if (moves > twoStar) {
    star = 2;
    stars.innerHTML = "<em>&#9733;&#9733;</em>";
  }
  if (moves > oneStar) {
    star = 1;
    stars.innerHTML = "<em>&#9733;</em>";
  }
}

//Function for time consuming by player
function updateTimeStar() {
  time++;
  timeCount.innerText = `${time} Seconds`;
}

//Timer
let timer = null;

//Function for start timer 
function startTimer() {
  if (call) {
    call--;
    timer = setInterval(() => {
      updateTimeStar()
    }, 1000);
  }
}

//Function for an array of clicked Item 
function visibleArr(className, divId) {
  if (eventArr.length == 2) {
    return
  }
  if (eventArr.length == 1) {
    if (eventArr[0].id != divId && (!matchedArr.indexOf(className) + 1)) {
      div2 = document.querySelector(`#${divId}`)
      eventArr.push({ name: className, id: divId });
    }
  }
  else {
    if (!(matchedArr.indexOf(className) + 1)) {
      div1 = document.querySelector(`#${divId}`)
      eventArr.push({ name: className, id: divId });
    }
  }
  if (eventArr.length == 2) {
    moves++;
    moveCount.innerText = `${moves} Moves`;
  }
  manageStars(moves, twoStar, oneStar);
}


//Function for matching the divs
function matchDivs(arr) {
  if (arr[0].name == arr[1].name) {
    div1.className = 'animated flash icon visible';
    div2.className = 'animated flash icon visible';
    matchedArr.push(arr[0].name)
    matchedArr.push(arr[1].name)
  };

  //Stop timer on completing the game;
  if (matchedArr.length == symbolArr[index].length) {
    clearInterval(timer);
    setTimeout(() => {
      overlay.style.display = 'flex';
    }, 1000);

    totalMoves.innerText = moves;
    timeConsumed.innerText = time;
    rating.innerText = star;
  }

  if (arr[0].name != arr[1].name) {
    div1.className = 'animated heartBeat icon visible';
    div2.className = 'animated heartBeat icon visible';
    const closeDivs = () => {
      div1.className = 'icon';
      div2.className = 'icon';
    }
    setTimeout(() => closeDivs(), 800);
  };
  setTimeout(() => {
    eventArr = [];
  }, 800);
}


let clickedDiv = null;
let Id = null;
let className = null;
let call = 1;

//Eventlistener for the click on the divs
gamePlateform.addEventListener('click', (event) => {
  if (eventArr.length <= 1) {
    clickedDiv = event.target;
    visibleSymbol(clickedDiv);
    if (clickedDiv.classList.contains('icon')) {
      startTimer();
    }
    className = clickedDiv.children[0].className;
    Id = clickedDiv.id;

    visibleArr(className, Id);
    if (eventArr.length == 2) {
      matchDivs(eventArr);
    }
  }

})

//Restart the game
function restart() {

  gamePlateform.innerHTML = '';
  gamePlateform.appendChild(gridFragment);

  matchedArr = [];
  eventArr = [];
  moves = 0;
  time = 0;
  call = 1;

  clearInterval(timer);
  stars.innerHTML = "<em>&#9733;&#9733;&#9733;</em>";
  moveCount.innerText = `${moves} Moves`;
  timeCount.innerText = `${time} Seconds`;
}

restartGame.addEventListener('click', (event) => {
  levelFunction[index]();
  restart();
})

yesBtn.addEventListener('click', (event) => {
  levelFunction[index]();
  restart();
  gameFinished.style.display = 'none';
})

noBtn.addEventListener('click', (event) => {
  gamePlateform.style.display = 'none';
  option.style.display = 'block';
  gameFinished.style.display = 'none';
  restart();
})

//Save Progress
saveProgress.addEventListener('click', (event) => {
  if (event.target.classList.contains('save-progress')) {
    gameFinished.style.display = 'none';
    saveName.style.display = 'flex';
  }
})
const  enterElem = document.querySelector('#submit');
let name = '';
//Form for adding name in the array
saveName.addEventListener('submit', (event) => {
  event.preventDefault();

  name = playerName.value;
  let user = { name: name, star: star, time: time, moves: moves, index: index};
  localStorage.setItem('user', JSON.stringify(user));  
  
  if (location.origin === 'https://ashish8796.github.io') {
    window.location.pathname = '/memory-game/leader-board.html';
  } else {
    window.location.pathname = '/leader-board.html';
  }
});