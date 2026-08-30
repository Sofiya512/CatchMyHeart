/* ==========================================
   GOOGLE SHEETS
   ========================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw5-DFT1UkPMG-RVBCG6ELH9NCjS-bW5unAm3JvzWPv5PhtpDL7F82UysZ1GlMvkrQg/exec";


/* ==========================================
   GAME VARIABLES
   ========================================== */

let score = 0;

let playerPosition = 50;

let paused = true;


/* ==========================================
   ELEMENTS
   ========================================== */

const alertOne =
    document.getElementById("alertOne");

const alertTwo =
    document.getElementById("alertTwo");

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const game =
    document.getElementById("game");

const player =
    document.getElementById("player");

const scoreText =
    document.getElementById("score");

const questionBox =
    document.getElementById("questionBox");

const questionEmoji =
    document.getElementById("questionEmoji");

const questionNumber =
    document.getElementById("questionNumber");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const textQuestionBox =
    document.getElementById("textQuestionBox");

const textAnswer =
    document.getElementById("textAnswer");

const reactionBox =
    document.getElementById("reactionBox");

const reactionEmoji =
    document.getElementById("reactionEmoji");

const reactionTitle =
    document.getElementById("reactionTitle");

const reactionText =
    document.getElementById("reactionText");

const finalBox =
    document.getElementById("finalBox");


/* ==========================================
   OPEN SECOND ALERT
   ========================================== */

function showAlertTwo() {

    alertOne.classList.add("hidden");

    alertTwo.classList.remove("hidden");

}


/* ==========================================
   OPEN START SCREEN
   ========================================== */

function showStart() {

    alertTwo.classList.add("hidden");

    startScreen.classList.remove("hidden");

}


/* ==========================================
   START GAME
   ========================================== */

function startGame() {

    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    paused = false;

}


/* ==========================================
   QUESTIONS
   ========================================== */

const questions = {

    1: {

        emoji: "❤️",

        text:
            "Do you love me? ❤️",

        answers: [

            {
                text: "YES ❤️",

                reaction: "🥹❤️",

                title: "I KNEW IT! 😭",

                message:
                    "Good boy. That's the answer I wanted. 😌❤️"
            },

            {
                text: "NO 😂",

                reaction: "😭💔",

                title: "PODAAAA POTTE LOTTE! 😂",

                message:
                    "KINDIYEEEE! 😭😂 How dare you!"
            }

        ]

    },


    2: {

        emoji: "👀",

        text:
            "Do you want to meet me? ❤️",

        answers: [

            {
                text: "YESSS ❤️",

                reaction: "🥹❤️",

                title: "I KNEW IT! 😍",

                message:
                    "Then tell me when you're coming. 👀❤️"
            },

            {
                text: "NO 😂",

                reaction: "😭😂",

                title: "ENI ANTHE MAMI VARUM?!",

                message:
                    "Eni anthe mami varum? 😭😂 I'll be waiting!"
            }

        ]

    },


    3: {

        emoji: "🥺",

        text:
            "Who am I to you?",

        textAnswer: true

    },


    4: {

        emoji: "🌧️",

        text:
            "Are you ready to hug me in the rainy season? 🌧️🤗",

        answers: [

            {
                text: "YES ❤️",

                reaction: "🤗❤️",

                title: "COME HEREEE! 🥹",

                message:
                    "Rain + you + me = perfect. 🌧️❤️"
            },

            {
                text: "NO 😂",

                reaction: "🌧️😭",

                title: "NO?! 😭",

                message:
                    "Okay... I'll hug the umbrella then. 😂☂️"
            }

        ]

    },


    5: {

        emoji: "🫀",

        text:
            "Will you give me your kidney? 🫀😂",

        answers: [

            {
                text: "YES, TAKE IT ❤️",

                reaction: "🥹🫀",

                title: "TRUE LOVE! 😭❤️",

                message:
                    "Okay okay... I'll only take one. 😂❤️"
            },

            {
                text: "NOPE! 🏃",

                reaction: "🏃💨😭",

                title: "WHAT?! 😭",

                message:
                    "After everything I've done for you?! 😂💔"
            }

        ]

    }

};


/* ==========================================
   MOVE LEFT
   ========================================== */

function moveLeft() {

    if (paused)
        return;

    playerPosition -= 8;

    if (playerPosition < 5)
        playerPosition = 5;

    player.style.left =
        playerPosition + "%";

}


/* ==========================================
   MOVE RIGHT
   ========================================== */

