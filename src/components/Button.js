import styled from 'styled-components';
import { HOVER_COLOR, THEME_COLOR } from '../utils/constants';

const NOOP = () => {};

const StyledButton = styled.div`
  cursor: pointer;
  background: ${THEME_COLOR};
  color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  border-radius: 9px;
  &:hover {
    background: ${HOVER_COLOR};
  }
`;

const Button = ({ title, onClick = NOOP }) => {
  return <StyledButton onClick={onClick}>{title}</StyledButton>;
};

export default Button;
