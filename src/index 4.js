const { createStore } = require("redux");


const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

//data를 수정하는 곳
const countModifier = (count = 0, action) => {
//countModifier는 현재 상태의 application과 함께 불려지는 function이다
//현재의 상태가 없다면 0으로 끝난다.
//그리고 action과 함께 불려진다
//action은 countModifier과 소통하는 방법 !
//countModifier가 return하는 것은, application의 state이 된다.
//reducer가 리턴하는 것은 무엇이든지 application의 state가 된다.
//만약에 사용자가 "hello"가 리턴하면, 그것이 나의 어플리케이션의 상태가 된다.
//reducer가 리턴하는 것은 무엇이든지 어플리케이션의 state
//리듀서가 current state와 action과 함께 불려진다.
//어떻게 reducer에게 action을 보내는지 ? -> dispatch를 이용해서
  if (action.type === "ADD"){
    //console.log("they are telling me to add one");
    //만약 아래와 같이 적는다면
    return count + 1;
  } else if(action.type === "MINUS"){
    return count - 1;
  } else {
    return count;
  }
  //console.log(count, action)
}

const countStore = createStore(countModifier);
const onChange = () => { 
  //console.log("there was a change on the store");
  console.log(countStore.getState());
  number.innerText = countStore.getState();
  //innerText : html을 업데이트 시켜주는 function
}
countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: "ADD"})
  //dispatch가 리듀서를 불러서 current state와 그리고 내가 보낸 action을 더한다.
  //action은 object여야한다. string이 될 수는 없다.
  //action은 modifier와 communicate 하는 방법이다.
  //만약 change를 store에서 감지하고 싶다면, 그 change를 구독하면 된다.
}
const handleMinus = () => {
  countStore.dispatch({ type: "MINUS"})
}

//add.addEventListener("click", () => countStore.dispatch({ type: "ADD"}));
//minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS"}));

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);