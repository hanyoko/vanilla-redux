import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteToDo } from "../store";

export default function Detail() {
const param = useParams();
const navigate = useNavigate();
console.log(param); // {id: ' '} 모양의 객체
const {id} = param; // 여기서 id 내용은 text이다.
const todo = useSelector((state)=> state);
const detail = todo.find((item)=> item.text === id);
const ID = detail.id;
const dispatch = useDispatch();

const onDelete =()=>{
dispatch(deleteToDo(ID))
navigate("/");
};
return (
    <div>
        <Link to="/">Home</Link>
        <h1>{detail?.text}</h1>
        <h3>createdAt {detail?.id}</h3>
        <button onClick={onDelete}>DELETE</button>
    </div>)
}