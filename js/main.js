
// **** VARIABLES **** //
const API_Comercios = 'https://grupoteamweb.com/api/v2/index.php/comercios';

const contenido = document.getElementById('contenido');
const contenidoWeb = document.getElementById('contenido-web');

const LAT = '39.508229'; // MapaConfig

const LNG = '-0.442983'; // MapaConfig

const ZOOM = 16; // MapaConfig

var navBar = $("#miMenu"); //barra navegacion

var iconMenu = $(".icon-menu"); //menu mobile icon

var closeMenu = $(".btn-close"); //boton cerrar menu movil

var modal = $("#myModal"); //modal

var btn = $("#mapa"); //Boton que abre el modal

var closeModal = $(".close")[0]; //Elemento que cierra el modal

var modalFilter = $("#myModalFilter"); //modal filtros categorias

var btnFilter = $("#btnFilter"); //Boton que abre el modal filtros categorias

var closeFilter = $(".close-filter")[0]; //Elemento que cierra el modal filtros categorias

var cardBlanco = $(".card-blanco"); //card slide (movil)

var closeBar = $(".close-bar"); //boton que cierra card blanco (movil)

// Variables locales
var categoriaList = [];

var comerciosList = [];

var map = L.map('mapa', { zoomControl: false }).setView([LAT, LNG], ZOOM);


// **** EVENTOS **** //
$(document).ready(function () {
    //creamos los eventos
    $(closeMenu).on('click', closeNav);
    $(iconMenu).on('click', openNav);
    $(closeModal).on('click', cerrarModal);
    $(btnFilter).on('click', abrirFiltros);
    $(closeFilter).on('click', cerrarFiltros);
    $(closeBar).on('click', cerrarCardBlanco);
});


document.addEventListener('DOMContentLoaded', async function () {
    console.log('Hola Desde ContentLoaded');



    // **** OBJETOS **** //

    //mapa
    //hacemos una variable para customizar y pasarle los datos de nuestro marker 
    var iconHosteleria = new L.Icon({    //variable para customizar y pasarle los datos de nuestro marker 
        iconUrl: '../img/markers/hosteleria.png',
        iconSize: [45, 45],
        iconAnchor: [25, 45]
    });

    /*     var comercios = [//listado comercios
            { id: 1, lat: '39.508229', lng: '-0.442983', icon: iconHosteleria, visitas: 3 },
            { id: 2, lat: '39.507476', lng: '-0.445624', icon: iconHosteleria, visitas: 3 },
            { id: 3, lat: '39.506127', lng: '-0.444249', icon: iconModa, visitas: 3 },
            { id: 4, lat: '39.505854', lng: '-0.442371', icon: iconHosteleria, visitas: 3 },
            { id: 5, lat: '39.506201', lng: '-0.446255', icon: iconModa, visitas: 3 },
        ]; */


    //agregamos el mapa al div mapa que hemos creado
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);



    //recorremos el array de comercios 
    /*         for (let i = 0; i < comercios.length; i++) {
                const comercio = comercios[i]; //obtenemos cada comercio
                //le añadimos lat - lng el icon y lo añadimos al mapa
                L.marker([comercio.lat, comercio.lng], { icon: comercio.icon }).addTo(map).on('mouseup', function (event) {
                    onClickMarker(comercio);
                });
            } */


    // TODO --> LLamar API para llenar la lista de comercios.
    // llamanos al API
    getComercios(API_Comercios);
    async function getComercios(url) {
        const resp = await fetch(url);
        const data = await resp.json();
        //console.log(data); //me devuleve lista de objetos con los comercios
        datosComercios(data);
    }

    function datosComercios(comerciosApi) { //nos devuelve los datos de los comercios

        comerciosApi.forEach((comercioApi) => {
            const { nombre, imagen, descripcion, latitud, longitud, horario, telefono, link_fb, link_ig, categoria } = comercioApi;

            //mostrar markadores en latitud y longitud correspondiente a cada comercio
            L.marker(
                [latitud, longitud],
                { icon: new L.Icon({
                    iconUrl: `../img/markers/${categoria.marker}.png`,
                    iconSize: [45, 45],
                    iconAnchor: [25, 45]
                })}
            ).addTo(map).on('mouseup', function (event) {
                onClickMarker(comercioApi);

            });


        });

    }


}); //DOM CONTENT LOADED 



// **** FUNCIONES **** //

function cerrarModal() { //cerrar el modal
    $(modal).css({ 'display': 'none' });
}
function abrirFiltros() { //cerrar el modal
    $(modalFilter).css({ 'display': 'block' });
    $(cardBlanco).css({ 'bottom': '-1000px' });
    console.log('click en boton filter');
}
function cerrarFiltros() { //cerrar el modal filtros categorias
    $(modalFilter).css({ 'display': 'none' });

}
function cerrarCardBlanco() {     //cuando demos click en la barra se cierra el card blanco
    $(cardBlanco).css({ 'bottom': '-1000px' });
    return false;
}
function cerrarCardBlanco() {     //cuando demos click en la barra se cierra el card blanco
    $(cardBlanco).css({ 'bottom': '-1000px' });
    return false;
}
function openNav() { //abre menu del movil
    $(navBar).css({ 'width': '100%' });
    $(navBar).css({ 'height': '100%' });
}
function closeNav() { //cierra menu del movil
    $(navBar).css({ 'width': '0' });
    $(navBar).css({ 'height': '0' });
}

