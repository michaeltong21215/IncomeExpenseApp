import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { THEME_COLOR } from '../utils/constants';

import Button from './Button';
import Header from './Header';
import Table from './Table';

const IncomePanel = styled.div`
  padding: 20px;
  border: solid 1px rgb(209, 209, 209);
  margin-left: 20px;
  border-radius: 9px;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${THEME_COLOR};
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-self: center;
`;

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setIsloading(true);
    const getData = async () => {
      const res = await fetch('https://mtongbudgettrack.herokuapp.com/expense');
      const data = await res.json();
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setExpenseData(data);
      setIsloading(false);
    };
    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Header title='Expense' />
      <IncomePanel>
        <TitleHeader>
          <Title>Expense Table</Title>
          <Button
            title='Add New Expense'
            onClick={() => {
              navigate('/addincomeexpense/expense');
            }}
          />
        </TitleHeader>
        <Table
          header={['Date', 'Description', 'Amount', 'Action']}
          data={expenseData}
          setData={setExpenseData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={5}
          loading={isLoading}
          setIsloading={setIsloading}
          type='expense'
        />
      </IncomePanel>
    </>
  );
};

export default Expense;
