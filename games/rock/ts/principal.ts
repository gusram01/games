import { character, whosDefeat, Character, Choice } from './choice';
import { store } from './store';

const indicator = document.getElementById('mini-inidcator') as HTMLDivElement;
const btnPlay = document.getElementById('lets_play') as HTMLButtonElement;
const statsDashboard = document.getElementById('card-stats') as HTMLDivElement;
let idPlayerDontChoose = 0;
let iteratorCount3 = 1;
let idCount3 = 0;

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

const countThree = () => {
  indicator.style.setProperty('--sec', `${iteratorCount3}`);
  indicator.nextElementSibling!.textContent = `${4 - iteratorCount3}`;
  iteratorCount3++;
  const idCount = window.setTimeout(countThree, 1000);
  if (iteratorCount3 > 4) {
    iteratorCount3 = 1;
    indicator.style.setProperty('--sec', `0`);
    indicator.nextElementSibling!.textContent = 'Play Again ?!';
    return window.clearTimeout(idCount);
  }
  return idCount3 = idCount;
}

const showStats = () => {
  Object.keys(store.data).forEach(key => {
    const element = document.getElementById(key) as HTMLElement;
    const data = store.data;
    //@ts-expect-error
    element.textContent = data[key].toString();
  });
}

/**
 * ==========================================
 *              Secondary functions
 * ==========================================
 */

const tiedGame = () => {
  store.data.winner = 'Tied Game';
  store.data.tied++;
  store.data.games++;
}

const isWinner = (playerChoice: Choice, pcChoice: Choice) => {
  const data = whosDefeat.find(obj => obj.name === playerChoice);
  (data!.win.includes(pcChoice))
    ? (store.data.winner = 'You WIN!!'
      , store.data.win++
      , store.data.games++)
    : (store.data.winner = 'You Lose'
      , store.data.lose++
      , store.data.games++)
}

const game = (playerSelection: Choice) => {
  window.removeEventListener('click', playerHit);
  statsDashboard.classList.toggle('after');
  const pcHands = document.getElementById('hand_container_pc') as HTMLDivElement;
  const { name, deg } = setChoice();

  pcHands.style.setProperty('--spyro', `${deg}`);
  store.data.lastmove = `${playerSelection.toUpperCase()}`;

  (playerSelection === name)
    ? tiedGame()
    : isWinner(playerSelection, name);

  showStats();
  return setTimeout(() => {
    init()
  }, 500);
}

const playerHit = (e: Event) => {
  const element = e.target as HTMLElement;

  if (element.matches('.play')) {
    const selection = element.id as Choice;
    window.clearTimeout(idCount3);
    iteratorCount3 = 1;
    indicator.style.setProperty('--sec', `0`);
    indicator.nextElementSibling!.textContent = 'Play Again ?!';
    window.clearTimeout(idPlayerDontChoose);
    game(selection);
  };
}

const letsPlay = () => {
  const randomChoice = setChoice().name;

  const playerDontChoose = window.setTimeout(() => {
    game(randomChoice);
  }, 3000);

  countThree();

  statsDashboard.classList.toggle('after');
  window.addEventListener('click', playerHit);

  return idPlayerDontChoose = playerDontChoose;
};

/**
 * ==========================================
 *    Export functions - Rock Connection
 * ==========================================
 */

export const init = () => {
  btnPlay.addEventListener('click', letsPlay, { once: true });
}