function onClickMarker(comercio) { //cuando damos click al marker del comercio comprueba si estas en movil o en web
    console.log(comercio);
    // var altura = $(document).height();
    var anchura = $(document).width();
    if (anchura <= 700) {
        contenido.innerHTML = '';
        rellenarComercioMv(comercio);
        $(cardBlanco).css({ 'bottom': '0px' });
    } else {
        contenidoWeb.innerHTML = '';
        rellenarComercioWeb(comercio);
        $(modal).css({ 'display': 'block' });
    }
    // TODO --> Pintar información del comercio


}
function rellenarComercioMv(datosComercio) {
    const comercioEl = document.createElement('div');
    comercioEl.classList.add('card');
    comercioEl.innerHTML = `
    <div class="c-info-1 caja">
    <div class="logo-comercio">
        <img src="${datosComercio.imagen}" alt="${datosComercio.nombre}">
    </div>
    <div class="contenedor-texto">
        <h2 class="titulo-comercio">${datosComercio.nombre}</h2>
        <div>
            <div class="titulo-caja">
                <i class="fas fa-map-marker-alt"></i>
                <p>Localización:</p>
            </div>
            <div class="content-caja">
                <p>Av. del Tir de Colom, 21,
                    46980 Paterna, Valencia</p>
            </div>
        </div>
    </div>
</div>

<div class="c-info-2">
    <div class="caja">
        <div class="titulo-caja">
            <i class="fas fa-info"></i>
            <p>Descripción:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.descripcion}</p>
        </div>
    </div>

    <div class="caja">
        <div class="titulo-caja">
            <i class="far fa-calendar-alt"></i>
            <p>Horario:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.horario}
            </p>
        </div>
    </div>
    <div class="caja">
        <div class="titulo-caja">
            <i class="fas fa-phone"></i>
            <p>Teléfono:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.telefono}</p>
        </div>
    </div>

    <div class="caja d-flex-b">
            <div class="titulo-caja">
                <i class="fas fa-motorcycle"></i>
                <p>Servicio a domicilio</p>
            </div>
    </div>

    <div class="caja d-flex-b social-cat" >
        <div class="contenido-categoria">
            <button class="contenedor-categoria">
                <img src="${datosComercio.categoria.imagen}">${datosComercio.categoria.nombre}
            </button>
        </div>
        <div class="contenido-social-media">
            <a href="${datosComercio.link_fb}" class="icon-social">
                <i class="fab fa-facebook"></i>
            </a>  
            <a href="${datosComercio.link_ig}" class="icon-social">
                <i class="fab fa-instagram"></i>
            </a>  
        </div>
    </div>
    `;
    contenido.appendChild(comercioEl);

}
function rellenarComercioWeb(datosComercio) {
    const comercioWebEl = document.createElement('div');
    comercioWebEl.classList.add('contenido-card');
    comercioWebEl.innerHTML = `
    <div class="c-info-1 caja">
    <div class="logo-comercio">
        <img src="${datosComercio.imagen}" alt="${datosComercio.nombre}">
    </div>
    <div class="contenedor-texto">
        <h2 class="titulo-comercio">${datosComercio.nombre}</h2>
        <div>
            <div class="titulo-caja">
                <i class="fas fa-map-marker-alt"></i>
                <p>Localización:</p>
            </div>
            <div class="content-caja">
                <p>Av. del Tir de Colom, 21,
                    46980 Paterna, Valencia</p>
            </div>
        </div>
    </div>
</div>

<div class="c-info-2">
    <div class="caja">
        <div class="titulo-caja">
            <i class="fas fa-info"></i>
            <p>Descripción:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.descripcion}</p>
        </div>
    </div> 

    <div class="caja">
        <div class="titulo-caja">
            <i class="far fa-calendar-alt"></i>
            <p>Horario:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.horario}
            </p>
        </div>
    </div>
    <div class="caja">
        <div class="titulo-caja">
            <i class="fas fa-phone"></i>
            <p>Contacto:</p>
        </div>
        <div class="content-caja">
            <p>${datosComercio.telefono}</p>
        </div>
    </div>

    <div class="caja d-flex-b">
            <div class="titulo-caja">
                <i class="fas fa-motorcycle"></i>
                <p>Servicio a domicilio</p>
            </div>
    </div>

    <div class="caja d-flex-b social-cat" >
        <div class="contenido-categoria">
            <button class="contenedor-categoria">
                <img src="${datosComercio.categoria.imagen}">${datosComercio.categoria.nombre}
            </button>
        </div>
        <div class="contenido-social-media">
            <a href="${datosComercio.link_fb}" class="icon-social">
                <i class="fab fa-facebook"></i>
            </a>  
            <a href="${datosComercio.link_ig}" class="icon-social">
                <i class="fab fa-instagram"></i>
            </a>  
        </div>
    </div>

</div>
    `;
    contenidoWeb.appendChild(comercioWebEl);

}