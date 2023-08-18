const { createStore } = require("redux");


const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

//상수로 설정한 이유
//string으로 "ADD" 또는 "MINUS" 로 입력했을 때, 오타를 감지할 수 없다.
//상수로 설정하고 입력하면 자바스크립트에서 오류를 확인하고 오류를 출력한다 !
//더 안전한 방법이다.
const ADD = "ADD";
const MINUS = "MINUS";

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
  
//if else 조건문 대신 switch로 변경
  switch (action.type){
    case ADD :
      return count + 1;
    case MINUS :
      return count - 1;
    default :
      return count;
  }
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
  countStore.dispatch({ type: ADD})
  //dispatch가 리듀서를 불러서 current state와 그리고 내가 보낸 action을 더한다.
  //action은 object여야한다. string이 될 수는 없다.
  //action은 modifier와 communicate 하는 방법이다.
  //만약 change를 store에서 감지하고 싶다면, 그 change를 구독하면 된다.
}
const handleMinus = () => {
  countStore.dispatch({ type: MINUS})
}

//add.addEventListener("click", () => countStore.dispatch({ type: "ADD"}));
//minus.addEventListener("click", () => countStore.dispatch({ type: "MINUS"}));

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);