function moveRight() {

    if (paused)
        return;

    playerPosition += 8;

    if (playerPosition > 95)
        playerPosition = 95;

    player.style.left =
        playerPosition + "%";

}


/* ==========================================
   KEYBOARD
   ========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowLeft") {

            moveLeft();

        }

        if (event.key === "ArrowRight") {

            moveRight();

        }

    }
);


/* ==========================================
   MOBILE BUTTONS
   ========================================== */

document
    .getElementById("leftBtn")
    .addEventListener(
        "click",
        moveLeft
    );


document
    .getElementById("rightBtn")
    .addEventListener(
        "click",
        moveRight
    );


/* ==========================================
   CREATE HEART
   ========================================== */

function createHeart() {

    if (paused || score >= 5)
        return;


    const heart =
        document.createElement("div");

    heart.className =
        "heart";

    heart.innerText =
        "❤️";


    heart.style.left =
        Math.random() * 90 + "%";

    heart.style.top =
        "-40px";


    game.appendChild(heart);


    let position = -40;


    const fall =
        setInterval(
            function() {

                if (paused)
                    return;


                position += 3;

                heart.style.top =
                    position + "px";


                const heartRect =
                    heart.getBoundingClientRect();

                const playerRect =
                    player.getBoundingClientRect();


                /* Collision */

                if (

                    heartRect.bottom >=
                    playerRect.top &&

                    heartRect.left <
                    playerRect.right &&

                    heartRect.right >
                    playerRect.left

                ) {

                    score++;

                    scoreText.innerText =
                        score;


                    heart.remove();

                    clearInterval(fall);


                    if (questions[score]) {

                        showQuestion(
                            score
                        );

                    }


                    if (score >= 5) {

                        setTimeout(
                            showFinal,
                            500
                        );

                    }

                }


                /* Missed */

                if (position > 500) {

                    heart.remove();

                    clearInterval(fall);

                }

            },
            30
        );

}


/* ==========================================
   SHOW QUESTION
   ========================================== */

function showQuestion(number) {

    paused = true;


    const q =
        questions[number];


    if (q.textAnswer) {

        textQuestionBox
            .classList
            .remove("hidden");

        return;

    }


    questionEmoji.innerText =
        q.emoji;


    questionNumber.innerText =
        "QUESTION " + number;


    question.innerText =
        q.text;


    answers.innerHTML =
        "";


    q.answers.forEach(
        function(item) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-btn";


            button.innerText =
                item.text;


            button.onclick =
                function() {

                    saveAnswer(
                        q.text,
                        item.text
                    );


                    questionBox
                        .classList
                        .add("hidden");


                    showReaction(
                        item
                    );

                };


            answers.appendChild(
                button
            );

        }
    );


    questionBox
        .classList
        .remove("hidden");

}


/* ==========================================
   TEXT ANSWER
   ========================================== */

function submitTextAnswer() {

    const answer =
        textAnswer.value.trim();


    if (answer === "") {

        alert(
            "Come on Lotte 😂❤️ Type something!"
        );

        return;

    }


    saveAnswer(
        "Who am I to you?",
        answer
    );


    textAnswer.value =
        "";


    textQuestionBox
        .classList
        .add("hidden");


    showReaction({

        reaction: "🥹❤️",

        title: "Awww... 👀❤️",

        message:
            "I hope you meant something nice. 😂💕"

    });

}


/* ==========================================
   SHOW REACTION
   ========================================== */

function showReaction(item) {

    reactionEmoji.innerText =
        item.reaction;

    reactionTitle.innerText =
        item.title;

    reactionText.innerText =
        item.message;


    reactionBox
        .classList
        .remove("hidden");

}


/* ==========================================
   CLOSE REACTION
   ========================================== */

function closeReaction() {

    reactionBox
        .classList
        .add("hidden");


    paused = false;

}


/* ==========================================
   FINAL SCREEN
   ========================================== */

function showFinal() {

    finalBox
        .classList
        .remove("hidden");

}


/* ==========================================
   SAVE TO GOOGLE SHEETS
   ========================================== */

function saveAnswer(
    questionText,
    answerText
) {

    if (
        GOOGLE_SCRIPT_URL ===
        "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {

        console.log(
            "Google Apps Script URL not added."
        );

        return;

    }


    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body: JSON.stringify({

                question:
                    questionText,

                answer:
                    answerText

            })

        }
    );

}


/* ==========================================
   HEART SPAWNER
   ========================================== */

setInterval(
    function() {

        createHeart();

    },
    800
);