// DOM에 접근
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos = [];

const addItem = (todo) => {
    if(todo.text !== ''){
        const li = document.createElement('li');
        const button = document.createElement('button');
        const span = document.createElement('span');
        const checkbox = document.createElement('input'); //체크박스 생성
        
        checkbox.type = 'checkbox'; //체크박스 타입 지정
        checkbox.addEventListener('change', checkItem);
        
        span.innerHTML = todo.text;
        button.textContent = '삭제';
        button.addEventListener('click', delItem);

        li.appendChild(checkbox); // li에 체크박스 추가
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
        li.id = todo.id;
    }
}

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const delItem = (event) => {
    const target = event.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(target.id))
    save();
    target.remove();
};

const checkItem = (event) => {
    const target = event.target.parentElement;
    const todo = todos.find((todo) => todo.id === parseInt(target.id));
    todo.completed = !todo.completed;
    save();
};

// callback 함수
const handler = (event) => {
    event.preventDefault();

    const todo = {
        id: Date.now(),
        text: input.value,
    };

    todos.push(todo);
    addItem(todo);

    save();
    input.value = '';
};

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    if(userTodos){
        userTodos.forEach((todo) => {
            addItem(todo);
        });
        todos = userTodos;
    }
};

init(); // 전역에다 치면 새로고침 할 때마다 가져와주기 때문

form.addEventListener('submit', handler);
