//VARIABLES

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("mapa");

// Get the <span> element that closes the modal
var closeW = document.getElementsByClassName("close")[0];


//JAVASCRIPT
document.addEventListener('DOMContentLoaded', function () {

    var lat = '39.508229';
    var lng = '-0.442983';
    var zoom = 16;

    //ICONOS MAPA
    //hacemos una variable para customizar y pasarle los datos de nuestro marker 
    var iconHosteleria = new L.Icon({
        iconUrl: '../img/markers/hosteleria.png',
        iconSize: [45, 45],
        iconAnchor: [25, 45]
    });

    var iconModa = new L.Icon({
        iconUrl: '../img/markers/moda-complementos.png',
        iconSize: [45, 45],
        iconAnchor: [25, 45]
    });
    //listado comercios
    var comercios = [
        { id: 1, lat: '39.508229', lng: '-0.442983', icon: iconHosteleria, visitas: 3 },
        { id: 2, lat: '39.507476', lng: '-0.445624', icon: iconHosteleria, visitas: 3 },
        { id: 3, lat: '39.506127', lng: '-0.444249', icon: iconModa, visitas: 3 }
    ];

    var map = L.map('mapa').setView([lat, lng], zoom);
    /* 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map); */


    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    /*     L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map); */


    for (let i = 0; i < comercios.length; i++) {
        const comercio = comercios[i];
        L.marker([comercio.lat, comercio.lng], { icon: comercio.icon }).addTo(map).on('mouseup', function (event) {
            onClickMarker(comercio);
        });
    }

}); //DOM CONTENT LOADED 


//FUNCIONES
function openNav() {
    document.getElementById('miMenu').style.width = '100%';
    document.getElementById('miMenu').style.height = '100%';

}

function closeNav() {
    document.getElementById('miMenu').style.width = '0';
    document.getElementById('miMenu').style.height = '0';
}

function onClickMarker(comercio) {
    console.log(comercio);
    var altura = $(document).height();
    var anchura = $(document).width();
    console.log(altura);
    if (anchura <= 768) {
        $('.card-blanco').css({ 'bottom': '0' });
    } else {
        modal.style.display = "block";
    }
    // TODO --> Pintar información del comercio
}





//JQUERY


$(function () {

    //MOBILE DESIGN
    //cuando demos click en el card se escondera
    $('.close-bar').on('click', function () {
        $('.card-blanco').css({ 'bottom': '-1000px' });
        return false;
    });


});

//POPUP
// When the user clicks on <span> (x), close the modal
closeW.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

