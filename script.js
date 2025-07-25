let bundeslaender = [];
let letters = [];

/**
 * Lädt die Bundesländer-Daten aus der JSON-Datei und startet das Rendering.
 */
async function init() {
    let resp = await fetch('./bundesland.json');
    bundeslaender = await resp.json();
    render();
}

/**
 * Rendert die Bundesländer-Liste im Content-Bereich.
 * Optional kann nach dem Anfangsbuchstaben gefiltert werden.
 * @param {string} [filter] - Anfangsbuchstabe zum Filtern der Bundesländer.
 */
function render(filter) {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const land = bundeslaender[i];
        const population = (land['population'] + '').replace('.', ',');
        const firstLetter = land['name'].charAt(0);

        if (!filter || filter == firstLetter) {
            content.innerHTML += generateLink(land, population);
        }

        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }

    renderLetters();
}

/**
 * Setzt den Filter für die Anzeige der Bundesländer nach Anfangsbuchstabe.
 * @param {string} letter - Der zu filternde Buchstabe.
 */
function setFilter(letter) {
    render(letter);
}

/**
 * Rendert die Buchstaben-Filterleiste basierend auf den vorhandenen Anfangsbuchstaben.
 */
function renderLetters() {
    let letterbox = document.getElementById('letterbox');
    letterbox.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        letterbox.innerHTML += `<div onclick="setFilter('${letter}')" class="letter">${letter}</div>`;
    }
}

/**
 * Generiert das HTML für einen Bundesland-Link.
 * @param {Object} land - Das Bundesland-Objekt.
 * @param {string} population - Die formatierte Einwohnerzahl.
 * @returns {string} - Das HTML für den Link.
 */
function generateLink(land, population) {
    return `<a class="bbox" href="${land['url']}" target="_blank">
    <div>${land['name']}</div>
    <div class="text-gray">${population} Millionen</div>
</a>`;
}