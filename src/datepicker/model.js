import moment from 'moment';

const createCalendarModel = (d = moment().format()) => {
  const start = moment(d);
  const createDay = (isCurrent, day) => {
    return {
      isCurrent,
      day,
    };
  };
  const mapDays = isCurrent => (x, index) => createDay(isCurrent, index + 1);
  const getNextMonth = x => x.clone().add(1, 'month');
  const getPreviousMonth = x => x.clone().subtract(1, 'month');
  const monthStartDay = x => x.clone().date(1).day();
  const compileDays = x => Array.from({ length: x.daysInMonth() }).map(mapDays);
  const currentMonthName = x => moment.months()[x.month()];

  const getPreviousMonthsDays = (x) => {
    const totalPrevDays = compileDays(getPreviousMonth(x));
    return totalPrevDays.slice(totalPrevDays.length - monthStartDay(x)).map(mapDays(false));
  }

  const getPreviousAndCurrentMonthsDays = x => [
    ...getPreviousMonthsDays(x),
    ...compileDays(x).map(mapDays(true)),
  ];
  const getNextMonthsDays = x => Array.from({ length: 42 - x.length }).map(mapDays(false));

  const getFullListOfDays = x => {
    const previousAndCurrent = getPreviousAndCurrentMonthsDays(x);
    return [...previousAndCurrent, ...getNextMonthsDays(previousAndCurrent)];
  };

  // const createWeeks = () => Array.from({ length: 6 }).map(() => [Array.from({ length: 7 })]);
  const createWeeks = () => {
    const buildWeeks = () => {
      let _currentWeek = 0;
      return (weeks, day, index) => {
        if (index && index % 7 === 0) {
          _currentWeek++;
        }
        weeks[_currentWeek].push(day);
        return weeks;
      };
    };
    return getFullListOfDays(getNextMonth(start)).reduce(buildWeeks(), [[], [], [], [], [], []]);
  }

  return {
    moment,
    fullList: getFullListOfDays(getNextMonth(start)),
    weeks: createWeeks(),
  };
};

export default createCalendarModel;
