import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarItem from './NavbarItem';
import { THEME_COLOR } from '../utils/constants';
import { faGauge, faUser, faChartPie } from '@fortawesome/free-solid-svg-icons';

const ExpenseNavBar = styled.div`
  width: 16.66666667%;
  min-height: 100%;
  padding-top: 40px;
  background: ${THEME_COLOR};
`;

const Navbar = () => {
  const items = [
    {
      name: 'Dashboard',
      icon: <FontAwesomeIcon icon={faGauge} />,
      route: '/',
    },
    {
      name: 'Income',
      icon: <FontAwesomeIcon icon={faUser} />,
      route: '/income',
    },
    {
      name: 'Expenses',
      icon: <FontAwesomeIcon icon={faChartPie} />,
      route: '/expense',
    },
  ];
  return (
    <ExpenseNavBar>
      {items.map((item) => (
        <NavbarItem name={item.name} icon={item.icon} route={item.route} />
      ))}
    </ExpenseNavBar>
  );
};

export default Navbar;
