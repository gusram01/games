import { Choice, choice, Color } from './choice';
import { saveStorage, showStats } from './extras';
import { store } from "./store";

const sound = document.querySelector('.audio') as HTMLAudioElement;
const letsPlay = document.getElementById('lets_play') as HTMLButtonElement;
const buttons = document.querySelector('.button_container') as HTMLDivElement;
let arrayPC: number[] = [];
let arrayPlayer: number[];
let counter = 0;


/**
 * ==========================================
 *                  Utilities
 * ==========================================
 */


const finish = () => {
  buttons.removeEventListener('click', playerTurn);

  saveStorage();
  arrayPC = [];
  arrayPlayer = [];
  letsPlay.textContent = 'Upps, try again!!';

  window.setTimeout(init, 1000);
}

const compareSelections = (positionCompare: number) => {
  const flag = arrayPlayer[0] === arrayPC[arrayPC.length - positionCompare];
  (!flag)
    ? finish()
    : (arrayPC.length > arrayPlayer.length)
      ? callPlayer()
      : window.setTimeout(play, 600);
}


/**
 * ==========================================
 *              Secondary functions
 * ==========================================
 */

const playerTurn = (e: Event) => {
  const element = e.target as HTMLButtonElement;
  const colorSelect = element.id as Color;
  const playerSelect = choice.find(ele => ele.name === colorSelect) as Choice;

  const actualPosition = arrayPlayer.unshift(playerSelect.id);

  sound.src = `/assets/audio/${playerSelect.sound}`;
  sound.play();
  store.score += 3;
  showStats();
  compareSelections(actualPosition);
}

const callPlayer = () => {
  buttons.addEventListener('click', playerTurn, { once: true });
  letsPlay.textContent = 'Your turn';
}

const setChoice = () => {
  const randomId = Math.round(Math.random() * 4);
  const randomChoice = choice.find(ele => ele.id === randomId) as Choice;

  return counter = arrayPC.unshift(randomChoice.id) - 1;
}

const animateButton = (): any => {
  const animateColor = choice.find(ele => ele.id === +arrayPC[counter]) as Choice;
  const btn = document.getElementById(`${animateColor.name}`) as HTMLButtonElement;

  sound.src = `/assets/audio/${animateColor.sound}`;
  sound.play();

  btn.classList.toggle('after');
  store.level = (arrayPC.length - 1).toString();
  letsPlay.textContent = `Level ${arrayPC.length - 1}`;
  window.setTimeout(() => { btn.classList.toggle('after') }, 300);

  return (counter === 0)
    ? window.setTimeout(callPlayer, 600)
    : (counter--
      , window.setTimeout(animateButton, 600));
}

const play = () => {
  arrayPlayer = [];
  buttons.style.transform = `rotateZ(${arrayPC.length * 72}deg)`;
  window.setTimeout(setChoice, 300);
  window.setTimeout(animateButton, 300);
}

/**
 * ==========================================
 *    Export functions - Simon Connection
 * ==========================================
 */

export const init = () => {
  const form = document.querySelector('.form_nick') as HTMLFormElement;
  const historyBody = document.querySelector('.history_body') as HTMLTableElement;
  const modalContainer = document.querySelector('.change_nick') as HTMLDivElement;

  historyBody.innerHTML = '';
  form.classList.toggle('after');
  modalContainer.classList.toggle('after')

  store.date = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  store.score = 0;
  store.level = '0';
  letsPlay.textContent = "Let's Play";
  letsPlay.addEventListener('click', play, { once: true });
}

