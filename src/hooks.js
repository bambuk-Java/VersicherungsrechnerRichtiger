import { useEffect, useRef, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { formatNumberInput } from './scripts/apostrophe.js';
import calculateInsurance from './scripts/calc.js';


const useInsuranceForm = () => {
  const [insuranceCost, setInsuranceCost] = useState(null);
  const valueInputRef = useRef(null);
  const deductibleInputRef = useRef(null);
  const kilometerInputRef = useRef(null);
  const dateInputRef = useRef('');
  const extraValRef = useRef('');
  const placingInputRef = useRef('');
  const birthdayInputRef = useRef('');
  const licenseInputRef = useRef('');
  const ageInputRef = useRef('');

  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const handleInput = (e) => {
      e.target.value = formatNumberInput(e.target.value);
    };
    const handleDate = (e) => {
      let value = e.target.value;

      if (value.length === 2 && e.inputType === 'insertText' && !value.includes('.')) {
        value += '.';
      }

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

    const inputs = [
      valueInputRef,
      deductibleInputRef,
      kilometerInputRef,
      dateInputRef,
      extraValRef,
      placingInputRef,
      birthdayInputRef,
      licenseInputRef,
    ];

    inputs.forEach((input) => {
      if (input.current) {
        input.current.addEventListener('input', handleInput);
        if (input === dateInputRef || input === placingInputRef || input === birthdayInputRef || input === licenseInputRef) {
          input.current.addEventListener('input', handleDate);
          input.current.addEventListener('input', validateDate);
        }
      }
    });

    return () => {
      inputs.forEach((input) => {
        if (input.current) {
          input.current.removeEventListener('input', handleInput);
          if (input === dateInputRef || input === placingInputRef || input === birthdayInputRef || input === licenseInputRef) {
            input.current.removeEventListener('input', handleDate);
            input.current.removeEventListener('input', validateDate);
          }
        }
      });
    };
  }, []);
  const handleModelClick = (e) => {
    setSelectedModel(e.target.innerText);
    setModels([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const cost = calculateInsurance(formData);
    setInsuranceCost(cost);
  };

  return {
    insuranceCost,
    setInsuranceCost,
    valueInputRef,
    deductibleInputRef,
    kilometerInputRef,
    dateInputRef,
    extraValRef,
    placingInputRef,
    birthdayInputRef,
    licenseInputRef,
    ageInputRef,
    models,
    setModels,
    selectedModel,
    setSelectedModel,
    handleModelClick,
    handleSubmit
  };
};

export default useInsuranceForm;
