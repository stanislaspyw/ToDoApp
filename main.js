const todoForm = document.getElementById("todo-form")

window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || []

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault()
        if (e.target.elements.newTask.value != "") {
            const todo = {
                task: e.target.elements.newTask.value,
                category: e.target.elements.category.value
            }
    
            todos.push(todo);
    
            localStorage.setItem("todos", JSON.stringify(todos));
    
            e.target.reset()
    
            showList()
        }
    })
    
    showList();
})

function showList() {
    let outPut = '';
    let taskListShow = document.querySelector(".todoList")

    todos.forEach((data, index)=> {

        const curColor = data.category == "Personal" ? "blue" : "red"

        outPut += `
        <div class="row todoList mb-3">
            <div class="col-10 col-lg-8 col-md-7 col-sm-6">
                <input id="todoContent" class="todoContent no-border w-100" style="background-color: ${curColor} !important" value="${data.task}" readonly>
            </div>
            <div class="col">
                <div class="row action">
                    <div class="col-6">
                        <button type="button" class="btn btn-secondary col-12" onClick="editItem(${index})">Edit</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-danger col-12" onClick="deleteItem(${index})">Delete</button>
                    </div>       
                </div>
            </div>
        </div>`
    });
    taskListShow.innerHTML = outPut;
}

function deleteItem(index) {
    let text = "Are you sure you want to delete this task?"
    if (confirm(text) == true) {
        todos.splice(index, 1)
        localStorage.setItem("todos", JSON.stringify(todos))
        showList()
    }
}

function editItem(index) {
    const taskAllName = document.querySelectorAll(".todoContent");
    const taskName = taskAllName[index];
    taskName.removeAttribute("readonly");
    taskName.focus();
    taskName.addEventListener("blur", (e) => {
        const newValue = e.target.value;
        const newTodos = todos.map((todo, i) =>
          i === index ? { ...todo, task: newValue } : { ...todo }
        );
        taskName.setAttribute("readonly", true);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        todos = newTodos;
        showList();
    });
}