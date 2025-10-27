// Blob following mouse
const blob = document.getElementById("blob");

if (blob) {
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
}

// Audio State Management
let audioEnabled = false;

// Audio Handlers
const atmosphere = new Howl({
  src: ["https://assets.codepen.io/2995546/atmosphere.mp3"],
  loop: true,
  volume: 0.5
});

const mixingData = new Howl({
  src: ["https://assets.codepen.io/2995546/data-sound.mp3"]
});

// Audio Toggle Button
const audioToggle = document.getElementById("audio-toggle");
const audioIcon = document.querySelector(".audio-icon");

if (audioToggle && audioIcon) {
  audioToggle.addEventListener("click", () => {
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
      atmosphere.play();
      audioIcon.textContent = "🔊";
      audioToggle.setAttribute("aria-label", "Mute audio");
    } else {
      atmosphere.stop();
      audioIcon.textContent = "🔇";
      audioToggle.setAttribute("aria-label", "Unmute audio");
    }
  });
}

// Hero text animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const initText = "hADzA";
const heroTitle = document.querySelector("h1");

if (heroTitle) {
  heroTitle.onmouseover = (event) => {
    let iterations = 0;
    const iterationLimit = 10;

    const interval = setInterval(() => {
      if (audioEnabled) {
        mixingData.play();
      }

      event.target.innerText = event.target.innerText
        .split("")
        .map(() => letters[Math.floor(Math.random() * 52)])
        .join("");

      iterations += 1;

      if (iterations >= iterationLimit) {
        event.target.innerText = initText;
        mixingData.stop();
        clearInterval(interval);
      }
    }, 50);
  };
}
