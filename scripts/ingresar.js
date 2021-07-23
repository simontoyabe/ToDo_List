window.onload = () => {
    const form = document.forms.formLogin;
    const botonCuenta = document.querySelector(".btnCuenta ");

    botonCuenta.addEventListener("click", () => {
        location.href = "./index.html";
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = form.email.value;
        const password = form.contrasenia.value;
        const spinner = document.querySelector(".contenedor-spinner");
        const contenido = document.querySelector("#contenido");
        contenido.classList.add("hidden");
        spinner.classList.remove("hidden");

        const url = 'https://ctd-todo-api.herokuapp.com/v1';
        fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(datos => {
            return datos.json();
        }).then(datos => {
            localStorage.setItem('token', datos.jwt);
            location.href = '../lista-tareas.html'
        })

    });


}