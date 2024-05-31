// Funktion zur Berechnung des Versicherungstarifs
const calculateInsurance = (formData) => {
    // Extrahiere die benötigten Daten aus dem Formular
    const { value, date, leased, extraVal, usage, garage, gender, birthday, license, level, age, deductible, kilometers } = formData;
  
    // Basistarif
    let baseRate = 500;
  
    // Tarif basierend auf dem Wert des Autos
    if (value >= 10000 && value < 20000) {
      baseRate += 200;
    } else if (value >= 20000) {
      baseRate += 400;
    }
  
    // Zusätzlicher Tarif basierend auf der Nutzung
    if (usage === 'Arbeitsweg') {
      baseRate += 100;
    } else if (usage === 'Geschäftlich') {
      baseRate += 200;
    }
  
    // Zusätzlicher Tarif basierend auf der Garage
    if (garage === 'at home') {
      baseRate -= 50; // Rabatt für zu Hause Garage
    } else if (garage === 'at Workplace') {
      baseRate += 50; // Zusätzliche Kosten für Arbeitsplatz Garage
    }
  
    // Zusätzlicher Tarif basierend auf dem Alter
    if (age < 25) {
      baseRate += 100; // Zusätzliche Kosten für unter 25-Jährige
    }
  
    // Zusätzlicher Tarif basierend auf der Kilometerleistung
    if (kilometers > 10000) {
      baseRate += 100; // Zusätzliche Kosten für hohe Kilometerleistung
    }
  
    // Tarif reduzieren, wenn Selbstbehalt vorhanden ist
    if (deductible > 0) {
      baseRate -= deductible / 2; // Reduzierung um die Hälfte des Selbstbehalts
    }
  
    // Zusätzlicher Tarif basierend auf anderen Faktoren wie Geschlecht, Geburtstag, etc.
    // Geschlecht
    if (gender === 'female') {
      baseRate -= 50; // Beispiel: Rabatt für weibliche Fahrer
    } else if (gender === 'male') {
      baseRate += 50; // Beispiel: Aufschlag für männliche Fahrer
    }
  
    // Alter
    const today = new Date();
    const birthDate = new Date(birthday);
    const ageDifference = today.getFullYear() - birthDate.getFullYear();
    if (ageDifference < 25) {
      baseRate += 100; // Beispiel: Zusätzliche Kosten für Fahrer unter 25 Jahren
    } else if (ageDifference >= 65) {
      baseRate -= 100; // Beispiel: Rabatt für Fahrer über 65 Jahre
    }
  
    // Alter der Fahrprüfung
    const licenseDate = new Date(license);
    const licenseAgeDifference = today.getFullYear() - licenseDate.getFullYear();
    if (licenseAgeDifference < 3) {
      baseRate += 50; // Beispiel: Zusätzliche Kosten für Fahrer mit weniger als 3 Jahren Fahrerfahrung
    }
  
    // Versicherungslevel
    switch (level) {
      case '1':
        baseRate += 100; // Beispiel: Aufschlag für Haftpflicht
        break;
      case '2':
        baseRate += 200; // Beispiel: Aufschlag für Teilkasko
        break;
      case '3':
        baseRate += 300; // Beispiel: Aufschlag für Vollkasko
        break;
      default:
        break;
    }
  
    // Rückgabe des berechneten Tarifs
    return baseRate;
  };
  

  export default calculateInsurance;