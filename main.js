//getting all required elements
const inputBox = document.querySelector(".input-group input");
const addBtn = document.querySelector(".input-group button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => { //onKeyUp 키를 입력하면 문자 입력 후에 이벤트 발생
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //문자입력하면 if user values aren't only spaces
        addBtn.classList.add("active"); //active the add button 버튼색이 채워진다
    } else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks();

// if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); // localstorage저장소 가져오기
    if(getLocalStorage == null){ //if localStorage is null 로컬스토리지가 null이라면 비워져있다면
        listArr = []; //creating blank array 빈배열을 만들어낸다
    } else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object, JSON 문자열의 구문을 분석하고 그 결과에서 JavaScript 값이나 객체를 생성한다
    }
    listArr.push(userData); //pushing ar adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string, JS값이나 객체를 JSON문자열로 변환한다
    showTasks(); //calling showTasks function
    addBtn.classList.remove("active");
}

//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){ //if localStorage is null 로컬스토리지가 null이라면 비워져있다면
        listArr = []; //creating blank array 빈배열을 만들어낸다
    } else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object, JSON 문자열의 구문을 분석하고 그 결과에서 JavaScript 값이나 객체를 생성한다
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length > 0){ //만약 리스트에 하나라도 추가된다면
        deleteAllBtn.classList.add("active"); //active the clearall button
    } else{
        deleteAllBtn.classList.remove("active"); //unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => { //주어진 함수를 배열 요소 각각에 대해 실행한다
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    showTasks(); //calling showTasks function
}

//delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty an array
    // after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    showTasks();
}