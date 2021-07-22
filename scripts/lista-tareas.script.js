valToken();
window.addEventListener("load", function() {
    getTasks();
    const form = document.forms.formTareas;
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addTask(form.tarea.value);
    })
});

function getTasks() {
    const url = "https://ctd-todo-api.herokuapp.com/v1";
    const token = localStorage.getItem("token")
    fetch(`${url}/tasks`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
        .then((data) => {
            return data.json()
        })
        .then((dataJs) => {
            document.querySelector("ul.tareas-terminadas").innerHTML = "";
            document.querySelector("ul.tareas-pendientes").innerHTML = "";
            const spinner = document.querySelector(".contenedor-spinner");
            const contenido = document.querySelector("#contenido");
            spinner.classList.add("hidden");
            contenido.classList.remove("hidden");
            console.log("Carga Exitosa de API");
            dataJs.forEach(function(tarea) {
                let contenedor = tarea.completed ? document.querySelector("ul.tareas-terminadas") : document.querySelector("ul.tareas-pendientes");
                renderizeTasks(tarea, contenedor, !tarea.completed);
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

function renderizeTasks(tarea, container, estado) {
    const template = `
      <li class="tarea">
        <div class="not-done" onclick=modifyTask(${tarea.id},${estado})></div>
        
          <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">Creado el: ${tarea.createdAt}</p>
          </div>
        <div class="boton-borrar not-done" onclick=deleteTask(${tarea.id})><i class="fas fa-eraser borrar"></i></div>
      </li>
      `;
    container.innerHTML += template;
}

function modifyTask(id, completed) {
    const url = "https://ctd-todo-api.herokuapp.com/v1";
    const token = localStorage.getItem("token")
    fetch(`${url}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({
                completed
            })
        })
        .then((data) => {
            return data.json()
        })
        .then((dataJs) => {
            console.log("Carga Exitosa de API");
            getTasks();
        })
        .catch((err) => {
            console.log(err);
        })
}

function deleteTask(id) {
    const url = "https://ctd-todo-api.herokuapp.com/v1";
    const token = localStorage.getItem("token")
    if (!confirm("¿Está seguro que desea eliminar la tarea?")) {
        return;
    }
    fetch(`${url}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
        .then((data) => {
            console.log("Carga Exitosa de API");
            getTasks();
        })
        .catch((err) => {
            console.log(err);
        })
}

function addTask(description) {
    const url = "https://ctd-todo-api.herokuapp.com/v1";
    const token = localStorage.getItem("token")
    const completed = false;
    fetch(`${url}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({
                description,
                completed
            })
        })
        .then((data) => {
            return data.json()
        })
        .then((dataJs) => {
            console.log("Carga Exitosa de API");
            getTasks();
        })
        .catch((err) => {
            console.log(err);
        })
}

function valToken() {
    if (localStorage.getItem("token") == null) {
        location.href = "../login.html";
    }
}

// 1 - representar los datos (tareas) en JavaScript
// 2 - Hacer un template para representar las tareas
//    2.1 - Tomar el codigo HTML que se repite y lo traermos a JavaScript
//    2.2 - Verificar dónde incluiríamos nuestro template
//    2.3 - Incluir el template en nuestro contenedor 
// 3 - Representar una de las tareas de JavaScript en nuestro template
// 4 - Hacer que se renderize el template por cada tarea
// 5 - Refactorizacion y buenas practicas
//    5.1 - ver si se puede separar en funciones mas claras
//    5.2 - ordenar código