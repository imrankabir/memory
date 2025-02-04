const btn = document.querySelector('#btn');
const div = document.querySelector('#number');
const score = document.querySelector('#score');
const input = document.querySelector('#input');
const message = document.querySelector('#message');
let number = '';

const get = (k, d) => JSON.parse(localStorage.getItem(`number-memory-${k}`)) ?? d;
const set = (k, v) => localStorage.setItem(`number-memory-${k}`, JSON.stringify(v));

const startGame = e => {
    btn.disabled = true;
    btn.textContent = 'Check';
    number = Math.floor(Math.random() * 1000000).toString();
    div.textContent = number;
    input.style.display = 'none';
    input.value = '';
    message.textContent = 'Memorize the number...';
    setTimeout(() => {
        div.textContent = '';
        message.textContent = 'Now enter the number:';
        input.style.display = 'block';
        btn.disabled = false;
        input.focus();
    }, 3000);
};

const check = e => {
    if (input.value === '') {
        return false;
    }
    btn.disabled = true;
    let {total} = get('total', {total: 0});
    total++;
    set('total', {total});
    let {correct} = get('correct', {correct: 0});
    if (input.value === number) {
        correct++;
        set('correct', {correct});
        message.classList.add('correct');
        message.textContent = 'Correct! You have a great memory!';
    } else {
        message.classList.add('wrong');
        message.textContent = `Incorrect! The number was ${number}`;
    }
    setTimeout(() => {
        message.classList.remove('correct');
        message.classList.remove('wrong');
        message.textContent = 'Start again!';
        btn.disabled = false;
    }, 3000);
    score.textContent = `${correct} / ${total}`;
    input.value = '';
    input.style.display = 'none';
    btn.textContent = 'Start Game';
};

(event => {
    const {correct} = get('correct', {correct: 0});
    const {total} = get('total', {total: 0});
    score.textContent = `${correct} / ${total}`;
    btn.addEventListener('click', e => (btn.textContent == 'Check') ? check() : startGame());
    input.addEventListener('keypress', e => (e.key === 'Enter') && check());
})();