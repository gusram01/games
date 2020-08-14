import { character, whosDefeat, Character, Choice } from './choice';
import { store } from './store';

const indicator = document.getElementById('mini-inidcator') as HTMLDivElement;
const btnPlay = document.getElementById('lets_play') as HTMLButtonElement;
const statsDashboard = document.getElementById('card-stats') as HTMLDivElement;
let idTimer = 0;
let counter = 1;
let idCounter = 0;

/**
 * ==========================================
 *                Utilities
 * ==========================================
 */

const setChoice = () => {
  const id = 72 * Math.round(Math.random() * 4);
  let deg = 0;
  deg += id + 360 * 2;
  const { name } = character.find(ele => ele.id === id) as Character;
  return { name, deg };
}

const setTimer = () => {
  indicator.style.setProperty('--sec', `${counter}`);
  indicator.nextElementSibling!.textContent = `${4 - counter}`;
  counter++;
  const idCount = window.setTimeout(setTimer, 1000);
  if (counter > 4) {
    counter = 1;
    indicator.style.setProperty('--sec', `0`);
    indicator.nextElementSibling!.textContent = 'Play Again ?!';
    return window.clearTimeout(idCount);
  }
  return idCounter = idCount;
}

const showStats = () => {
  const _games = document.getElementById('games') as HTMLTableDataCellElement;
  const _win = document.getElementById('win') as HTMLTableDataCellElement;
  const _lose = document.getElementById('lose') as HTMLTableDataCellElement;
  const _tied = document.getElementById('tied') as HTMLTableDataCellElement;
  const _winner = document.getElementById('show-winner') as HTMLSpanElement;
  const _last = document.getElementById('last-move') as HTMLSpanElement;
  const { win, lose, tied, winner, lastmove } = store.data;

  _games.textContent = (+win + +lose + +tied).toString();
  _win.textContent = win.toString();
  _lose.textContent = lose.toString();
  _tied.textContent = tied.toString();
  _winner.textContent = winner;
  _last.textContent = lastmove.toUpperCase();
}

/**
 * ==========================================
 *              Secondary functions
 * ==========================================
 */

const tiedGame = () => {
  store.data.winner = 'Tied Game';
  store.data.tied++;
}

const isWinner = (playerChoice: Choice, pcChoice: Choice) => {
  const data = whosDefeat.find(obj => obj.name === playerChoice);
  (data!.win.includes(pcChoice))
    ? (store.data.winner = 'You WIN!!'
      , store.data.win++)
    : (store.data.winner = 'You Lose'
      , store.data.lose++);
}

const game = (playerSelection: Choice) => {
  window.removeEventListener('click', play);
  statsDashboard.classList.toggle('after');
  const pcHands = document.getElementById('hand_container_pc') as HTMLDivElement;
  const { name, deg } = setChoice();

  pcHands.style.setProperty('--spyro', `${deg}`);
  store.data.lastmove = `${playerSelection}`;

  (playerSelection === name)
    ? tiedGame()
    : isWinner(playerSelection, name);

  showStats();
  return setTimeout(() => {
    init()
  }, 500);
}

const play = (e: Event) => {
  const element = e.target as HTMLElement;

  if (element.className.split(' ').includes('play')) {
    const selection = element.id as Choice;
    window.clearTimeout(idCounter);
    counter = 1;
    indicator.style.setProperty('--sec', `0`);
    indicator.nextElementSibling!.textContent = 'Play Again ?!';
    window.clearTimeout(idTimer);
    game(selection);
  };
}

const letsPlay = () => {
  const randomChoice = setChoice().name;

  const id = window.setTimeout(() => {
    game(randomChoice);
  }, 3000);

  setTimer();

  statsDashboard.classList.toggle('after');
  window.addEventListener('click', play);

  return idTimer = id;
};

/**
 * ==========================================
 *    Export functions - Rock Connection
 * ==========================================
 */

export const setHands = () => {
  const hands = document.querySelectorAll('.hand_pc') as NodeListOf<HTMLDivElement>;
  let deg = 0;
  hands.forEach(hand => {
    hand.style.transform =
      `rotateY(${deg += 72}deg) translateZ(250px)`;
  });
}

export const init = () => {
  btnPlay.addEventListener('click', letsPlay, { once: true });
}


