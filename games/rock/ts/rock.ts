import '../css/rock.css';
import '../rock.html';
import '../../../assets/rock-img.png';
import { init } from './principal';

const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate}®`;
spanFooter.style.fontWeight = '600';

init();