import { character, whosDefeat, Character, Choice, Defeat } from './choice';
import { store } from './store';

const sound = document.createElement('audio') as HTMLAudioElement;
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
  const idCount = window.setTimeout(countThree, 1000);

  indicator.style.setProperty('--sec', `${iteratorCount3}`);
  indicator.nextElementSibling!.textContent = `${4 - iteratorCount3}`;
  iteratorCount3++;

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
  const data = whosDefeat.find(obj => obj.name === playerChoice) as Defeat;
  (data.win.includes(pcChoice))
    ? (store.data.winner = 'Player WIN!!'
      , store.data.win++
      , store.data.games++)
    : (store.data.winner = 'Player Lose'
      , store.data.lose++
      , store.data.games++)
}

const game = (playerSelection: Choice) => {
  const pcHands = document.getElementById('hand_container_pc') as HTMLDivElement;
  const { name, deg } = setChoice();

  window.removeEventListener('click', playerHit);

  pcHands.style.setProperty('--spyro', `${deg}`);
  store.data.lastplayer = `${playerSelection.toLowerCase()}`;
  store.data.lastpc = `${name.toLowerCase()}`;

  (playerSelection === name)
    ? tiedGame()
    : isWinner(playerSelection, name);

  statsDashboard.classList.toggle('after');
  showStats();

  return window.setTimeout(init, 800);
}

const playerHit = (e: Event) => {
  const element = e.target as HTMLElement;

  if (element.matches('.play')) {
    const selection = element.id as Choice;
    iteratorCount3 = 1;
    sound.src = '/assets/audio/wav4.wav';
    sound.play();
    window.clearTimeout(idCount3);
    window.clearTimeout(idPlayerDontChoose);
    indicator.style.setProperty('--sec', `0`);
    indicator.nextElementSibling!.textContent = 'Play Again ?!';
    game(selection);
  };
}

const letsPlay = () => {
  const randomChoice = setChoice().name;
  const playerDontChoose =
    window.setTimeout(game, 3000, randomChoice);

  sound.src = '/assets/audio/wav4.wav';
  sound.play();

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


