let userData = JSON.parse(localStorage.getItem('user'));

//SaveProgress varibles
const easyScores = document.querySelector('.easy-scores');
const mediumScores = document.querySelector('.medium-scores');
const hardScores = document.querySelector('.hard-scores');
const easyRow = document.querySelector('#easy-row');
const mediumRow = document.querySelector('#medium-row');
const hardRow = document.querySelector('#hard-row');


//Table fragment 
let rowFragment = new DocumentFragment();

//Array for saving details for various levels of game
let easyScoresArr = [];
let mediumScoresArr = [];
let hardScoresArr = [];
let scoreArr = [easyScoresArr, mediumScoresArr, hardScoresArr];
let rowArr = [easyScores, mediumScores, hardScores];
let idArr = ['easy-row', 'medium-row', 'hard-row'];

//Append fragment
saveDetails();
let newRow = rowArr[userData.index].insertRow(-1);
newRow.appendChild(rowFragment);
newRow.classList.add('detail')
newRow.setAttribute('id', idArr[userData.index]);


//Function for the saving the details
function saveDetails() {
  if (scoreArr[userData.index].length < 5) {
    scoreArr[userData.index].push({
      name: userData.name,
      star: userData.star,
      time: userData.time,
      moves: userData.moves
    })
  }
  else {
    scoreArr[userData.index].forEach(elem => {
      if (elem.star < userData.star) {
        changeData();
      }
      if (elem.star == userData.star && elem.time < userData.time) {
        changeData();
      }
      if (elem.star == userData.star && elem.time == userData.time && elem.moves < userData.moves) {
        changeData();
      }
    })
  }

  addRow(userData.name, userData.star, userData.time, userData.moves)
}

//Function for creating table element
function addRow(name, star, time, moves) {
  let scoreArr = [name, star, time, moves];
  for (let i of scoreArr) {
    let tdElem = document.createElement('td');
    tdElem.innerText = i;
    rowFragment.appendChild(tdElem);
  }
}

//Function for changing values in the arr
function changeData() {
  elem.name = userData.name;
  elem.star = userData.star;
  elem.time = userData.time;
  elem.moves = userData.moves;
}