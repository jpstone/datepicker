import React, { Component } from 'react';
import DatepickerContent from './datepicker-content';
import model from './model';

const calendar = model();

class DatepickerContainer extends Component {
  prevMonth = () => {
    calendar.prevMonth();
    this.forceUpdate();
  }

  nextMonth = () => {
    calendar.nextMonth();
    this.forceUpdate();
  }

  render() {
    const { prevMonth, nextMonth } = this;
    const { getWeeks, getMonthName, weekdaysMin, getYear } = calendar;
    return (
      <DatepickerContent
        weeks={getWeeks()}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        monthName={getMonthName()}
        year={getYear()}
        weekdays={weekdaysMin()}
      />
    );
  }
}

export default DatepickerContainer;
