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

        span.innerHTML = todo.text;
        button.textContent = '삭제';
        button.addEventListener('click', delItem);

        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li); // ul에 li 추가
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
