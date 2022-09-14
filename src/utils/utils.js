import { MONTHS } from './constants';
export const trimYear = (year) => String(year).slice(-2);

export const generateDateLabels = (year) => {
  const months = [
    `Jan-${trimYear(year)}`,
    `Feb-${trimYear(year)}`,
    `Mar-${trimYear(year)}`,
    `Apr-${trimYear(year)}`,
    `May-${trimYear(year)}`,
    `Jun-${trimYear(year)}`,
    `Jul-${trimYear(year)}`,
    `Aug-${trimYear(year)}`,
    `Sep-${trimYear(year)}`,
    `Oct-${trimYear(year)}`,
    `Nov-${trimYear(year)}`,
    `Dec-${trimYear(year)}`,
  ];
  return months;
};

export const generateChartData = (data) => {
  const newData = MONTHS.map((month) => {
    const collectiveAmount = data.filter((incomeData) => {
      const dataMonth = incomeData.date.split('-')[0];
      if (dataMonth === month) {
        return dataMonth === month;
      }
      return 0;
    });
    if (collectiveAmount.length) {
      return collectiveAmount.reduce((acc, curr) => {
        return acc + Number(curr.amount);
      }, 0);
    }
    return 0;
  });
  return newData;
};
