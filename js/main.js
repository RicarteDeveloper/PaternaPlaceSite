// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("mapa");

// Get the <span> element that closes the modal
var closeW = document.getElementsByClassName("close")[0];

document.addEventListener('DOMContentLoaded', function () {
    var lat = '39.508229';
    var lng = '-0.442983';
    var zoom = 16;

    //hacemos una variable para customizar y pasarle los datos de nuestro marker 
    var iconHosteleria = new L.Icon({
        iconUrl: '../img/marker-hosteleria.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });

    var iconModa = new L.Icon({
        iconUrl: '../img/marker-moda.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50]
    });

    var comercios = [
        { id: 1, lat: '39.508229', lng: '-0.442983', icon: iconHosteleria, visitas: 3 },
        { id: 2, lat: '39.507476', lng: '-0.445624', icon: iconHosteleria, visitas: 3 },
        { id: 3, lat: '39.506127', lng: '-0.444249', icon: iconModa, visitas: 3 }
    ];

    var map = L.map('mapa').setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (let i = 0; i < comercios.length; i++) {
        const comercio = comercios[i];
        L.marker([comercio.lat, comercio.lng], { icon: comercio.icon }).addTo(map).on('mouseup', function (event) {
            onClickMarker(comercio);
        });
    }

    //mostrando los markers en el mapa
    /*     var marker1 = L.marker([lat, lng], { icon: iconHosteleria }).addTo(map);
        var marker2 = L.marker([39.507476, -0.445624], { icon: iconHosteleria }).addTo(map);
        var marker3 = L.marker([39.506127, -0.444249], { icon: iconModa }).addTo(map); */





}); //DOM CONTENT LOADED 

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
    if (anchura <=768) {
        $('.card-blanco').css({ 'bottom': '0' });
    } else {
        modal.style.display = "block";
    }
    // TODO --> Pintar información del comercio
    
}
//mobile design
$(function () {

    //cuando damos click en el mapa, el card aparece
    /*     $('.mapa').on('click', function () {
            $('.card-blanco').css({ 'bottom': '0' });
            return false;
        }); */

    //cuando demos click en el card se escondera
    $('.close-bar').on('click', function () {
        $('.card-blanco').css({ 'bottom': '-1000px' });
        return false;
    });

    //POPUP


});

// When the user clicks the button, open the modal 
/* btn.onclick = function () {
    modal.style.display = "block";
} */

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

