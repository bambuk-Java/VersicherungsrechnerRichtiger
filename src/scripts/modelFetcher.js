
import fetchJsonp from 'fetch-jsonp';
//< ---------- für Automarkensuche ------->
export  async function fetchModels() {
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

// <---------- Marke verschwinden lassen ------->
  export function goAway(e) {
    setSelectedModel(e.target.innerText)
    e.preventDefault()
    let elements = document.getElementsByClassName('model_buttons');
    while (elements.length > 0) {
      elements[0].remove();
  }}