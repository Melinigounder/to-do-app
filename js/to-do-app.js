window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const dataElement = document.getElementById("date");
    const newTodoForm = document.querySelector('#new-todo-form');
    const errorElement = document.getElementById('error')
    //Show todays date
    const options = { weekday: "long", month: "short", day: "numeric" };
    const today = new Date();
    dataElement.innerHTML = today.toLocaleDateString("en-ZA", options);

    //New to do form
    newTodoForm.addEventListener('submit', e => {
        let messages =[]
        
        if(todos.value ==='' || todos.value == null){
        }

        if (messages.length>0){
        e.preventDefault();
        errorElement.innerText= messages.join(',')
    }
        //alert('Please add Task')
        
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);
        
        localStorage.setItem('todos', JSON.stringify(todos));

      
        e.target.reset();

        DisplayTodos();

    })

    DisplayTodos();
})


//Function
function DisplayTodos() {

    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {

        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
               todoItem.classList.add('done');
            } else {
             todoItem.classList.remove('done');
            }

            DisplayTodos();

        })
    
    
        //Edit Button
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            edit.innerText = "Save";
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        //Delete Button
        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

    })

}