import styled from 'styled-components';
import { useState } from 'react';
//import ReactMonthPicker from 'react-month-picker';
//import { MONTHS } from '../utils/constants';
import 'react-month-picker/css/month-picker.css';

const DateButton = styled.button`
  background: none;
  border: 1px solid black;
  width: 100px;
  height: 30px;
`;

const Datepicker = ({ monthYear, setMonthYear }) => {
  const range = {
    min: { year: 2018, month: 3 },
    max: { year: new Date().getFullYear(), month: new Date().getMonth() },
  };
  const [isVisible, setVisibility] = useState(false);

  const showMonthPicker = (event) => {
    setVisibility(true);
    event.preventDefault();
  };

  const handleOnDismiss = () => {
    setVisibility(false);
  };

  const handleOnChange = (year, month) => {
    setMonthYear({ year, month });
    setVisibility(false);
  };

  const getMonthValue = () => {
    const month = monthYear && monthYear.month ? monthYear.month : 0;
    const year = monthYear && monthYear.year ? monthYear.year : 0;

    return month && year ? `${month}-${year}` : 'Select Month';
  };

  return (
    <div className='MonthYearPicker'>
      <DateButton onClick={showMonthPicker}>{getMonthValue()}</DateButton>

      {/* <ReactMonthPicker
        show={isVisible}
        lang={MONTHS}
        years={range}
        value={monthYear?.year ? monthYear : { year: new Date().getFullYear() }}
        onChange={handleOnChange}
        onDismiss={handleOnDismiss}
      /> */}
    </div>
  );
};

export default Datepicker;
