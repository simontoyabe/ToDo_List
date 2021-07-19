window.onload = () => {

    const form = document.forms.formLogin;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const email = form.email.value;
        const password = form.contrasenia.value;

        console.log(form)
        console.log(email)
        console.log(password)

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

    })

}