
// **** VARIABLES **** //
const API_Comercios = 'https://grupoteamweb.com/api/v2/index.php/comercios';

const contenido = document.getElementById('contenido');
const contenidoWeb = document.getElementById('contenido-web');

const LAT = '39.508229'; // MapaConfig

const LNG = '-0.442983'; // MapaConfig

const ZOOM = 16; // MapaConfig

var navBar = document.getElementById('miMenu');//barra navegacion

var loader = document.querySelector('.fondo-loading'); //loader

var iconMenu = document.querySelector('.icon-menu'); //menu mobile icon

var closeMenu = document.querySelector('.btn-close'); //boton cerrar menu movil

var modal = document.getElementById('myModal');//modal

var btn = document.getElementById('mapa'); //Boton que abre el modal

var closeModal = document.querySelector('.close-modal'); //Elemento que cierra el modal

var modalFilter = document.getElementById('myModalFilter');//modal filtros categorias

var btnFilter = document.getElementById('btnFilter'); //Boton que abre el modal filtros categorias

var closeFilter = document.querySelector('.close-filter'); //Elemento que cierra el modal filtros categorias

var cardBlanco = document.querySelector('.card-blanco'); //card slide (movil)

var closeBar = document.querySelector('.close-bar'); //boton que cierra card blanco (movil)

// Variables locales
var categoriaList = [];

var comerciosList = [];

var map = L.map('mapa', { zoomControl: false }).setView([LAT, LNG], ZOOM);

closeMenu.addEventListener('click', () => closeNav());
iconMenu.addEventListener('click', () => openNav());
closeModal.addEventListener('click', () => cerrarModal());
btnFilter.addEventListener('click', () => abrirFiltros());
closeFilter.addEventListener('click', () => cerrarFiltros());
closeBar.addEventListener('click', () => cerrarCardBlanco());

document.addEventListener('DOMContentLoaded', async function () {
    console.log('Hola Desde ContentLoaded');
    //agregamos el mapa al div mapa que hemos creado
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    // llamanos al API
    getComercios(API_Comercios);
}); //DOM CONTENT LOADED 

async function getComercios(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    //esconder loader
    closeLoader(500);
    //console.log(data); //me devuleve lista de objetos con los comercios
    datosComercios(data);
}

function datosComercios(comerciosApi) { //nos devuelve los datos de los comercios
    comerciosApi.forEach((comercioApi) => {
        const { nombre, imagen, descripcion, latitud, longitud, horario, telefono, link_fb, link_ig, categoria } = comercioApi;
        //mostrar markadores en latitud y longitud correspondiente a cada comercio
        L.marker(
            [latitud, longitud],
            {
                icon: new L.Icon({
                    iconUrl: `../img/markers/${categoria.marker}.png`,
                    iconSize: [45, 45],
                    iconAnchor: [25, 45]
                })
            }
        ).addTo(map).on('mouseup', function (event) {
            onClickMarker(comercioApi);
        });
    });
}

function cerrarModal() { //cerrar el modal
    modal.style.display = 'none';
}
function abrirFiltros() { //cerrar el modal
    modalFilter.style.display = 'block';
    cardBlanco.style.bottom = '-1000px';
    console.log('click en boton filter');
}
function cerrarFiltros() { //cerrar el modal filtros categorias
    modalFilter.style.display = 'none';
}
function cerrarCardBlanco() {     //cuando demos click en la barra se cierra el card blanco
    cardBlanco.style.bottom = '-1000px';
    return false;
}
function openNav() { //abre menu del movil
    navBar.style.width = '100%';
    navBar.style.height = '100%';
}
function closeNav() { //cierra menu del movil
    navBar.style.width = '0';
    navBar.style.height = '0';
}

function onClickMarker(comercio) { //cuando damos click al marker del comercio comprueba si estas en movil o en web
    console.log(comercio);
    var anchura = screen.width;
    if (anchura <= 700) {
        contenido.innerHTML = '';
        rellenarComercioMv(comercio);
        cardBlanco.style.bottom = '0px';
    } else {
        contenidoWeb.innerHTML = '';
        rellenarComercioWeb(comercio);
        modal.style.display = 'block';
    }
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
function closeLoader(time) {
    setTimeout(() => {
        loader.style.display = 'none';
    }, time);
}
function openLoader() {
    loader.style.display = 'block';
}