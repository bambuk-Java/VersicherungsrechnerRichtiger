// formatInput.js

export function formatNumberInput(input) {
    // Entferne alle Nicht-Ziffern und Nicht-Apostroph-Zeichen
    let value = input.replace(/[^\d']/g, '');
    
    // Entferne alle bestehenden Apostrophe
    value = value.replace(/'/g, '');

    // Füge Apostrophe hinzu
    let formattedInput = '';
    let count = 0;
    for (let i = value.length - 1; i >= 0; i--) {
        if (count === 3) {
            formattedInput = "'" + formattedInput;
            count = 0;
        }
        formattedInput = value[i] + formattedInput;
        count++;
    }
    return formattedInput;
}
