import React from 'react';

const Datepicker = ({ getWeeks, getMonthName }) => (
  <div id="dp-container">
    <div id="dp-title-container">
      <button type="button" className="dp-switch-month" id="dp-prev-month" />
      <span id="dp-title">{getMonthName()}</span>
      <button type="button" className="dp-switch-month" id="dp-next-month" />
    </div>
    <div id="dp-weekdays-container">
      <div className="dp-weekday">S</div>
      <div className="dp-weekday">M</div>
      <div className="dp-weekday">T</div>
      <div className="dp-weekday">W</div>
      <div className="dp-weekday">T</div>
      <div className="dp-weekday">F</div>
      <div className="dp-weekday">S</div>
    </div>
    <div id="dp-weeks-container">
      {getWeeks().map(week => (
        <div className="dp-week">
          {week.map(day => (
            <button type="button" className="dp-day">
              {day.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Datepicker;
