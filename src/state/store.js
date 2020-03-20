
import { createStore } from 'redux';
import { Map } from 'immutable';
import { rootReducer } from './';

export const getNewStore = () => createStore(rootReducer);
export const store = getNewStore();

let lastState = store.getState();

const persistKeys = [
  'search',
  'filterResults'
]

/**
 * @description Check inequality between Maps or non-Maps.
 * Local use only for very limited use case, but could be
 * potentially refactored in future to a more general util.
 *
 * @param {any} x first argument to compare
 * @param {any} y second argument to compare
 *
 * @returns {boolean} true for inequality
 */
export const notEqual = (x, y) => {
  if (x instanceof Map) {
    return !x.equals(y);
  }
  return x !== y;
};

store.subscribe(() => {
  const state = store.getState();
  if (lastState === state) {
    return;
  }
 
  const diffKeys = persistKeys.filter(k => notEqual(lastState[k], state[k]));
  lastState = state;
  if (!diffKeys.length) {
    return;
  }
  const persist = persistKeys.reduce(
    // Adding the temporary new key for sort in cookies
    (a, b) =>  a.set(b, state[b]),
    Map()
  );
  try {
    // may exceed quota on value of ‘data’
    if (window.localStorage) {
      window.localStorage.setItem('data', JSON.stringify(persist.toJS()));
    }
  } catch (e) {
    console.warn(e);
  }
 });
