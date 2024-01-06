import "./style.css";
console.log("start");

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MAX = 500;

class Attempts {
  constructor() {
    this.attempts = [];
  }

  init() {
    this.element = document.querySelector("#attempts");

    while (this.element?.firstChild) {
      this.element.firstChild.remove();
    }
  }

  addAttempt(attempt, isRight) {
    this.attempts.push(attempt);

    const element = document.createElement("div");
    element.classList.add("text-xs");
    element.style.position = "absolute";

    element.innerText = isRight ? "✅" : "❌";

    const percentage = (attempt / MAX) * 97;
    element.style.left = `${percentage}%`;
    element.style.top = "12px";

    this.element?.appendChild(element);
  }
}

class Game {
  constructor() {
    this.targetNumber = randomNumber(0, MAX);
    console.log(this.targetNumber);
    this.attempt = 0;
    this.attempts = new Attempts();

    this.submitHandler = (e) => {
      this.submitGuess(e);
    };
  }

  init() {
    this.attempts.init();
    this.element = document.querySelector("#game-container");
    this.element?.classList.remove("hidden");
    this.submitButton = document.querySelector("#submit");
    console.log(this.submitButton);

    this.guessForm = document.querySelector("#guess-form");
    this.message = document.querySelector("#message");
    this.score = document.querySelector("#score");

    this.guessForm?.addEventListener("submit", this.submitHandler);
  }

  submitGuess(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formTarget = new FormData(form);
    const guessNumber = Number(formTarget.get("guess"));

    if (Number.isNaN(guessNumber)) {
      this.message.innerText = "❌ Enter a number";
      return;
    } else if (guessNumber > 500 || guessNumber < 0) {
      this.message.innerText = "❌ Enter a number between 0 and 500";
      return;
    }

    this.attempt++;
    this.score.innerText = `Attempt(s) : ${this.attempt}`;

    form.querySelector("input").value = "";

    this.attempts.addAttempt(guessNumber, guessNumber === this.targetNumber);

    if (guessNumber === this.targetNumber) {
      this.message.innerText = `🟢 Congratulation ${guessNumber} is my guess 🥳`;
      replayButton?.classList.remove("hidden");
      this.submitButton?.classList.add("hidden");
      console.log(this.submitButton);
      return;
    }

    if (guessNumber > this.targetNumber) {
      this.message.innerText = `🔴 ${guessNumber} is too high`;
      return;
    }

    if (guessNumber < this.targetNumber) {
      this.message.innerText = `🔴 ${guessNumber} is too low`;
      return;
    }
  }

  destroy() {
    this.element?.classList.add("hidden");
    this.guessForm?.removeEventListener("submit", this.submitHandler);
    this.submitButton?.classList.remove("hidden");
    this.message.innerText = "";
    this.attempt = 0;
    this.score.innerText = "Attempt(s) : 0";
    replayButton?.classList.add("hidden");
  }
}

let game = null;

const startGame = () => {
  const startContainer = document.querySelector("#start-container");
  startContainer?.classList.add("hidden");

  if (game) {
    game.destroy();
  }
  game = new Game();
  game.init();
};

const startButton = document.querySelector("#start");
startButton?.addEventListener("click", startGame);

const replayButton = document.querySelector("#replay");
replayButton?.addEventListener("click", startGame);
