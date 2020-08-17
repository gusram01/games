import { Choice, choice, Color } from "./choice";


const buttons = document.querySelector('.button_container') as HTMLDivElement;
let arrayPC: Choice[] = [];
let arrayPlayer: Choice[];
let counter = 0;

const finish = () => {
  console.log(`Level ${arrayPC.length - 1}`);
  arrayPlayer = [];
  arrayPC = [];
  buttons.removeEventListener('click', playerTurn);
  init();
  console.log('Play Again ??!');

}

const compareSelections = () => {
  buttons.removeEventListener('click', playerTurn);

  if (arrayPC.length === arrayPlayer.length) {
    const flag = arrayPC
      .every((currentElement, index) => currentElement.name === arrayPlayer[index].name);
    return (!flag) ? finish() : play();

  } else {
    return finish();
  }

}

const playerTurn = (e: Event) => {
  const element = e.target as HTMLButtonElement;
  const colorSelect = element.id as Color;
  const playerSelect = choice.find(ele => ele.name === colorSelect) as Choice;

  arrayPlayer.unshift(playerSelect);
}

const callPlayer = () => {
  console.log('array PC: ', arrayPC);
  buttons.addEventListener('click', playerTurn);
  window.setTimeout(compareSelections, 2000 + (arrayPC.length * 600));
}

const setChoice = () => {
  const randomId = Math.round(Math.random() * 4);
  const randomChoice = choice.find(ele => ele.id === randomId) as Choice;
  return counter = arrayPC.unshift(randomChoice) - 1;
}

const animateButton = (): any => {
  const animateColor = arrayPC[counter].name;
  const btn = document.getElementById(`${animateColor}`) as HTMLButtonElement;

  if (counter === 0) {
    btn.classList.toggle('after');
    window.setTimeout(() => { btn.classList.toggle('after') }, 300);

    return window.setTimeout(callPlayer, 450);

  } else {
    btn.classList.toggle('after');
    window.setTimeout(() => { btn.classList.toggle('after') }, 300);
    counter--;

    return window.setTimeout(animateButton, 350);
  }
}

const play = () => {
  arrayPlayer = [];
  setChoice();
  animateButton();
}


/**
 * ==========================================
 *    Export functions - Simon Connection
 * ==========================================
 */

export const init = () => {
  const letsPlay = document.getElementById('lets_play') as HTMLButtonElement;

  letsPlay.textContent = "Let's Play";
  letsPlay.addEventListener('click', play, { once: true });
}