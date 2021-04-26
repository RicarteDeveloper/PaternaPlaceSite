// **** VARIABLES **** //
var form = document.getElementById("form");

var nombre = document.getElementById("nombre");

var email = document.getElementById("email");

var asunto = document.getElementById("asunto");

var mensaje = document.getElementById("mensaje");

var btnSubmit = document.getElementById("btnSubmit");

var camposContacto = [];

// **** EVENTOS **** //

//cuando demos en submit ejecutamos la funcion checkInputs()
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    var nuevoFormulario = {};
    if (checkInputs()) {
        nuevoFormulario = new Formulario(nombre.value, email.value, asunto.value, mensaje.value);
    }else{
        console.error('el formulario no es valido');
    }
    console.log(nuevoFormulario);
});

// **** FUNCIONES **** //
function checkInputs() {
    var isValid = true;
    // traemos los valores de los inputs del formulario
    //trim() --> elimina los espacios del principio y final del input
    const nombreValue = nombre.value.trim();
    const emailValue = email.value.trim();
    const asuntoValue = asunto.value.trim();
    /*     const mensajeValue = mensaje.value.trim(); */

    //si el nombre esta vacio
    if (nombreValue === '') {
        //muestra error con el mensaje que le pasamos y añade la clase error
        setErrorFor(nombre, 'Nombre en blanco');
        isValid = false;
    } else {
        //añadimos la clase 
        setSuccessFor(nombre);
    }

    //si el email esta vacio
    if (emailValue === '') {
        //muestra error con el mensaje que le pasamos y añade la clase error
        setErrorFor(email, 'Email en blanco');
        isValid = false;
    } else if (!isEmail(emailValue)) {
        //añadimos la clase 
        setErrorFor(email, 'Email no válido');
    } else {
        setSuccessFor(email);
    }

    //si el asunto esta vacio
    if (asuntoValue === '') {
        //muestra error con el mensaje que le pasamos y añade la clase error
        setErrorFor(asunto, 'Asunto en blanco');
        isValid = false;
    } else {
        //añadimos la clase 
        setSuccessFor(asunto);
    }
    return isValid;
}

function setErrorFor(input, message) { //campo inválido
    const formControl = input.parentElement; //.form-control
    const small = formControl.querySelector('small');

    //añadimos mensaje error dentro de small
    small.innerText = message;

    //añadimos la clase error
    formControl.className = 'form-control error';
}

function setSuccessFor(input) { //campo correcto
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) { //comprobar email válido
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.][0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function Formulario(nombre, email, asunto, mensaje) { // Objeto Campo
    //this.id = id; // number
    this.nombre = nombre; // String
    this.email = email; // String
    this.asunto = asunto; // String
    this.mensaje = mensaje; //String
}