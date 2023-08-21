import { createStore } from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE';

export const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};
localStorage.setItem('todos', JSON.stringify([]));

const reducer = (state = JSON.parse(localStorage.getItem('todos')), action) => {
  switch (action.type) {
    case ADD:
      const newToDo = { text: action.text, id: Date.now() };
      localStorage.setItem('todos', JSON.stringify([...state, newToDo]));
      return JSON.parse(localStorage.getItem('todos'));
    
    case DELETE:
      const delToDo = state.filter((toDo) => toDo.id !== action.id);
      localStorage.setItem('todos', JSON.stringify(delToDo));
      return JSON.parse(localStorage.getItem('todos'));
    default:
      return state;
  }
};
const store = createStore(reducer);

export default store;