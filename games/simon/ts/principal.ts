import { Choice, choice, Color } from "./choice";
import { store } from "./store";

const letsPlay = document.getElementById('lets_play') as HTMLButtonElement;
const buttons = document.querySelector('.button_container') as HTMLDivElement;
let arrayPC: number[] = [];
let arrayPlayer: number[];
let counter = 0;

const finish = () => {
  buttons.removeEventListener('click', playerTurn);
  store.level = (arrayPC.length - 1).toString();
  console.log(`Level ${arrayPC.length - 1}`);
  arrayPlayer = [];
  arrayPC = [];
  letsPlay.textContent = 'Play Again ??!';
  init();
}

const compareSelections = (positionCompare: number) => {
  const flag = arrayPlayer[0] === arrayPC[arrayPC.length - positionCompare];
  console.log('array PC: ', arrayPC);
  console.log('array Player: ', arrayPlayer);
  (!flag)
    ? finish()
    : (arrayPC.length > arrayPlayer.length)
      ? callPlayer()
      : play();
}

const playerTurn = (e: Event) => {
  const element = e.target as HTMLButtonElement;
  const colorSelect = element.id as Color;
  const playerSelect = choice.find(ele => ele.name === colorSelect) as Choice;

  const actualPosition = arrayPlayer.unshift(playerSelect.id);
  compareSelections(actualPosition);
}

const callPlayer = () => {
  letsPlay.textContent = 'Your turn';
  buttons.addEventListener('click', playerTurn, { once: true });
}

const setChoice = () => {
  const randomId = Math.round(Math.random() * 4);
  const randomChoice = choice.find(ele => ele.id === randomId) as Choice;
  return counter = arrayPC.unshift(randomChoice.id) - 1;
}

const animateButton = (): any => {
  const animateColor = choice.find(ele => ele.id === +arrayPC[counter]);
  const btn = document.getElementById(`${animateColor?.name}`) as HTMLButtonElement;

  letsPlay.textContent = 'PC turn';
  btn.classList.toggle('after');
  window.setTimeout(() => { btn.classList.toggle('after') }, 300);

  return (counter === 0)
    ? window.setTimeout(callPlayer, 600)
    : (counter--
      , window.setTimeout(animateButton, 600));

}

const play = () => {
  arrayPlayer = [];
  window.setTimeout(() => {
    setChoice();
    animateButton();
  }, 444);
}


/**
 * ==========================================
 *    Export functions - Simon Connection
 * ==========================================
 */

export const init = () => {
  letsPlay.textContent = "Let's Play";
  letsPlay.addEventListener('click', play, { once: true });
}