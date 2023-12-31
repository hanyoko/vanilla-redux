import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, deleteToDo } from '../store';
import { Link } from 'react-router-dom';

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

const onDelete =(e)=>{
    const id = e.target.id;
    dispatch(deleteToDo(id));
    };

return (
<>
    <h1> To Do </h1>
    <form onSubmit={onSubmit}>
        <input type='text' value={text} onChange={onChange} />
        <button>Add</button>
    </form>

    <ul>{toDos.map((item) => (
        <div key={item.id}>
            <Link to={`/${item.text}`}>
                <li>{item.text}</li>
            </Link>
            <button id={item.id} onClick={onDelete}>X</button>
        </div>
        ))}
    </ul>
</>
);
};

export default Home;