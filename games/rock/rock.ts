import './rock.css'
import '../../assets/rock-img.png'
import { setHands, init } from './ts/principal';

// https://www.myinstants.com/instant/street-fighter-ii-coin/?utm_source=copy&utm_medium=share
// https://www.myinstants.com/instant/round-street-fight-80055/?utm_source=copy&utm_medium=share
// https://www.myinstants.com/instant/fight-street-fight-82560/?utm_source=copy&utm_medium=share

const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate} &copy;`;
setHands();
init();