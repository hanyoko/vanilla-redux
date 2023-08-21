import React from 'react';
import { useDispatch } from 'react-redux';

const ToDo = ({ text }) => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(actionCreators.deleteToDo(id));
    }
    return (
        <li>
            {text} <button onClick={onClick}>DEL</button>
        </li>
    );
};

export default ToDo;