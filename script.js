/* =========================================
   GOOGLE SHEETS CONNECTION
   ========================================= */

const GOOGLE_SCRIPT_URL =
    "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


/* =========================================
   GAME VARIABLES
   ========================================= */

let score = 0;

let playerPosition = 50;

let paused = false;


/* =========================================
   QUESTIONS
   ========================================= */

const questions = {

    2: {

        emoji: "👀",

        text:
            "Be honest... Who is more annoying? 😂",

        answers: [

            {
                text: "Obviously you 😂",

                reaction: "😭",

                title: "WOWWW 😂",

                message:
                    "I asked for honesty... not betrayal. 😭"
            },

            {
                text: "Me 😌",

                reaction: "🥹",

                title: "Good answer ❤️",

                message:
                    "At least you know yourself. 😂"
            },

            {
                text: "Both 😂",

                reaction: "🤝",

                title: "Diplomatic answer!",

                message:
                    "Okay... I'll allow it. 😂"
            }

        ]

    },


    5: {

        emoji: "📱",

        text:
            "If I say 'I'm fine'... what should you do? 😂",

        answers: [

            {
                text: "Say sorry immediately 😭",

                reaction: "😂",

                title: "Correct!",

                message:
                    "You have learned the rules. 😂❤️"
            },

            {
                text: "Run 🏃",

                reaction: "🏃",

                title: "COWARD! 😂",

                message:
                    "Come back here! 😂"
            },

            {
                text: "Bring food 🍫",

                reaction: "🍫",

                title: "Actually...",

                message:
                    "This might be the smartest answer. 😂"
            }

        ]

    },


    8: {

        emoji: "🫀",

        text:
            "Very important question... Will you give me your kidney? 🫀😂",

        answers: [

            {
                text: "Of course, take it ❤️",

                reaction: "🥹❤️",

                title: "AWWW 😭",

                message:
                    "Okay okay! Keep the other one. 😂❤️"
            },

            {
                text: "One kidney is enough 😂",

                reaction: "😂",

                title: "NEGOTIATING?!",

                message:
                    "Fine... I'll take one. For now. 😌😂"
            },

            {
                text: "NOPE! 🏃",

                reaction: "🏃💨",

                title: "EXCUSE ME?! 😭",

                message:
                    "After everything I've done for you?! 😂💔"
            }

        ]

    },


    10: {

        emoji: "🥺",

        text:
            "Last question... Do you want to meet me? ❤️",

        answers: [

            {
                text: "YES ❤️",

                reaction: "🥹❤️",

                title: "I KNEW IT! ❤️",

                message:
                    "Okay then... when are we meeting? 👀"
            },

            {
                text: "Of course 🥰",

                reaction: "😍",

                title: "GOOD ANSWER! ❤️",

                message:
                    "You better keep that promise. 😌"
            },

            {
                text: "Maybe 👀",

                reaction: "👀",

                title: "MAYBE?!",

                message:
                    "Interesting answer... I'll remember this. 😂"
            }

        ]

    }

};


/* =========================================
   HTML ELEMENTS
   ========================================= */

const game =
    document.getElementById("game");

const player =
    document.getElementById("player");

const scoreText =
    document.getElementById("score");

const questionBox =
    document.getElementById("questionBox");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const questionEmoji =
    document.getElementById("questionEmoji");

const questionNumber =
    document.getElementById("questionNumber");

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


/* =========================================
   START GAME
   ========================================= */

function startGame() {

    document
        .getElementById("startScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

}


/* =========================================
   PLAYER MOVEMENT
   ========================================= */

function moveLeft() {

    if (paused) return;

    playerPosition -= 8;

    if (playerPosition < 5) {

        playerPosition = 5;

    }

    player.style.left =
        playerPosition + "%";

}


function moveRight() {

    if (paused) return;

    playerPosition += 8;

    if (playerPosition > 95) {

        playerPosition = 95;

    }

    player.style.left =
        playerPosition + "%";

}


/* =========================================
   KEYBOARD
   ========================================= */

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


/* =========================================
   PHONE BUTTONS
   ========================================= */

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


/* =========================================
   CREATE FALLING HEART
   ========================================= */

function createHeart() {

    if (paused || score >= 10)
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
        setInterval(function() {

            if (paused) return;


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


                /* Show question */

                if (questions[score]) {

                    showQuestion(
                        score
                    );

                }


                /* Final screen */

                if (score >= 10) {

                    setTimeout(
                        function() {

                            finalBox
                                .classList
                                .remove(
                                    "hidden"
                                );

                        },
                        500
                    );

                }

            }


            /* Heart missed */

            if (position > 500) {

                heart.remove();

                clearInterval(fall);

            }

        }, 30);

}


/* =========================================
   SHOW QUESTION
   ========================================= */

function showQuestion(number) {

    paused = true;


    const q =
        questions[number];


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


                    /* SAVE HIS ANSWER */

                    saveAnswer(
                        q.text,
                        item.text
                    );


                    /* CLOSE QUESTION */

                    questionBox
                        .classList
                        .add(
                            "hidden"
                        );


                    /* SHOW FUNNY REACTION */

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
        .remove(
            "hidden"
        );

}


/* =========================================
   SAVE ANSWER TO GOOGLE SHEET
   ========================================= */

function saveAnswer(
    questionText,
    answerText
) {

    if (
        GOOGLE_SCRIPT_URL ===
        "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {

        console.log(
            "Google Script URL not added."
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


/* =========================================
   SHOW REACTION
   ========================================= */

function showReaction(item) {

    reactionEmoji.innerText =
        item.reaction;


    reactionTitle.innerText =
        item.title;


    reactionText.innerText =
        item.message;


    reactionBox
        .classList
        .remove(
            "hidden"
        );

}


/* =========================================
   CONTINUE
   ========================================= */

function closeReaction() {

    reactionBox
        .classList
        .add(
            "hidden"
        );

    paused = false;

}


/* =========================================
   START FALLING HEARTS
   ========================================= */

setInterval(
    function() {

        createHeart();

    },
    800
);