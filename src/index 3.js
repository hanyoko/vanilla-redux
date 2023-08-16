const { createStore } = require("redux");


const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  console.log(count, action);
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

//console.log(countStore.getState());

countStore.dispatch({type : "ADD"});
countStore.dispatch({type : "ADD"});
countStore.dispatch({type : "ADD"});
countStore.dispatch({type : "ADD"});
countStore.dispatch({type : "ADD"});
countStore.dispatch({type : "MINUS"});

//return count + 1 을 했을 때
console.log(countStore.getState());