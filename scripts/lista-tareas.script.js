// RequestManager = require('./services/request-manager.servicio.js');
// import { RequestManager } from './services/request-manager.servicio';
window.addEventListener("load", function() {
    getUserInfo();
    getTasks();
    const form = document.forms.formTareas;
    const salir = document.querySelector(".user-exit");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask(form.tarea.value);
    });
    salir.addEventListener("click", () => {
        if (confirm("¿Está seguro que desea salir?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "./login.html";
        }
    })
});

valToken();
setInterval(() => {
    valToken();
}, 100000);

function getTasks() {
    // document.querySelector('ul.tareas-pendientes').innerHTML = '';
    // document.querySelector('ul.tareas-terminadas').innerHTML = '';
    RequestManager.get('/tasks')
        .then(dataJs => {
            document.querySelector("ul.tareas-terminadas").innerHTML = "";
            document.querySelector("ul.tareas-pendientes").innerHTML = "";
            console.log("Carga Exitosa de API");
            dataJs.forEach((tarea) => {
                let contenedor = tarea.completed ? document.querySelector("ul.tareas-terminadas") : document.querySelector("ul.tareas-pendientes");
                renderizeTasks(tarea, contenedor, tarea.completed);
            });
        }).catch(err => {
            console.log(err)
        });
};

function renderizeTasks(tarea, container, estado) {
    const template = `
      <li class="tarea">
        <div class="not-done" onclick=modifyTask(${tarea.id},${estado})></div>
        
          <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">Creado el: ${dayjs(tarea.createdAt).format("DD-MMM-YYYY HH:mm")}</p>
          </div>
        <div class="boton-borrar not-done" onclick=deleteTask(${tarea.id})><i class="fas fa-trash-alt borrar"></i></div>
      </li>
      `;
    container.innerHTML += template;
}

function modifyTask(id, completed) {
    const body = {
        completed: !completed
    };
    RequestManager.put(`/tasks/${id}`, body)
        .then(tarea => {
            console.log("Carga Exitosa de API");
            getTasks();
        }).catch(err => {
            console.log(err)
        })
};

function getUserInfo() {
    RequestManager.get(`/users/getMe`)
        .then((dataJs) => {
            const username = document.querySelector(".name-user");
            console.log("Carga Exitosa de API");
            localStorage.setItem("user", dataJs);
            username.innerText += dataJs.firstName;
        }).catch((err) => {
            console.log(err);
        });
};

function deleteTask(id) {
    if (!confirm('Esta seguro que desea eliminar la tarea?')) {
        return;
    }
    RequestManager.delete(`/tasks/${id}`)
        .then(tarea => {
            console.log("entró");
            getTasks();
        }).catch(err => {
            console.log(err)
        });
};

function addTask(description) {
    const completed = false;
    const body = {
        description,
        completed
    };
    RequestManager.post(`/tasks`, body)
        .then(tarea => {
            console.log("Carga Exitosa de API");
            getTasks();
        }).catch(err => {
            console.log(err);
        });
};

function valToken() {
    if (RequestManager.getToken() == null) {
        location.href = "./login.html";
    };
};

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