import styled from 'styled-components';
import { THEME_COLOR, HOVER_COLOR } from '../utils/constants';

const PaginationDiv = styled.div`
  display: flex;
`;

const Pageblock = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${THEME_COLOR};
  color: white;
  &:hover {
    background: ${HOVER_COLOR};
  }
`;

const Pagination = ({
  total = 0,
  pageSize = 0,
  currentPage = 0,
  onChangePage,
}) => {
  const getPaginationGroup = () => {
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(total / pageSize); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <PaginationDiv>
      {getPaginationGroup().map((item, idx) => {
        const blockStyle = idx !== 0 ? { marginLeft: 10 } : {};
        return (
          <Pageblock style={blockStyle} onClick={() => onChangePage(idx)}>
            {idx}
          </Pageblock>
        );
      })}
    </PaginationDiv>
  );
};

export default Pagination;
