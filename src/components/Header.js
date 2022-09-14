import styled from 'styled-components';

const Title = styled.div`
  font-weight: bold;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 1.5rem;
  font-size: 1.25rem;
`;

const Header = ({ title = '' }) => {
  return (
    <HeaderSection>
      <Title>{title}</Title>
      <div>Michael Tong</div>
    </HeaderSection>
  );
};

export default Header;
