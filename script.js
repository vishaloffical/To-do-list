// script.js
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.appendChild(createDeleteButton());
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks();
    }
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = function(event) {
        event.stopPropagation();
        event.target.parentElement.remove();
        saveTasks();
    };
    return button;
}

function saveTasks() {
    const taskList = Array.from(document.getElementById('task-list').children).map(li => ({
        text: li.textContent.replace('Delete', '').trim(),
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.appendChild(createDeleteButton());
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(taskItem);
    });
}
