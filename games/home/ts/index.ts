import '../css/styles.css';
import '../css/clock.css';
import '../index.html';
import '../../../assets/home.jpg';
import { insertMarks, styleMarks, timer } from './clock';

const cover = document.getElementById('cover') as HTMLDivElement;
const spanFooter = document.getElementById('leyend_footer') as HTMLSpanElement;
const actualYear = new Date().getFullYear();

spanFooter.innerHTML = `Gus Ramírez, ${actualYear} <sup>&copy;</sup>`;
spanFooter.style.fontWeight = '600';

insertMarks(cover);
styleMarks(cover, '.mark');
timer();

window.addEventListener('mousemove', (e: MouseEvent) => {
  const clockContainer = document.querySelector('.clock-container') as HTMLDivElement;
  const rotY = 60 - 40 * (e.y / innerHeight);
  const rotX = (e.x / innerWidth);

  clockContainer.style.setProperty('--y', rotY.toString());
  clockContainer.style.setProperty('--x', rotX.toString());
});