import { Component } from 'react';
import createCalendarModel from './create-calendar-model';

const calendarModel = createCalendarModel();

class DatepickerContainer extends Component {
  prevMonth = () => {
    calendarModel.prevMonth();
    this.forceUpdate();
  }

  nextMonth = () => {
    calendarModel.nextMonth();
    this.forceUpdate();
  }

  onSelected = onClick => {
    onClick();
    this.forceUpdate();
  }

  render() {
    const { children } = this.props;
    const { prevMonth, nextMonth, onSelected } = this;
    const { getWeeks, getMonthName, weekdaysMin, getYear } = calendarModel;
    return children({
      prevMonth,
      nextMonth,
      onSelected ,
      monthName: getMonthName(),
      weekdays: weekdaysMin(),
      weeks: getWeeks(),
      year: getYear(),
    });
  }
}

export default DatepickerContainer;
