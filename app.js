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

  // Insert the score display at the top of the game container
  gameDisplay.appendChild(scoreTrack);

  let scoreTimer;
  let birdLeft = 220;
  let birdBottom = 450;
  let gravity = 2;
  let isGameOver = false;

  function startGame() {
    score = 0; // Reset score when starting the game
    birdBottom = 450; // Reset bird position
    scoreTrack.innerHTML = "Score: " + score; // Reset score display
    isGameOver = false; // Reset game over state
    scoreTimer = setInterval(increaseScore, 1250); // Start score timer
    gameTimerId = setInterval(moveBird, 20); // Start game loop
    generateObstacle(); // Start generating obstacles
  }

  function moveBird() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }

  function jump() {
    if (birdBottom < 600 && birdBottom >= 153) {
      birdBottom += 40;
    }

    bird.style.bottom = birdBottom + "px";
  }

  document.addEventListener("keyup", jump);
  document.addEventListener("touchstart", jump);

  function generateObstacle() {
    let timerId2 = setInterval(moveObstacle, 10);
    let generationTimerId = setTimeout(generateObstacle, 1250);

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

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      upperobstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft <= -5) {
        clearInterval(timerId2);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(upperobstacle);
      }
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

    restart.innerHTML = "Final Score: " + score; // Display final score
  }

  function gameOver() {
    clearInterval(gameTimerId);
    clearInterval(scoreTimer);
    overDisplay();
    isGameOver = true;
    document.removeEventListener("keyup", jump);
  }

  // Create and add the start button
  const startButton = document.createElement("button");
  startButton.innerHTML = "Start Game";
  startButton.classList.add("start-btn");
  document.body.insertBefore(startButton, gameDisplay); 

  // Start the game when the start button is clicked
  startButton.addEventListener("click", () => {
    startButton.style.display = "none"; 
    startGame(); // Start the game
  });
});
