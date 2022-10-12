export const checkOne = () => ({ type: 'ONE' });
export const checkTwo = () => ({ type: 'TWO' });
export const checkThree = () => ({ type: 'THREE' });
export const checkFour = () => ({ type: 'FOUR' });
export const checkAll = () => ({ type: 'ALL' });
export const asyncAvia = () => {
  return async (dispatch) => {
    const res = await fetch('https://front-test.dev.aviasales.ru/search');
    if (!res.ok) {
      throw new Error('error');
    }
    const results = await res.json();
    const key = results.searchId;
    let bol = false;
    let arr = [];
    while (!bol) {
      let res = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${key}`);
      if (res.status !== 500 && res.status !== 200) {
        throw new Error('error');
      }
      if (res.ok) {
        const results = await res.json();
        bol = results.stop;
        arr.push(...results.tickets);
      }
      dispatch({ type: 'ASYNC', arr, bol });
    }
  };
};
export const filterPrice = () => ({ type: 'PRICE' });
export const filterFast = () => ({ type: 'FAST' });
