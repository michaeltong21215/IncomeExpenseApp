import { useEffect, useState } from 'react';
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

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await fetch('http://localhost:8000/income');
    const data = await res.json();
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setIncomeData(data);
    setIsloading(false);
  };
  useEffect(() => {
    let mounted = true;
    setIsloading(true);

    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Header title='Income' />
      <IncomePanel>
        <TitleHeader>
          <Title>Income Table</Title>
          <Button
            title='Add New Income'
            onClick={() => {
              navigate('/addincomeexpense/income');
            }}
          />
        </TitleHeader>
        <Table
          header={['Date', 'Description', 'Amount', 'Action']}
          data={incomeData}
          getData={getData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={5}
          loading={isLoading}
          setIsloading={setIsloading}
          type='income'
        />
      </IncomePanel>
    </>
  );
};

export default Income;
