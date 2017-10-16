import React from 'react';

const getDayClassName = ({ isCurrent, isChosen }) => (
  `dp-day${isCurrent ? ' dp-current-month' : ''}${isChosen ? ' dp-chosen' : ''}`
)

const getKey = () => Math.random().toString().split('.').join('');

const DatepickerContent = ({
  weeks,
  monthName,
  year,
  weekdays,
  nextMonth,
  prevMonth,
  onSelected,
}) => (
  <div id="dp-container">
    <div id="dp-title-container">
      <div id="dp-switch-prev-month-container">
        <button type="button" className="dp-switch-month" id="dp-prev-month" onClick={prevMonth}>
          {'<'}
        </button>
      </div>
      <span id="dp-title">{monthName} {year}</span>
      <div id="dp-switch-next-month-container">
        <button type="button" className="dp-switch-month" id="dp-next-month" onClick={nextMonth}>
          {'>'}
        </button>
      </div>
    </div>
    <div id="dp-main-body">
      <div id="dp-weekdays-container">
        {weekdays.map(d => <div className="dp-weekday" key={getKey()}>{d}</div>)}
      </div>
      <div id="dp-weeks-container">
        {weeks.map(week => (
          <div key={getKey()} className="dp-week">
            {week.map(day => (
              <button
                disabled={!day.isCurrent}
                type="button"
                key={getKey()}
                className={getDayClassName(day)}
                onClick={() => onSelected(day.onClick)}
              >
                {day.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DatepickerContent;
