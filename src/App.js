import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import { formatNumberInput } from './scripts/apostrophe.js';
import calculateInsurance from './scripts/calc.js';

function App() {
  const [insuranceCost, setInsuranceCost] = useState(null);
  const valueInputRef = useRef(null);
  const deductibleInputRef = useRef(null);
  const kilometerInputRef = useRef(null);
  const brandInputRef = useRef('');
  const dateInputRef = useRef('');
  const extraValRef = useRef('');
  const placingInputRef = useRef('');
  const birthdayInputRef = useRef('');
  const licenseInputRef = useRef('');
  const ageInputRef = useRef('');
  
  //< ---------- für die Hochkommas ------->
  useEffect(() => {
    const handleInput = (e) => {
      e.target.value = formatNumberInput(e.target.value);
    };
    const handleDate = (e) => {
      let value = e.target.value;
    
      // Füge automatisch einen Punkt ein, sobald zwei Zeichen eingegeben wurden
      if (value.length === 2 && e.inputType === 'insertText' && !value.includes('.')) {
        value += '.';
      }
    
      // Filtere die Eingabe, um nur die ersten vier Zeichen nach dem Punkt zuzulassen
      const parts = value.split('.');
      if (parts.length === 2 && parts[1].length > 4) {
        parts[1] = parts[1].slice(0, 4);
        value = parts.join('.');
      }
    
      e.target.value = value;
    };
    
    
    const validateDate = (e) => {
      const regex = /^(0[1-9]|1[0-2])\.(\d{4})$/;
      if (!regex.test(e.target.value)) {
        e.target.setCustomValidity("Please enter a date in MM.YYYY format.");
      } else {
        e.target.setCustomValidity("");
      }
    };
    

    const valueInput = valueInputRef.current;
    const deductibleInput = deductibleInputRef.current;
    const kilometerInput = kilometerInputRef.current;
    const dateInput = dateInputRef.current;
    const extraValInput = extraValRef.current;
    const placingInput = placingInputRef.current;
    const birthdayInput = birthdayInputRef.current;
    const licenseInput = licenseInputRef.current;
    if (valueInput) {
      valueInput.addEventListener('input', handleInput);
    }
    if (dateInput) {
      dateInput.addEventListener('input', handleDate);
      dateInput.addEventListener('input', validateDate);
    }
    if (deductibleInput) {
      deductibleInput.addEventListener('input', handleInput);
    }
    if (kilometerInput) {
      kilometerInput.addEventListener('input', handleInput);
    }
    if (extraValInput) {
      extraValInput.addEventListener('input', handleInput);
    }
    if (placingInput) {
      placingInput.addEventListener('input', handleDate);
      placingInput.addEventListener('input', validateDate);
    }
    if (birthdayInput) {
      birthdayInput.addEventListener('input', handleDate);
      birthdayInput.addEventListener('input', validateDate);
    }
    if (licenseInput) {
      licenseInput.addEventListener('input', handleDate);
      licenseInput.addEventListener('input', validateDate);
    }

    return () => {
      if (valueInput) {
        valueInput.removeEventListener('input', handleInput);
      }
      if (dateInput) {
        dateInput.removeEventListener('input', handleDate);
        dateInput.removeEventListener('input', validateDate);
      }
      if (deductibleInput) {
        deductibleInput.removeEventListener('input', handleInput);
      }
      if (kilometerInput) {
        kilometerInput.removeEventListener('input', handleInput);
      }
      if (extraValInput) {
        extraValInput.removeEventListener('input', handleInput);
      }
      if (placingInput) {
        placingInput.removeEventListener('input', handleDate);
        placingInput.removeEventListener('input', validateDate);
      }
      if (birthdayInput) {
        birthdayInput.removeEventListener('input', handleDate);
        birthdayInput.removeEventListener('input', validateDate);
      }
      if (licenseInput) {
        licenseInput.removeEventListener('input', handleDate);
        licenseInput.removeEventListener('input', validateDate);
      }
    };
  }, []);

  //< ---------- für Automarkensuche ------->
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  const fetchModels = async () => {
    try {
      const response = await fetchJsonp(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${brandInputRef.current.value}`);
      const jsonpData = await response.json();

      // Überprüfen Sie die Struktur der zurückgegebenen Daten
      if (jsonpData.Models) {
        setModels(jsonpData.Models);
        console.log('Models:', jsonpData.Models);
        console.log('brand:', brandInputRef.current.value);
      } else {
        console.error('Invalid data structure:', jsonpData);
        setModels([]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setModels([]);  // Setzen Sie models auf ein leeres Array im Fehlerfall
    }
  };

  const handleModelClick = (e) => {
    setSelectedModel(e.target.innerText);
    setModels([]); // Entfernt die Modelle, indem die Liste auf ein leeres Array gesetzt wird
  };

  //<!----- für die Versicherungsberechnung ------>
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Sammle die Daten aus dem Formular
    const formData = {
      value: valueInputRef.current.value,
      date: dateInputRef.current.value,
      leased: document.querySelector('input[name="leased?"]:checked').value,
      extraVal: extraValRef.current.value,
      usage: document.querySelector('input[name="usage"]:checked').value,
      garage: document.querySelector('input[name="garagespace"]:checked').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      birthday: birthdayInputRef.current.value,
      license: licenseInputRef.current.value,
      level: document.querySelector('input[name="level"]:checked').value,
      age: ageInputRef.current.value,
      deductible: deductibleInputRef.current.value,
      kilometers: kilometerInputRef.current.value
    };
  
    // Berechne den Versicherungstarif mit den Formulardaten
    const cost = calculateInsurance(formData);
    setInsuranceCost(cost); // Setze den berechneten Tarif im Zustand
  };
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor='brand'>Marke</label>
        <br />
        <input ref={brandInputRef} type="text" placeholder="'Audi, VW, Mercedes-Benz'" />
        <br />
        <div id='models'>
          {models.map((model) => (
            <button className='model_buttons' onClick={handleModelClick} key={model.model_name}>{model.model_name}</button>
          ))}
          <h3>{selectedModel}</h3>
        </div>
        <label htmlFor='value'>Wert ihres Autos</label>
        <br />
        <input ref={valueInputRef} type="text" placeholder="'12'000, 1'500'" />
        <br />
        <label htmlFor='date'>Inverkehrssetzung</label>
        <br />
        <input ref={placingInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br />
        <label htmlFor='date'>Kaufjahr</label>
        <br />
        <input ref={dateInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br />
        <label htmlFor='date'>geleast?</label>
        <br />
        <input type="radio" id="html" name="leased?" value="leased" />
        <label htmlFor="html">Ja</label><br />
        <input type="radio" id="css" name="leased?" value="!leased" />
        <label htmlFor="css">Nein</label><br />
        <br />
        <label htmlFor='date'>Wert der Sonderausstattung</label>
        <br />
        <input ref={extraValRef} type="text" placeholder="'12'000, 1'500'" />
        <br />
        <label htmlFor='date'>Nutzung des Fahrzeuges</label>
        <br />
        <input type="checkbox" id="privat" name="usage" value="Privat" />
        <label htmlFor="privat">Privat</label><br />
        <input type="checkbox" id="arbeitsweg" name="usage" value="Arbeitsweg" />
        <label htmlFor="arbeitsweg">Arbeitsweg</label><br />
        <input type="checkbox" id="geschäftlich" name="usage" value="Geschäftlich" />
        <label htmlFor="geschäftlich">Geschäftlich</label><br />
        <br />
        <label htmlFor='date'>Garage vorhanden?</label>
        <br />
        <input type="checkbox" id="zuhause" name="garagespace" value="at home" />
        <label htmlFor="zuhause">Ja, zu Hause</label><br />
        <input type="checkbox" id="arbeitsplatz" name="garagespace" value="at Workplace" />
        <label htmlFor="arbeitsplatz">Ja, beim Arbeitsplatz</label><br />
        <input type="checkbox" id="geschäftlich" name="usage" value="Geschäftlich" />
        <label htmlFor="geschäftlich">Ja, zu Hause und beim Arbeitsplatz</label><br />
        <input type="checkbox" id="geschäftlich" name="usage" value="Geschäftlich" />
        <label htmlFor="geschäftlich">Nein, keine Garage</label>
        <br />
        <h1>Personendaten</h1>
        <br />
        <label>Geschlecht</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Weiblich</label><br />
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Männlch</label><br />
        <br />
        <label htmlFor='gb'> Geburtsdatum</label>
        <br />
        <input ref={birthdayInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br />
        <label htmlFor='gb'> Datum d. Fahrprüfung</label>
        <br />
        <input ref={licenseInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br/>
        <label htmlFor='gb'>PLZ Wohnort</label>
        <br />
        <label htmlFor='gb'> Nationalität</label>
        <br />
        <label htmlFor='gb'> Welche Basisdeckung</label>
        <br />
        <input type="radio" id="html" name="level" value="1" />
        <label htmlFor="html">Haftpflicht</label><br />
        <input type="radio" id="css" name="level" value="2" />
        <label htmlFor="css">Haftpflicht + Teilkasko</label><br />
        <input type="radio" id="css" name="level" value="3" />
        <label htmlFor="css">Haftpflicht + Vollkasko</label>
        <br />
        <label htmlFor='age'>Wie alt bist du?</label>
        <br />
        <input type="text" name="name" pattern="[0-9]" placeholder="18, 44, 33" />
        <br />
        <label htmlFor='deductible'>Selbstbehalt</label>
        <br />
        <input ref={deductibleInputRef} type="text" min='0' max='1000' placeholder="'0, 200, 500'" />
        <br />
        <label htmlFor='kilometers'>Kilometer jährlich</label>
        <br />
        <input type="text" ref={kilometerInputRef} placeholder="'0, 10'000, 50'000'" />
        <br />
        <button type="submit">Calculate</button>
        <br />
        {insuranceCost !== null && <p>Insurance Cost: {insuranceCost}</p>}
      </form>

      <button type="button" onClick={fetchModels}>Search models</button>
    </div>
  );
}

export default App;
