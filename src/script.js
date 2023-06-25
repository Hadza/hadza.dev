// Blob following mouse
const blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
  const { pageX, pageY } = event;

  blob.animate(
    {
      left: `${pageX}px`,
      top: `${pageY}px`
    },
    {
      duration: 4000,
      fill: "forwards"
    }
  );
};

// Audio Handlers
const atmosphere = new Howl({
  src: ["https://assets.codepen.io/2995546/atmosphere.mp3"],
  autoplay: true,
  volume: 0.5
});

setInterval(() => {
  atmosphere.fade(1, 0.5, 500);
  atmosphere.play();
  atmosphere.fade(0.2, 1, 6000);
}, 25000);

const mixingData = new Howl({
  src: ["https://assets.codepen.io/2995546/data-sound.mp3"]
});

// Hero text animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let initText = "hADzA";

document.querySelector("h1").onmouseover = (event) => {
  let iterations = 0;
  const iterationLimit = 10;

  const interval = setInterval(() => {
    mixingData.play();
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter) => letters[Math.floor(Math.random() * 52)])
      .join("");
    iterations += 1;
    if (iterations >= iterationLimit) {
      event.target.innerText = initText;
      mixingData.pause();
      clearInterval(interval);
    }
  }, 50);
};
