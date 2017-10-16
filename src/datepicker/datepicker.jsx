import React from 'react';
import DatepickerContainer from './datepicker-container';
import DatepickerContent from './datepicker-content';

const Datepicker = () => (
  <DatepickerContainer>
    {props => <DatepickerContent {...props} />}
  </DatepickerContainer>
);

export default Datepicker;
