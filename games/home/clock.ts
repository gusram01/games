const clockHands = document.getElementById('clock-hands') as HTMLDivElement;
const time = new Date();
const mins = time.getMinutes();
const secs = time.getSeconds();
const hrs = time.getHours();
let init = (3600 * hrs) + (mins * 60) + secs + 1;




export const insertMarks = (parent: HTMLElement) => {
  const fragment = new DocumentFragment();

  for (let i = 0; i < 24; i++) {
    const div = document.createElement('div');
    div.setAttribute('class', 'mark');
    div.innerHTML = `
      <span class="mark_min">&mdash;</span>
      <span class="mark_min">&mdash;</span>
    `;
    fragment.appendChild(div);
  }
  parent.appendChild(fragment.cloneNode(true));
}

export const styleMarks = (parent: HTMLElement, childrenClass: string) => {
  const array = parent.querySelectorAll(childrenClass) as NodeListOf<HTMLDivElement>;
  let deg = 1;

  array.forEach(element => {
    (deg % 5 === 0) ? deg++ : deg;
    element.style.transform = `rotateZ(${6 * deg++}deg)`;
  })
}


export const timer = () => {
  clockHands.style.setProperty('--sec', `${init}`);
  clockHands.style.setProperty('--min', `${init / 10}`);
  clockHands.style.setProperty('--hr', `${init / 120}`);
  init++;
  window.setTimeout(timer, 1000);
};

