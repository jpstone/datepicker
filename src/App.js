import React from 'react';
import './App.css';
import { Calendar } from './datepicker';
import test from './testbed';

const App = () => (
  <div className="App">
    <Calendar>
      {test}
    </Calendar>
  </div>
);

export default App;
