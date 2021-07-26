class DatosUsuario {
    constructor() {
        this.firstName = null;
        this.lastName = null;
        this.password = null;
        this.email = null;
    }

    setFirstname(nombre) {
        this.firstName = nombre;
    }

    setLastname(nombre) {
        this.lastName = nombre;
    }

    setPassword(contrasenia) {
        this.password = contrasenia;
    }

    setEmail(email) {
        this.email = email;
    }
}
module.exports = DatosUsuario;