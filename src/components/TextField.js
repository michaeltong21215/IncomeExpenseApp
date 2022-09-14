import styled from 'styled-components';

const Title = styled.div`
  font-weight: bold;
`;

const Textbox = styled.input`
  height: 40px;
  width: 300px;
  padding-left: 20px;
`;

const TextField = ({
  title = '',
  value = '',
  onChange = () => {},
  placeholder = '',
}) => {
  return (
    <div>
      <Title>{title}</Title>
      <Textbox
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
