import moment from 'moment';

const createDay = ({ name, isCurrent, contextDate, getChosenDate, setChosenDate }) => {
  const date = contextDate.clone().date(name);
  return {
    onClick: () => setChosenDate(date.clone()),
    isChosen: date.isSame(getChosenDate(), 'day'),
    isCurrent,
    name,
  };
};

const createCalendarModel = (d = moment().format(), dayCreator = createDay) => {
  const TOTAL_DAYS = 42;

  let _chosenDate = '';
  let _date = moment(d);

  const setDate = (x) => {
    _date = x;
    return _date;
  };

  const setChosenDate = (x) => {
    _chosenDate = x;
    return _chosenDate;
  };

  const getDate = () => _date;
  const getChosenDate = () => _chosenDate;

  const mapDays = (isCurrent, contextDate = getDate()) => day => dayCreator({ 
    name: day,
    isCurrent,
    contextDate,
    getChosenDate,
    setChosenDate,
  });

  const getNextMonth = x => x.clone().add(1, 'month');
  const getPreviousMonth = x => x.clone().subtract(1, 'month');
  const monthStartDay = x => x.clone().date(1).day();
  const compileDays = x => Array.from({ length: x.daysInMonth() }).map((x, y) => y + 1);
  const getCurrentMonthName = x => moment.months(x.month());

  const getPreviousMonthsDays = (x) => {
    const totalPrevDays = compileDays(getPreviousMonth(x));
    return totalPrevDays.slice(totalPrevDays.length - monthStartDay(x))
      .map(mapDays(false, getPreviousMonth(getDate())));
  }

  const getPreviousAndCurrentMonthsDays = x => [
    ...getPreviousMonthsDays(x),
    ...compileDays(x).map(mapDays(true)),
  ];

  const getNextMonthsDays = x => Array.from({ length: TOTAL_DAYS - x.length })
    .map((x, y) => mapDays(false, getNextMonth(getDate()))(y + 1))

  const getFullListOfDays = x => {
    const previousAndCurrent = getPreviousAndCurrentMonthsDays(x);
    return [...previousAndCurrent, ...getNextMonthsDays(previousAndCurrent)];
  };

  const createWeeks = (x) => {
    function buildWeeks() {
      let _currentWeek = 0;

      return (weeks, day, index) => {
        if (index && index % 7 === 0) {
          _currentWeek++;
        }
        weeks[_currentWeek].push(day);
        return weeks;
      };
    }

    return getFullListOfDays(x).reduce(buildWeeks(), [[], [], [], [], [], []]);
  }

  return {
    getWeeks: () => createWeeks(getDate()),
    getMonthName: () => getCurrentMonthName(getDate()),
    getYear: () => getDate().year(),
    nextMonth() {
      setDate(getNextMonth(getDate()));
      return this;
    },
    prevMonth() {
      setDate(getPreviousMonth(getDate()));
      return this;
    },
    ...moment,
  };
};

export default createCalendarModel;
