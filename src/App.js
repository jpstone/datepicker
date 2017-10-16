import React from 'react';
import './App.css';
import { Datepicker, model } from './datepicker';
import test from './testbed';

const App = () => (
  <div className="App">
    <Datepicker {...model()} />
  </div>
);

export default App;
