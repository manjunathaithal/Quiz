let questionCount = 0;
let score = 0;
let arr = [];
let list = new Array();
let pageList = new Array();
let currentPage = 1;
let numberPerPage = 2;
let numberofPage = 0;
let radioArray = [];

const scoreBtn = document.querySelector(".scoreBtn");
const nextbtn = document.querySelector("#nextbtnDiv");

fetch("quiz.json")
  .then((r) => r.json())
  .then((response) => {
    //   arr= shuffle(response);
    arr = response;
    loadQuestion();
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function loadQuestion() {
  let begin = (currentPage - 1) * numberPerPage;
  let end = begin + numberPerPage;

  pageList = arr.slice(begin, end);
  let html = "";
  const questionDiv = document.querySelector(".questionDiv");

  pageList.forEach((element) => {
    console.log(element);
    html += `<h5 class="question">${element.question} </h5>
    
        <div>
            <input type="radio" name="answer${element.id}" id="1" class="answer${element.id}">
            <label  for="answer${element.id}" id="option${element.id}">${element.a}</label>
        </div>
       <div>
            <input type="radio" name="answer${element.id}" id="2" class="answer${element.id}">
            <label  for="answer${element.id}" id="option${element.id}">${element.b}</label>
        </div>
            <input type="radio" name="answer${element.id}" id="3" class="answer${element.id}">
            <label  for="answer${element.id}" id="option${element.id}">${element.c}</label>
        <div>
            <input type="radio" name="answer${element.id}" id="4" class="answer${element.id}">
            <label  for="answer${element.id}" id="option${element.id}">${element.d}</label>`;
  });

  questionDiv.innerHTML = html;
}

//submit button
function submit() {
  const showScore = document.querySelector("#showScore");
  arr.forEach((element, idx) => {
    if (element.ans == radioArray[idx]) {
      score += 1;
    }
  });
  showScore.innerHTML = `<h3> You Scored ${score}/${arr.length}</h3>
                             <button class="btn btn-primary" onclick="location.reload()" >Play Again</button>`;
  showScore.classList.remove("scoreArea");

  document.getElementById("checkscore").disabled = true;
}

function getNumberOfPage() {
  return Math.ceil(arr.length / numberPerPage);
}
function nextPage() {
  currentPage += 1;
  pageList.forEach((element) => {
    const radioList = document.querySelectorAll(`.answer${element.id}`);

    radioList.forEach((element) => {
      if (element.checked) {
        radioArray.push(element.id);
      }
    });
  });
  if (currentPage == arr.length - 1) {
    scoreBtn.innerHTML = `<button id="checkscore" class="btn btn-primary mt-3" onclick="submit() ">Check Score</button>`;
    scoreBtn.style.display = "block";
    nextbtn.style.display = "none";
  }
  loadQuestion();
}
