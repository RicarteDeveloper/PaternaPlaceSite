

function traerJSON() {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'json/comercios.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //JSON.parse() --> para pasar el string a objeto
            console.log(JSON.parse(this.responseText));
            return JSON.parse(this.responseText);
        } else {
            return null;
        }
    }
}

function init() {
    console.log('DataService importado!');
}

