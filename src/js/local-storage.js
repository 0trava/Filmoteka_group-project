const KEY_WATCHED = 'watched';
const KEY_QUEUE = 'queue';

export const watched = getWatched() || [];
export const queue = getQueue() || [];

export function setWatched(array) {
  localStorage.setItem(KEY_WATCHED, JSON.stringify(array));
}

export function setQueue(array) {
  localStorage.setItem(KEY_QUEUE, JSON.stringify(array));
}

export function getWatched() {
  return JSON.parse(localStorage.getItem(KEY_WATCHED));
}
export function getQueue() {
  return JSON.parse(localStorage.getItem(KEY_QUEUE));
}
