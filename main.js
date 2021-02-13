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
        { q: ['How many moons Jupiter has?'], c: ['79', '53', '112'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Who first landed on the Moon?'], c: ['Neil Armstrong', 'Yurii Gagarin', 'John Glenn'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which chemical element has the greatest mass?'], c: ['Sulfur', 'Oxygen', 'Carbon'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Regarding greek mythology, which god represented by a planet was eating his children?'], c: ['Saturn', 'Neptune', 'Jupiter'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['What is the name of our galaxy system?'], c: ['Milky way', 'Solar System', 'Galaxy zoo'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['How many planets are there in our Solar System?'], c: ['8', '13', '9'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['What is the fourth planet from the sun?'], c: ['Mars', 'Earth', 'Uranus'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['How many earths fit into the sun?'], c: ['One million', 'One and a half million', 'Two millions'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['The day on which the Sun’s direct rays cross the celestial equator is called?'], c: ['the equinox', 'the aphelion', 'the solstice'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which planet has the biggest volcano?'], c: ['Mars', 'Uranus', 'Saturn'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which planet rotates faster?'], c: ['Jupiter', 'Uranus', 'Mars'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Name the only planet in our solar system that has only one moon.'], c: ['Earth', 'Venus', 'Uranus'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which planet is also called the god of war?'], c: ['Mars', 'Neptune', 'Saturn'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which planet has the least gravity?'], c: ['Mercury', 'Venus', 'Earth'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] },
        { q: ['Which is the brightest planet after the Sun?'], c: ['Venus', 'Saturn', 'Neptune'], r: ['Success: You can get 1 element from another player', 'Failure: You should give 1 element to another player (if no element, skip your next turn)'] }
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