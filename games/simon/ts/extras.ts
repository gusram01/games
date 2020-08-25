import { Store, store } from './store';



/**
 * ==========================================
 *                 Minor Utils
 * ==========================================
 */

const getHistory = () => {
  const data = localStorage.getItem('s1m0n');
  let users: Store[];
  (!data)
    ? users = []
    : users = JSON.parse(data);
  return users;
}


export const showStats = () => {
  Object.keys(store).forEach(key => {
    const element = document.getElementById(key) as HTMLElement;
    //@ts-expect-error
    element.textContent = store[key].toString();
  });
}

export const saveStorage = () => {
  const data = getHistory();
  data.push(store);
  data.sort((firstEle, secondEle) => secondEle.score - firstEle.score);
  localStorage.setItem('s1m0n', JSON.stringify(data));
}


/**
 * ==========================================
 *                Render History
 * ==========================================
 */

const renderStats = () => {
  const data = getHistory();
  const fragment = new DocumentFragment();

  if (data.length <= 0) {
    const trow = document.createElement('tr');
    trow.className = 'trow';
    trow.innerHTML = `
      <tr class="trow">
        <td class="tcell stats">0</td>
        <td class="tcell stats">0</td>
        <td class="tcell stats">0</td>
        <td class="tcell stats">0</td>
      </tr>
      `;
    fragment.appendChild(trow);
    return fragment;
  } else {
    data.forEach(user => {
      const trow = document.createElement('tr');
      trow.className = 'trow';
      trow.innerHTML = `
        <tr class="trow">
          <td class="tcell stats">${user.user}</td>
          <td class="tcell stats">${user.level}</td>
          <td class="tcell stats">${user.score}</td>
          <td class="tcell stats">${user.date}</td>
        </tr>
        `;
      fragment.appendChild(trow);
    });
    return fragment;
  }

}


/**
 * ==========================================
 *                General Modal
 * ==========================================
 */


export const modal = (e: Event) => {
  const form = document.querySelector('.form_nick') as HTMLFormElement;
  const history = document.querySelector('.history') as HTMLTableElement;
  const historyBody = document.querySelector('.history_body') as HTMLTableElement;
  const modalContainer = document.querySelector('.change_nick') as HTMLDivElement;
  const element = e.target as HTMLElement;

  e.preventDefault();

  if (element.matches('.change')) {
    form.classList.toggle('after');
    return modalContainer.classList.toggle('after')
  };

  if (element.matches('.change_nick')) {
    historyBody.innerHTML = '';
    form.classList.remove('after');
    history.classList.remove('after');
    return modalContainer.classList.toggle('after')
  };

  if (element.matches('.btn_history')) {
    const fragment = renderStats();
    historyBody.appendChild(fragment.cloneNode(true));
    history.classList.toggle('after');
    return modalContainer.classList.toggle('after')
  };

  if (element.matches('.modal_close')) {
    historyBody.innerHTML = '';
    form.classList.remove('after');
    history.classList.remove('after');
    return modalContainer.classList.toggle('after')
  }

  if (element.matches('.form_btn')) {
    const nick = document.getElementById('nick') as HTMLInputElement;
    const data = nick.value;

    (data.trim().length > 0)
      ? store.user = data
      : store.user = 'AAA';

    showStats();
    form.classList.toggle('after');
    return modalContainer.classList.toggle('after')
  };

}
