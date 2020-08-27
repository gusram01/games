import '../css/styles.css';
import '../simon.html';
import '../../../assets/checkers.jpg';
import '../../../assets/audio/wav0.mp3';
import '../../../assets/audio/wav1.mp3';
import '../../../assets/audio/wav2.mp3';
import '../../../assets/audio/wav3.mp3';
import '../../../assets/audio/wav4.mp3';
import { init } from './principal';
import { modal } from './extras';


const header = document.querySelector('.header') as HTMLElement;
const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate}®`;
spanFooter.style.fontWeight = '600';


init();
header.addEventListener('click', modal);

