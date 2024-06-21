import React from 'react';
import './App.css';
import './index.css';
import Abtcar from './aboutcar/abtcar.js';
import AbtPerson from './abtperson/abtperson.js';
import AbtInsurance from './abtInsurance/abtInsurance.js';
import Navbar from './globalvars/navbar.js';

function App() {

  return (
      <div className="App">
        <Navbar />
        <Abtcar />
        <AbtPerson />
        <AbtInsurance />
        <h1 className="my-4 text-5xl font-bold leading-tight">Insurance</h1>
      </div>
  );
}

export default App;
