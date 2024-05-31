import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import { formatNumberInput } from './scripts/apostrophe.js';
import { dateformat } from './scripts/dateformatter.js';

function App() {
  const valueInputRef = useRef(null);
  const deductibleInputRef = useRef(null);
  const kilometerInputRef = useRef(null);
  const brandInputRef = useRef('');
  const dateInputRef = useRef('');

  //< ---------- für die Hochkommas ------->
  useEffect(() => {
    const handleInput = (e) => {
      e.target.value = formatNumberInput(e.target.value);
    };
    const handleDate = (e) => {
      e.target.value = dateformat(e.target.value);
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

  return (
    <div className="App">
      <form>
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
        <input ref={dateInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br />
        <label htmlFor='date'>Kaufjahr</label>
        <br />
        <input ref={dateInputRef} type="text" pattern="^(0[1-9]|1[0-2])\.(\d{4})$" placeholder="MM.YYYY" />
        <br />
        <label htmlFor='date'>geleast?</label>
        
          
          <input type="radio" id="html" name="fav_language" value="HTML"/>
  <label for="html">HTML</label><br/>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br/>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript">
  <label for="javascript">JavaScript</label>






        <br />
        <label htmlFor='date'>Wert der Sonderausstattung</label>
        <br/>
        <label htmlFor='date'>Nutzung des Fahrzeuges</label>
        <br />
        <label htmlFor='date'>Garage vorhanden?</label>
        <br />
        <h1>Personendaten</h1>
        <br />
        <label>Geschlecht</label>
        <br />
        <label htmlFor='gb'> Geburtsdatum</label>
        <br/>
        <label htmlFor='gb'> Datum d. Fahrprüfung</label>
        <br/>
        <label htmlFor='gb'>PLZ Wohnort</label>
        <br/>
        <label htmlFor='gb'> Nationalität</label>
        <br />
        <label htmlFor='gb'> Welche Basisdeckung</label>
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
      </form>

      <button type="button" onClick={fetchModels}>Search models</button>
    </div>
  );
}

export default App;
