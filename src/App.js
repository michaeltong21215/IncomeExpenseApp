import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './components/Dashboard';
import Expense from './components/Expense';
import Income from './components/Income';
import Navbar from './components/Navbar';
import './App.css';
import AddIncomeExpense from './components/AddIncomeExpense';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <div
        style={{
          width: '80%',
        }}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/addincomeexpense/:type'>
            <Route
              path=':id/:date/:description/:amount'
              element={<AddIncomeExpense />}
            />
            <Route path='' element={<AddIncomeExpense />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
