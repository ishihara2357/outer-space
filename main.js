'use strict';

{
    const question = document.getElementById('question');
    const reward = document.getElementById('reward');
    const btn = document.getElementById('btn');
    const choices = document.getElementById('choices');
    const correct = document.getElementById('correct');
    const incorrect = document.getElementById('incorrect');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = [
        { q: ['How many moons Jupiter has?'], c: ['79', '53', '112'], r: ['Success: gain 1 Hydrogen or Helium', 'Failure: lose 1 fuel or 1 element'] },
        { q: ['Who firstly landed the Moon?'], c: ['Neil Armstrong', 'Yurii Gagarin', 'John Glenn'], r: ['Success: steal 1 element from anoter player', 'Failure: give 1 element for another player'] },
        { q: ['Which chemical element has the greatest mass?'], c: ['Radium', 'Barium', 'Calcium'], r: ['Success: gain 2 fuels', 'Failure: skip next turn'] }
    ];

    let currentNum = 0;

    let isAnswered;

    let score = 0;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }

        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
            correct.classList.remove('display-none');
        } else {
            li.classList.add('wrong');
            incorrect.classList.remove('display-none');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        correct.classList.add('display-none');
        incorrect.classList.add('display-none');
        shuffle(quizSet);


        question.textContent = quizSet[currentNum].q;
        const show_reward = quizSet[currentNum].r;


        while (reward.firstChild) {
            reward.removeChild(reward.firstChild);
        }

        show_reward.forEach(gain => {
            const show = document.createElement('li');
            show.textContent = gain;
            reward.appendChild(show);
        });

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'All challenges appeared. Please reload the page.';
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = 'Score: ${score} / ${quizSet.length}';
            result.classList.add('show');
        } else {
            currentNum++;
            setQuiz();
        }
    });
}