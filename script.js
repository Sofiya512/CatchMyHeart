let score = 0;

let playerPosition = 50;

let paused = false;

const game = document.getElementById("game");

const player = document.getElementById("player");

const scoreText = document.getElementById("score");


function moveLeft() {

    if (paused) return;

    playerPosition -= 8;

    if (playerPosition < 5) {

        playerPosition = 5;

    }

    player.style.left = playerPosition + "%";

}


function moveRight() {

    if (paused) return;

    playerPosition += 8;

    if (playerPosition > 95) {

        playerPosition = 95;

    }

    player.style.left = playerPosition + "%";

}


document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {

        moveLeft();

    }

    if (event.key === "ArrowRight") {

        moveRight();

    }

});


function createHeart() {

    if (paused || score >= 10) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerText = "❤️";

    heart.style.left =
        Math.random() * 90 + "%";

    heart.style.top = "0px";

    game.appendChild(heart);


    let position = 0;


    const fall = setInterval(function() {

        if (paused) return;


        position += 3;

        heart.style.top =
            position + "px";


        const heartRect =
            heart.getBoundingClientRect();

        const playerRect =
            player.getBoundingClientRect();


        if (

            heartRect.bottom >= playerRect.top &&

            heartRect.left < playerRect.right &&

            heartRect.right > playerRect.left

        ) {

            score++;

            scoreText.innerText = score;

            heart.remove();

            clearInterval(fall);


            if (score === 3) {

                showQuestion(
                    "Do you want to meet me? 🥺❤️",
                    [
                        "Definitely ❤️",
                        "Yes 🥰",
                        "Maybe 👀"
                    ]
                );

            }


            if (score === 6) {

                showQuestion(
                    "Do you miss me? 🥹",
                    [
                        "Yes ❤️",
                        "Sometimes 😌",
                        "Every day 🥺"
                    ]
                );

            }


            if (score === 9) {

                showQuestion(
                    "Would you choose me again? 💕",
                    [
                        "Always ❤️",
                        "Of course 🥰",
                        "Without thinking twice 💗"
                    ]
                );

            }


            if (score === 10) {

                document.getElementById("finalBox")
                    .style.display = "block";

            }

        }


        if (position > 450) {

            heart.remove();

            clearInterval(fall);

        }

    }, 30);

}


function showQuestion(text, options) {

    paused = true;


    const box =
        document.getElementById("questionBox");

    const question =
        document.getElementById("question");

    const answers =
        document.getElementById("answers");


    question.innerText = text;

    answers.innerHTML = "";


    options.forEach(function(option) {

        const button =
            document.createElement("button");

        button.innerText = option;


        button.onclick = function() {

            box.style.display = "none";

            paused = false;

        };


        answers.appendChild(button);

    });


    box.style.display = "block";

}


setInterval(function() {

    createHeart();

}, 800);
