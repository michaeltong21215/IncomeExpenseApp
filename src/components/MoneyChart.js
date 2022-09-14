import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { generateChartData, generateDateLabels } from '../utils/utils';
import { YEARS } from '../utils/constants';
import LoadingSpinner from './LoadingSpinner';
Chart.register(...registerables);

const DashboardPanel = styled.div`
  padding: 20px;
  border: solid 1px rgb(209, 209, 209);
  margin-left: 20px;
  border-radius: 9px;
`;

const MoneyChart = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [currentIncomeData, setCurrentIncomeData] = useState([]);

  const [expenseData, setExpenseData] = useState([]);
  const [currentExpenseData, setCurrentExpenseData] = useState([]);

  const [isLoading, setIsloading] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2022');
  const getData = async () => {
    const res = await fetch('http://localhost:8000/income');
    const incomedata = await res.json();

    const expenseRes = await fetch('http://localhost:8000/expense');
    const expensedata = await expenseRes.json();

    incomedata.sort((a, b) => new Date(b.date) - new Date(a.date));
    expensedata.sort((a, b) => new Date(b.date) - new Date(a.date));

    setIncomeData(incomedata);
    setExpenseData(expensedata);

    const curIncomeData = incomedata.filter((info) => {
      const year = info.date.split('-')[1];
      return year === selectedYear;
    });

    const curExpenseData = expensedata.filter((info) => {
      const year = info.date.split('-')[1];
      return year === selectedYear;
    });

    setCurrentIncomeData(generateChartData(curIncomeData));
    setCurrentExpenseData(generateChartData(curExpenseData));
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

  useEffect(() => {
    const curIncomeData = incomeData.filter((info) => {
      const year = info.date.split('-')[1];
      return year === selectedYear;
    });

    const curExpenseData = expenseData.filter((info) => {
      const year = info.date.split('-')[1];
      return year === selectedYear;
    });
    setCurrentIncomeData(generateChartData(curIncomeData));
    setCurrentExpenseData(generateChartData(curExpenseData));
  }, [selectedYear]);

  const data = {
    labels: generateDateLabels(selectedYear),
    datasets: [
      {
        label: 'Income',
        fill: false,
        backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(194, 114, 239, 1)',
        data: currentIncomeData,
        tension: 0.25,
      },
      {
        label: 'Expense',
        fill: false,
        backgroundColor: 'rgba(40, 12, 2, 0.2)',
        borderColor: 'rgba(2, 99, 242, 1)',
        data: currentExpenseData,
        tension: 0.25,
      },
    ],
  };
  const onYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <DashboardPanel>
      <div class='graph_func'>
        <b>Year Report</b>
        <select
          class='form-select'
          value={selectedYear}
          aria-label='Default select example'
          onChange={onYearChange}>
          {YEARS.map((year, i) => (
            <option key={i} selected={selectedYear}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? <LoadingSpinner /> : <Line data={data} />}
    </DashboardPanel>
  );
};

export default MoneyChart;
