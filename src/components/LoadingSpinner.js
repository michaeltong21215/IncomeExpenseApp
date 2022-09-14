import styled, { keyframes } from 'styled-components';
import { THEME_COLOR } from '../utils/constants';

const progressAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid ${THEME_COLOR};
  border-top: 10px solid white;
  border-radius: 50%;
  animation: ${progressAnimation} 1.5s linear infinite;
`;

const SpinnerContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <LoadingIcon />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
