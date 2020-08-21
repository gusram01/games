import '../css/simon.css';
import '../simon.html';
import '../../../assets/checkers.jpg';
import { init } from './principal';
import { modal } from './extras';


const header = document.querySelector('.header') as HTMLElement;
const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate}®`;
spanFooter.style.fontWeight = '600';


init();
header.addEventListener('click', modal);

