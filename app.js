document.addEventListener("DOMContentLoaded", () => {
  // selecting required elements..
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  var scoreTrack = document.createElement("div");
  scoreTrack.classList.add("score-display");
  let score = 0;

  function increaseScore() {
    score++;
    scoreTrack.innerHTML = "Score: " + score;
  }

  gameDisplay.appendChild(scoreTrack);

  let scoreTimer = setInterval(increaseScore, 1250);

  let birdLeft = 220;
  let birdBottom = 450;
  let gravity = 2;
  let isGameOver = false;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }

  let gameTimerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 600 && birdBottom >= 153) {
      birdBottom += 40;
    }

    bird.style.bottom = birdBottom + "px";
  }

  document.addEventListener("keyup", jump);
  document.addEventListener("touchstart", jump);

  function generateObstacle() {
    // MOVE OBSTACLE WITH TIME RANGE 10ms
    let timerId2 = setInterval(moveObstacle, 10);

    // GENERATE OBSTACLE AGAIN AFTER 3s
    let generationTimerId = setTimeout(generateObstacle, 1250);

    // IF GAME IS OVER STOP GENERATING
    if (isGameOver) {
      clearTimeout(generationTimerId);
      clearInterval(timerId2);
      return;
    }

    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight + 30;

    const obstacle = document.createElement("div");
    const upperobstacle = document.createElement("div");

    upperobstacle.classList.add("upperobstacle");
    obstacle.classList.add("obstacle");

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(upperobstacle);

    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    upperobstacle.style.left = obstacleLeft + "px";
    let upperobstacle_bottom = obstacleBottom + 300 + Math.random() * 100 + 140;
    upperobstacle.style.bottom = upperobstacle_bottom + "px";
    // upperobstacle_bottom

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      upperobstacle.style.left = obstacleLeft + "px";

      // REMOVING OBSTACLE FROM THE GAME DISPLAY
      if (obstacleLeft <= -5) {
        clearInterval(timerId2);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(upperobstacle);
      }
      // CONDITION FOR GAME OVER..
      if (
        birdBottom <= 150 ||
        (((obstacleLeft > 220 && obstacleLeft < 270) ||
          (obstacleLeft + 26 > 220 && obstacleLeft + 26 < 270)) &&
          (obstacleBottom + 300 > birdBottom ||
            upperobstacle_bottom <= birdBottom + 48))
      ) {
        clearInterval(timerId2);
        gameOver();
      }
    }
  }
  generateObstacle();

  function overDisplay() {
    let button = document.createElement("button");

    let restart = document.createElement("div");

    restart.classList.add("overDisplay");
    button.classList.add("restart-btn");
    button.innerHTML = "Restart Game";

    function onButtonClick() {
      window.location.reload();
    }

    button.addEventListener("click", onButtonClick);

    gameDisplay.appendChild(restart);
    gameDisplay.appendChild(button);

    restart.innerHTML = score;
  }

  function gameOver() {
    clearInterval(gameTimerId);
    clearInterval(scoreTimer);
    overDisplay();
    isGameOver = true;
    overDisplay();
    document.removeEventListener("keyup", jump);
  }
});
