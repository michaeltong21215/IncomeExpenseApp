import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TextField from './TextField';
import Header from './Header';
import Button from './Button';
import Datepicker from './Datepicker';
import { MONTHS } from '../utils/constants';

const IncomeForm = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 25px;
  padding-top: 30px;
`;

const ButtonSection = styled.div`
  padding-top: 10px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const AddIncomeExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [monthYear, setMonthYear] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { type, id } = params;

  useEffect(() => {
    if (params.description && params.amount) {
      const { date = '', description = '', amount = '' } = params;
      const paramMonthyear = date.split('-');
      const paramMonth = paramMonthyear[0];

      const monthIdx = MONTHS.findIndex((month) => paramMonth === month);
      setDescription(description);
      setAmount(amount);
      setMonthYear({ month: monthIdx + 1, year: paramMonthyear[1] });
    }
  }, []);

  const addNewEntry = async () => {
    const paramAmt = params.amount;
    try {
      const year = monthYear.year;
      const month = MONTHS[monthYear.month - 1];
      const date = `${month}-${year}`;
      const url = paramAmt
        ? `https://mtongbudgettrack.herokuapp.com/${type}/${id}`
        : `https://mtongbudgettrack.herokuapp.com/${type}`;

      let body = {
        date,
        description,
        amount,
      };
      if (!paramAmt) {
        body.id = Date.now();
      }
      body = JSON.stringify(body);
      const res = await fetch(url, {
        method: paramAmt ? 'PUT' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
    } catch (err) {
      console.log('err: ', err);
    } finally {
      navigate(`/${type}`);
    }
  };

  const title = params.description ? `Edit ${type}` : `Add New ${type}`;

  const buttonTitle = params.description ? 'Save Changes' : `Add ${type}`;

  return (
    <>
      <Header title={title} />
      <IncomeForm>
        <TextField
          title='Description'
          value={description}
          onChange={setDescription}
          placeholder='Enter your description here'
        />
        <br />
        <TextField
          title='Amount'
          value={amount}
          onChange={setAmount}
          placeholder='Enter your amount here'
        />
        <br />
        <Title>Date</Title>
        <Datepicker monthYear={monthYear} setMonthYear={setMonthYear} />
        <ButtonSection>
          <Button title={buttonTitle} onClick={() => addNewEntry()} />
        </ButtonSection>
      </IncomeForm>
    </>
  );
};

export default AddIncomeExpense;
