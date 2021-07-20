window.onload = () => {
    const formLogin = document.forms.formLogin;
    const botonLogin = document.querySelector(".btnLogin");

    const nombre = formLogin.nombre;
    const contrasenia = formLogin.contrasenia;
    const repetirContrasenia = formLogin.repetirContrasenia;
    const email = formLogin.email;

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreValido = validarNombre(nombre.value);
        const contrValido = validarContrasenia(contrasenia.value, repetirContrasenia.value);
        const emailValido = validarEmail(email.value)

        if (nombreValido && contrValido && emailValido) {
            const datosUsuario = new DatosUsuario();
            datosUsuario.setFirstname(nombre.value);
            datosUsuario.setLastname('DH');
            datosUsuario.setPassword(contrasenia.value);
            datosUsuario.setEmail(email.value);

            const url = 'https://ctd-todo-api.herokuapp.com/v1';
            fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosUsuario)
            }).then(datos => {
                return datos.json();
            }).then(datos => {
                localStorage.setItem('token', datos.jwt);
                location.href = './lista-tareas.html';
            }).catch(err => {
                console.log(err)
            });
        }
    })

    botonLogin.addEventListener("click", () => {
        location.href = "../login.html";
    });
}

function validarNombre(valor) {
    const expresion = /[0-9]/;
    const test = expresion.test(valor);
    const logitudCorrecta = valor.length > 2;

    return !test && logitudCorrecta;
}

function validarContrasenia(contrasenia, repetirContrasenia) {
    const coincidentes = contrasenia == repetirContrasenia;
    const logitudCorrecta = contrasenia.length > 7;

    return coincidentes && logitudCorrecta;
}

function validarEmail(email) {
    const expresion = /[A-z]+@[A-z]+.[A-z]{3}/;
    const test = expresion.test(email);
    return test;
}

// [A-z]+@[A-z]+.[A-z]{3}(.[a-z]+)?