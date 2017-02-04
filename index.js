/*
    Farmacias
    Project to simplify the way people search for information.
    Inspired by the tutorial made by wesbos you can check it at
    his page: https://javascript30.com
*/

const data = "https://raw.githubusercontent.com/slauzinho/farmacia.py/master/result.json";
const farmacias = [];
fetch(data).then(blob => blob.json()).then(data => farmacias.push(...data));
const farmaciaTable = document.querySelector("#farmacias") || 0;

/* Finds in our array the elements that contains the matched word */
function findMatches(wordToMatch, farmacias) {
    return farmacias.filter(farmacia => {
        const regex = new RegExp(wordToMatch, "gi");
        return farmacia.morada.distrito.match(regex) || farmacia.morada.freguesia.match(regex) || farmacia.morada.completa.match(regex) || farmacia.morada.cidade.match(regex);
    });
}

/* Displays our array */
function display() {
    const matchData = findMatches(this.value, farmacias);
    const html = matchData.map(farmacia => {
        return `
            <li id="lista-farmacia valign-wrapper">
                <div  class="collapsible-header collection-item avatar" id="nome">
                    <span class="title nome-farmacia">
                    <i class="fa fa-heartbeat fa-5x" aria-hidden="true"></i>
                    ${farmacia.nome}
                    </span>
                    <br>
                    <span class="morada-farmacia">
                    ${farmacia.morada.completa}
                    </span>
                    <br>
                    <span class="contacto-farmacia">
                    ${farmacia.contacto}
                    </span>
                </div>
                <div class="collapsible-body">
                </div>
            </li>
        `
    }).join("");
    farmaciaTable.innerHTML = html;
    $(".collapsible").collapsible({
        accordion: true,
        onOpen: function(el) {
            const url = encodeURIComponent($(el).find(".morada-farmacia")[0].innerHTML);
            const formated = `<iframe
              width="600"
              height="450"
              frameborder="0" style="border:1px solid lightgrey;"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDN-CRTZxMVQCC5z8BAFNgnX7cct-9Ijio
                &q=${url}" allowfullscreen">
            </iframe>`; //if the collapsible is opened we need to give the hiden boddy our google maps iframe with the address.
            ($(el).find(".collapsible-body")[0]).innerHTML = formated;
            //$(".collapsible-body").html(formated);
        },
        onClose: function(el) {
            ($(el).find(".collapsible-body")[0]).innerHTML = ""; //todo: fixed typeWerror of undefined
        }
    });
}

//const farmaciaTable = document.querySelector("#farmacias");
const searchBtn = document.querySelector(".search");
searchBtn.addEventListener("change", display);
searchBtn.addEventListener("keyup", display);
