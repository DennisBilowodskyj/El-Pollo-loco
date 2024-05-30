/**
 * These code sections define a series of variables and values:
 */
let canvas;
let world;
let keyboard = new Keyboard();
let mute = false;
theme_sound = new Audio("audio/theme2.mp3");
theme_sound.volume = 0.2;
chicken_sound = new Audio("audio/chicken.mp3");
chicken_sound.volume = 0.2;
walking_sound = new Audio("audio/running.mp3");
coin_sound = new Audio("audio/coin.mp3");
bottle_sound = new Audio("audio/bottle.mp3");
/**
 * this function initialised variable for start the program.
 */
function init() {
  initLevl1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  this.theme_sound.play();
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
}
let intervalIds = [];

/**
 * this function is pushing the id of an interval into a array.
 * @param {Function} fn
 * @param {Number} time
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * clear all intervals
 */
function stopGame() {
  intervalIds.forEach(clearInterval);
  chicken_sound.pause();
  walking_sound.pause();
  coin_sound.pause();
  bottle_sound.pause();
}

/**
 * this function defined what happend in fullscreen.
 */
function fullScreen() {
  let fullScreen = document.getElementById("fullScreen");
  let fsStartscreen = document.getElementById("startScreen");
  document.getElementById("canvas").style.width = "100%";
  document.getElementById("canvas").style.height = "100vh";
  fsStartscreen.classList.add("fs-startScreen");

  enterFullscreen(fullScreen);
  exitFullscreen(fullScreen);
}

/**
 * View in fullscreen.
 * @param {HTMLElement} element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

/**
 * Close fullscreen.
 * @returns true if the HTML is in Fullscreen
 */
function exitFullscreen() {
  let fsStartscreen = document.getElementById("startScreen");

  if (
    (document.fullscreenElement === null ||
      document.fullscreenElement === undefined) &&
    (document.webkitFullscreenElement === null ||
      document.webkitFullscreenElement === undefined)
  ) {
    return;
  }

  document.getElementById("canvas").style.width = "auto";
  document.getElementById("canvas").style.height = "auto";
  fsStartscreen.classList.remove("fs-startScreen");
  document.getElementById("symbols").classList.remove("symbols2");
  document.getElementById("startScreen").classList.remove("symbols2");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * a function to mute and unmute all sounds in the game.
 */
function muteSound() {
  const img = document.getElementById("imgClickAndChange");

  if (img.src.endsWith("mute.png")) {
    img.src = "img/11_symbols/volume-unmuted-stroke.256x234.png";
  } else {
    img.src = "img/11_symbols/mute.png";
  }
  mute = !mute;
  if (!mute) {
    theme_sound.play();
    chicken_sound.play();
  } else {
    theme_sound.pause();
    chicken_sound.pause();
  }
}

/**
 * after onclick the information icon, this function displayed how to play the game and which key is to press.
 */
function howToPlay() {
  document.getElementById("htp");
  document.getElementById("htp").classList.toggle("d-none");
}

/**
 * this script adds event listeners to handle keyboard inputs for moving the character, jumping, and other actions, as well as touch events for mobile devices to control the character's movement and actions.
 * it also includes event listeners to handle fullscreen mode.
 */
document.addEventListener("keydown", function (event) {});

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
  if (e.keyCode == 27) {
    keyboard.ESC == false;
  }
});

window.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
  }
});

window.addEventListener("keydown", function (event) {
  if (event.keyCode == 70) {
    if (document.fullscreenElement) {
      exitFullscreen();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnLeft");
  document.getElementById("btnRight");
  document.getElementById("btnJump");
  document.getElementById("btnThrow");

  btnLeft.addEventListener("touchstart", function () {
    keyboard.LEFT = true;
  });

  btnLeft.addEventListener("touchend", function () {
    keyboard.LEFT = false;
  });

  btnRight.addEventListener("touchstart", function () {
    keyboard.RIGHT = true;
  });

  btnRight.addEventListener("touchend", function () {
    keyboard.RIGHT = false;
  });

  btnJump.addEventListener("touchstart", function () {
    keyboard.SPACE = true;
  });

  btnJump.addEventListener("touchend", function () {
    keyboard.SPACE = false;
  });

  btnThrow.addEventListener("touchstart", function () {
    keyboard.D = true;
  });

  btnThrow.addEventListener("touchend", function () {
    keyboard.D = false;
  });
});
