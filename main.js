function init() {
  let buttonLeft = document.getElementById("left");
  let buttonRight = document.getElementById("right");
  let play = document.getElementById("play");
  buttonLeft.addEventListener("click", lessLines);
  buttonRight.addEventListener("click", moreLines);
  play.addEventListener("click", startGame);
}

function lessLines() {
  let counter = document.getElementById("counter");
  let value = parseInt(counter.textContent);
  if (value > 2) {
    value--;
    counter.textContent = value;
    deleteCardLine();
  }
}

function moreLines() {
  let counter = document.getElementById("counter");
  let value = parseInt(counter.textContent);
  if (value < 7) {
    value++;
    counter.textContent = value;
    renderCardLine();
  }
}

function renderCardLine() {
  let counter = document.getElementById("counter");
  let value = parseInt(counter.textContent);
  let container = document.getElementById("cards");
  let line = document.createElement("div");
  line.classList.add("line");
  for (let i = 0; i < value; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    line.appendChild(card);
  }
  container.appendChild(line);
}

function deleteCardLine() {
  let counter = document.getElementById("counter");
  let value = parseInt(counter.textContent);
  let container = document.getElementById("cards");
  let line = document.getElementsByClassName("line");
  container.removeChild(line[value]);
}

function renderCard() {
  let counter = document.getElementById("counter");
  let value = parseInt(counter.textContent);
  console.log(value);
}

function turnCard(e) {
  let cards = document.getElementsByClassName("card");
  let caption = document.getElementById("caption-container");
  let headline = document.getElementById("caption");
  let play = document.getElementById("play");
  let card = e.target;
  if (card.getAttribute("class") === "card red") {
    card.classList.add("red-bg");
  } else if (card.getAttribute("class") === "card black") {
    card.classList.add("black-bg");
  } else if (card.getAttribute("class") === "card red joker") {
    card.classList.add("red-bg");
    card.textContent = "J";
  } else if (card.getAttribute("class") === "card black joker") {
    card.classList.add("black-bg");
    card.textContent = "J";
  }
  if (card.getAttribute("id") === "last-card") {
    caption.classList.remove("hidden");
    play.classList.remove("hidden");
  }
}

function startGame() {
  let caption = document.getElementById("caption-container");
  let play = document.getElementById("play");
  caption.classList.add("hidden");
  play.classList.add("hidden");
  let black = 14;
  let red = 14;
  let blackJoker = 2;
  let redJoker = 2;
  let cards = document.getElementsByClassName("card");
  for (let j = 0; j < cards.length; j++) {
    cards[j].textContent = "";
    cards[j].classList.remove("black", "red", "black-bg", "red-bg", "joker");
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", turnCard);
    let randomNumber = Math.random();
    if (randomNumber >= 0.9 && redJoker > 0) {
      redJoker--;
      cards[i].classList.add("red");
      cards[i].classList.add("joker");
    } else if (randomNumber >= 0.8 && blackJoker > 0) {
      blackJoker--;
      cards[i].classList.add("black");
      cards[i].classList.add("joker");
    } else if (randomNumber >= 0.4 && red > 0) {
      red--;
      cards[i].classList.add("red");
    } else if (randomNumber >= 0 && black > 0) {
      black--;
      cards[i].classList.add("black");
    } else if (black === 0 && red > 0) {
      console.log("red for black");
      cards[i].classList.add("red");
    } else if (red === 0 && black > 0) {
      console.log("black for red");
      cards[i].classList.add("black");
    }
    if (red === 0) {
      console.log("red empty");
    }
    if (black === 0) {
      console.log("black empty");
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
