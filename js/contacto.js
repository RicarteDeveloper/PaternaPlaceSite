//VARIABLES



//JAVASCRIPT
document.addEventListener('DOMContentLoaded', function () {

    //seleccionamos los elementos
    //Campos Datos Usuario
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var asunto = document.getElementById('asunto');

    //validar campos obligatorios
    nombre.addEventListener('blur', validarCampos);
    asunto.addEventListener('blur', validarCampos);

    function validarCampos() {
        //si esta vacio
        if (this.value == '') {
            this.style.border = '1px solid red';
        } else {
            //si hay algo que lo oculte
            this.style.border = 'none';
        }
    }

    // Validación Email
    email.addEventListener('blur', function () {
        if (validarEmail(email.value)) {
            console.log("El email es correcto");
            this.style.border = 'none';
        }
        else {
            this.style.border = '1px solid red';
            console.log("El email NO es correcto");
        }
    });

    function validarEmail(email) {
        var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return regex.test(email) ? true : false;
    }


}); //DOM CONTENT LOADED 
