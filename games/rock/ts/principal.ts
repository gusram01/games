import { character, whosDefeat, Character, Choice } from './choice';
import { store } from './store';

const root = document.documentElement;
const btnPlay = document.getElementById('lets_play') as HTMLButtonElement;
const statsDashboard = document.getElementById('card-stats') as HTMLDivElement;
let idTimer = 0;
let counter = 1;
let idCounter = 0;

/**
 * ==========================================
 *              Secondary functions
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
  root.style.setProperty('--sec', `${counter}`);
  counter++;
  const idCount = window.setTimeout(setTimer, 1000);
  if (counter > 4) {
    counter = 1;
    root.style.setProperty('--sec', `0`);
    return window.clearInterval(idCount);
  }
  return idCounter = idCount;
}

const showStats = () => {
  const _games = document.getElementById('games') as HTMLTableDataCellElement;
  const _win = document.getElementById('win') as HTMLTableDataCellElement;
  const _lose = document.getElementById('lose') as HTMLTableDataCellElement;
  const _tied = document.getElementById('tied') as HTMLTableDataCellElement;
  const { win, lose, tied } = store.data;

  _games.textContent = (+win + +lose + +tied).toString();
  _win.textContent = win.toString();
  _lose.textContent = lose.toString();
  _tied.textContent = tied.toString();
}


const tiedGame = () => {
  console.log('tied');
  store.data.tied++;
}

const isWinner = (playerChoice: Choice, pcChoice: Choice) => {
  const data = whosDefeat.find(obj => obj.name === playerChoice);
  (data!.win.includes(pcChoice))
    ? (console.log(`player win`)
      , store.data.win++)
    : (console.log(`pc win`)
      , store.data.lose++);
}

const game = (playerSelection: Choice) => {
  window.removeEventListener('click', play);
  statsDashboard.classList.toggle('after');
  const pcHands = document.getElementById('hand_container_pc') as HTMLDivElement;
  const { name, deg } = setChoice();

  pcHands.style.setProperty('--spyro', `${deg}`);

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
    window.clearInterval(idCounter);
    counter = 1;
    root.style.setProperty('--sec', `0`);
    window.clearInterval(idTimer);
    game(selection);
  };
}

const letsPlay = () => {
  const randomChoice = setChoice().name;
  // something must hapend to indicator 
  setTimer();

  const id = window.setTimeout(() => {
    game(randomChoice);
  }, 3000);
  // something must hapend to btn 
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
      `rotateY(${deg += 72}deg) translateZ(110px)`;
  });
}

export const init = () => {
  btnPlay.addEventListener('click', letsPlay, { once: true });
}


