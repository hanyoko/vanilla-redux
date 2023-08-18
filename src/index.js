const { createStore } = require("redux");

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//object를 return 하는 역할
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}
                //toDos를 수정하지 않고 새로운 걸 만들어서 사용한다
const reducer = (state = [], action) => {
  console.log(action);
  //state를 mutate 하고 있지 않다. 새로운 state를 만들고 있다 !
  switch(action.type){
    //새로운 todo가 추가되면 새로운 array를 만들어서 이전에 있던 array의 내용에 플러스한다.
    //새로운 todo object를 추가
    case ADD_TODO :
      const newToDoObj = { text: action.text, id: Date.now() } 
      return [...state, newToDoObj];
      //여기서 ...state와 { text: action.text, id: Date.now() }의 순서를 바꿔주면
      //처음 입력한 todo가 아래로 내려가도록 출력된다. !
      //지금의 상태는 오래된 todo가 위에 위치한다. !

    //array에서 object를 삭제하고 있지 않다. 삭제할 object를 제외시킨 새로운 array를 만들고 있다.
    //state에서 object를 삭제하고 있지 않다. 완벽히 새로운 state를 만들고 있다.
    case DELETE_TODO :
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default :
      return state;
  }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  //새로운 todo가 생기면 list 전체를 비우고 state에 있는 각각의 toDo를 이용해서 다시 새로운 list를 만든다 !
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
}
store.subscribe(paintToDos);

//action을 dispatch 하기 위한 용도
const dispatchAddToDo = text => {
  //여기서 return 하는 object는 dispatch를 위해 이용된다.
  store.dispatch(addToDo(text));
}

const dispatchDeleteToDo = e => {
  console.log(e.target.parentNode.id);
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id))
}

// const createToDo = toDo => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);