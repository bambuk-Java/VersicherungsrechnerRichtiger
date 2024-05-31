function getFahreralterfaktor(alter) {
    if (alter >= 18 && alter <= 20) {
        return 1.5;
    } else if (alter >= 21 && alter <= 25) {
        return 1.2;
    } else if (alter >= 26 && alter <= 30) {
        return 1.1;
    } else if (alter >= 31 && alter <= 65) {
        return 1.0;
    } else if (alter > 65) {
        return 1.3;
    } else {
        throw new Error("Ungültiges Alter");
    }
}

function berechneVersicherungskosten(basisprämie, fahrzeugfaktor, fahreralter, wohnortfaktor, fahrleistungfaktor, schadensfreiheitsrabatt, versicherungsartfaktor, selbstbeteiligungsfaktor) {
    const fahreralterfaktor = getFahreralterfaktor(fahreralter);
    return basisprämie * fahrzeugfaktor * fahreralterfaktor * wohnortfaktor * fahrleistungfaktor * schadensfreiheitsrabatt * versicherungsartfaktor * selbstbeteiligungsfaktor;
}

// Beispielwerte
const basisprämie = 500;
const fahrzeugfaktor = 1.2;
const fahreralter = 18;
const wohnortfaktor = 1.1;
const fahrleistungfaktor = 1.2;
const schadensfreiheitsrabatt = 0.8;
const versicherungsartfaktor = 1.3;
const selbstbeteiligungsfaktor = 0.9;

const kosten = berechneVersicherungskosten(basisprämie, fahrzeugfaktor, fahreralter, wohnortfaktor, fahrleistungfaktor, schadensfreiheitsrabatt, versicherungsartfaktor, selbstbeteiligungsfaktor);

console.log('Die jährlichen Versicherungskosten betragen: ' + kosten.toFixed(2) + ' EUR');
