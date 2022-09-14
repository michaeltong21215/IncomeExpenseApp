import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HOVER_COLOR } from '../utils/constants';

const MenuItem = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
  padding-left: 25px;
  &:hover {
    color: white;
    background: ${HOVER_COLOR};
  }
`;

const Icon = styled.div`
  padding-right: 10px;
`;

const NavbarItem = ({ name, icon, route }) => {
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => {
        navigate(route);
      }}>
      <Icon>{icon}</Icon>
      <div>{name}</div>
    </MenuItem>
  );
};

export default NavbarItem;
