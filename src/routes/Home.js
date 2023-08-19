import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo } from '../store';

const Home = () => {
const [text, setText] = useState('');
const toDos = useSelector((state) => state);
console.log(toDos);

const dispatch = useDispatch();

function onChange(e) {
    setText(e.target.value);
}

function onSubmit(e) {
    e.preventDefault();
    console.log(text);
    dispatch(addToDo(text));
    setText('');
}

return (
<>
    <h1> To Do </h1>
    <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button>Add</button>
    </form>

    <ul>{toDos.map((toDo) => (
        <li key={toDo?.id}>{toDo.text}</li>
        ))}
    </ul>
</>
);
};

export default Home;