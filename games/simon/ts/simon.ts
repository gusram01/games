import '../css/simon.css'
import '../../../assets/rock-img.png'

// https://www.myinstants.com/instant/street-fighter-ii-coin/?utm_source=copy&utm_medium=share
// https://www.myinstants.com/instant/round-street-fight-80055/?utm_source=copy&utm_medium=share
// https://www.myinstants.com/instant/fight-street-fight-82560/?utm_source=copy&utm_medium=share

const hands = document.querySelectorAll('.hand') as NodeListOf<HTMLDivElement>;

const play = (e: Event) => {
  const element = e.target as HTMLElement;

  if (element.id === 'play') {
    let deg = 0;
    const random = Math.random();
    (random)
      ? deg = -72 * Math.round(random * 8000)
      : deg = -72 * Math.round(random * 2000);

    const x = element.parentElement!.firstElementChild as HTMLElement;
    // x.style.transform = `rotateZ(${deg}deg) rotateX(60deg)`;
    x.style.setProperty('--spyro', `${deg}`);
    console.log(deg % 360);
  }
}

(function setHands() {
  let deg = 0;
  hands.forEach(hand => {
    hand.style.transform = `rotateZ(${deg += 72}deg) rotateX(90deg) translateY(150%)`;
  });
})();

window.addEventListener('click', play);