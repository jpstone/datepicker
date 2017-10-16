import moment from 'moment';

const createDay = (isCurrent, name) => {
  return {
    isCurrent,
    name,
  };
};

const createCalendarModel = (d = moment().format(), dayCreator = createDay) => {
  const TOTAL_DAYS = 42;

  const mapDays = isCurrent => day => dayCreator(isCurrent, day);
  const getNextMonth = x => x.clone().add(1, 'month');
  const getPreviousMonth = x => x.clone().subtract(1, 'month');
  const monthStartDay = x => x.clone().date(1).day();
  const compileDays = x => Array.from({ length: x.daysInMonth() }).map((x, y) => y + 1);
  const getCurrentMonthName = x => moment.months(x.month());

  const getPreviousMonthsDays = (x) => {
    const totalPrevDays = compileDays(getPreviousMonth(x));
    return totalPrevDays.slice(totalPrevDays.length - monthStartDay(x)).map(mapDays(false));
  }

  const getPreviousAndCurrentMonthsDays = x => [
    ...getPreviousMonthsDays(x),
    ...compileDays(x).map(mapDays(true)),
  ];

  const getNextMonthsDays = x => Array.from({ length: TOTAL_DAYS - x.length })
    .map((x, y) => dayCreator(false, y + 1))

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

  let _date = moment(d);
  let _weeks;

  const setDate = (x) => {
    _date = x;
    return _date;
  };

  const getDate = () => _date;

  const setWeeks = (x) => {
    _weeks = createWeeks(x);
    return x;
  };

  const getWeeks = () => _weeks;

  setWeeks(getDate());

  return {
    getWeeks,
    getMonthName: () => getCurrentMonthName(getDate()),
    getYear: () => getDate().year(),
    nextMonth() {
      setDate(setWeeks(getNextMonth(getDate())));
      return this;
    },
    prevMonth() {
      setDate(setWeeks(getPreviousMonth(getDate())));
      return this;
    },
  };
};

export default createCalendarModel;
