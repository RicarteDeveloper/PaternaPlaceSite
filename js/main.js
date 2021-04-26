
// **** VARIABLES **** //
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

const LAT = '39.508229'; // MapaConfig

const LNG = '-0.442983'; // MapaConfig

const ZOOM = 16; // MapaConfig

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
    // Nos traemos las Categorias
    let responseCategoria = await fetch(`https://grupoteamweb.com/api/v1/index.php/categorias`);
    let dataCategoria = await responseCategoria.json();
    categoriaList = dataCategoria;
    console.log(categoriaList);

    // Nos traemos los Comercios
    let responseComercio = await fetch(`https://grupoteamweb.com/api/v1/index.php/comercios`);
    let dataComercio = await responseComercio.json();
    comerciosList = dataComercio;
    console.log(comerciosList);

    // **** OBJETOS **** //

    //mapa
    //hacemos una variable para customizar y pasarle los datos de nuestro marker 
    var iconHosteleria = new L.Icon({    //variable para customizar y pasarle los datos de nuestro marker 
        iconUrl: '../img/markers/hosteleria.png',
        iconSize: [45, 45],
        iconAnchor: [25, 45]
    });

    var iconModa = new L.Icon({
        iconUrl: '../img/markers/moda-complementos.png',
        iconSize: [45, 45],
        iconAnchor: [25, 45]
    });

    var comercios = [//listado comercios
        { id: 1, lat: '39.508229', lng: '-0.442983', icon: iconHosteleria, visitas: 3 },
        { id: 2, lat: '39.507476', lng: '-0.445624', icon: iconHosteleria, visitas: 3 },
        { id: 3, lat: '39.506127', lng: '-0.444249', icon: iconModa, visitas: 3 },
        { id: 4, lat: '39.505854', lng: '-0.442371', icon: iconHosteleria, visitas: 3 },
        { id: 5, lat: '39.506201', lng: '-0.446255', icon: iconModa, visitas: 3 },
    ];
    //agregamos el mapa al div mapa que hemos creado
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    //recorremos el array de comercios 
    for (let i = 0; i < comercios.length; i++) {
        const comercio = comercios[i]; //obtenemos cada comercio
        //le añadimos lat - lng el icon y lo añadimos al mapa
        L.marker([comercio.lat, comercio.lng], { icon: comercio.icon }).addTo(map).on('mouseup', function (event) {
            onClickMarker(comercio);
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
        $(cardBlanco).css({ 'bottom': '0px' });
    } else {
        $(modal).css({ 'display': 'block' });
    }
    // TODO --> Pintar información del comercio
}
async function getAllCategorias() { //nos devuelve las categorias
    console.log('getAllCategorias');
    let response = await fetch(`https://grupoteamweb.com/api/index.php/categorias`);
    let data = await response.json();
    console.log(data);
    return data;
}