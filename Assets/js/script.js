// Create variables to hold data from input form
const taskDate = $('#due-date');
const taskTitle = $('#task-title');
const taskDescription = $('#task-description');

// Retrieve tasks and nextId from localStorage
let nextId = JSON.parse(localStorage.getItem("nextId"));

const addTask = $('.btn');
const submitTask = $('#submit-task')
// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextID) {
        nextId = 1; 
    }
    return nextID++;

}

localStorage.setItem("nextId", JSON.stringify(nextId));
//create click event to show modal and allow user to input information
$(addTask).on('click', function () {
    const modal = $('.modal');
    modal.css('display', 'block');
});

//create event to submit info and create task card on the page 
$(submitTask).on('click', (createTaskCard));

//create a read tasks from storage function 

function readTasksfromStorage() {
    let taskList = JSON.parse(localStorage.getItem("tasks")); 
    if (!tasks) {
        tasks = [];
    }
    return tasks;

}
//create a function to save tasks to local storage and store as an array
function saveTaskstoStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $('<div>')
        .addClass('card project-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.body);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attri('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteProject);

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}


//create event to submit info and create task card on the page 
$(submitTask).on('click', handleAddTask);

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskList = readProjectsFromStorage();
    const toDoTask = $('#todo-cards');
    const inProgressList = $('#in-progress-cards');
    const doneTask = $('#done-cards');
    toDoTask.empty();
    inProgressList.empty();
    doneTask.empty();

    // Loop to check status of cards

    for (const task of taskList) {
        if (task.status === 'to-do') {
            toDoTask.append(createTaskCard(task));
        }
        else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        }
        else if (task.status === 'done') {
            doneTask.append(createTaskCard(task));
        }
    }
    

}

 // ? Use JQuery UI to make task cards draggable
 $('.draggable').draggable({
    accept: '.draggable',
    drop: handleDrop
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
 });

 function handleDrop(event, ui) {
    const tasks = readTasksfromStorage();
    const taskId = ui.draggable.data('task-id');
    const newStatus = $(event.target).attr('id');

    for (let task of tasks) {
        if (task.id == taskId) {
            task.status = newStatus;
        }
    }

    saveTaskstoStorage(tasks);
    renderTaskList();
 }

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    

    const newTask = {
        id: generateTaskId(),
        name: taskTitle.val(),
        body: taskDescription.val(),
        dueDate: taskDate.val(),
        status: 'to-do'
        
    };

    const tasks = readTasksfromStorage();
    taksk.push(newTask);
    saveTaskstoStorage(tasks);


    renderTaskList();

    //clear the forms
    taskDate.val('');
    taskTitle.val('');
    taskDescription.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = $(event.target).data('task-id');
    let tasks = readTasksfromStorage();
    task = tasks.filter(task => task.id !== taskID);
    saveTaskstoStorage(tasks);
    renderTaskList();


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //read tasks from localStorage
    const tasks = readTasksfromStorage();

    //get project ID???
    const taskID = ui.draggable[0].dataset.taskId;
}

    const newStaus = even.target.id;

    for (let task of tasks) {
        if (task.id ===taskId){
            task.status = newStatus;
        }
        
    }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();
    $(#task)

});
