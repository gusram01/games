import { character, whosDefeat, Character, Choice } from './choice';

const btnPlay = document.getElementById('lets_play') as HTMLButtonElement;
let idTimer = 0;

/**
 * ==========================================
 *              Secondary functions
 * ==========================================
 */

const setChoice = () => {
  const id = 72 * Math.round(Math.random() * 4);
  const deg = id + 360 * 8;
  const { name } = character.find(ele => ele.id === id) as Character;
  return { name, deg };
}

const tiedGame = () => {
  console.log('Empate');
}

const isWinner = (playerChoice: Choice, pcChoice: Choice) => {
  const data = whosDefeat.find(obj => obj.name === playerChoice);
  (data!.win.includes(pcChoice))
    ? console.log(`player: ${playerChoice}, pc: ${pcChoice}       yes`)
    : console.log(`player: ${playerChoice}, pc: ${pcChoice}       nop`);
}

const game = (playerSelection: Choice) => {
  window.removeEventListener('click', play);
  const pcHands = document.getElementById('hand_container_pc') as HTMLDivElement;
  const { name, deg } = setChoice();

  pcHands.style.setProperty('--spyro', `${deg}`);

  (playerSelection === name)
    ? tiedGame()
    : isWinner(playerSelection, name);
  return setTimeout(() => {
    console.log('play again');
    init()
  }, 3500);
}

const play = (e: Event) => {
  const element = e.target as HTMLElement;

  if (element.className.split(' ').includes('play')) {
    const selection = element.id as Choice;
    window.clearInterval(idTimer);
    game(selection);
  };
}

const letsPlay = () => {
  const randomChoice = setChoice().name;
  const id = window.setTimeout(() => {
    game(randomChoice);
  }, 3000);
  // something must hapend to btn 
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
      `rotateZ(${deg += 72}deg) rotateX(90deg) translateY(150%)`;
  });
}

export const init = () => {
  btnPlay.addEventListener('click', letsPlay, { once: true });
}


