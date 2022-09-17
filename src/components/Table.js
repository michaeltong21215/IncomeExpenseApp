import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { TRASH_CAN_HOVER_COLOR, EDIT_HOVER_COLOR } from '../utils/constants';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';

const HeaderSection = styled.div`
  display: flex;
  padding-top: 40px;
`;

const HeaderText = styled.div`
  width: 20vw;
  text-align: left;
`;

const RowSection = styled.div`
  display: flex;
`;

const RowText = styled.div`
  text-align: left;
  padding-top: 40px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  width: 18.8vw;
`;

const RowIcon = styled.div`
  text-align: left;
  padding-top: 40px;
  display: flex;
  justify-content: center;
`;

const TrashIconBlock = styled.div`
  color: white;
  background-color: #dc143c;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 4px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: ${TRASH_CAN_HOVER_COLOR};
  }
`;

const EditIconBlock = styled.div`
  color: white;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 4px;
  &:hover {
    background: ${EDIT_HOVER_COLOR};
  }
`;

const NOOP = () => {};

const renderHeader = (headers) => {
  return (
    <HeaderSection>
      {headers.map((header, idx) => (
        <HeaderText>{header}</HeaderText>
      ))}
    </HeaderSection>
  );
};

const renderRows = (data, navigate, type, getData, setIsLoading) => {
  const deleteItem = async (id) => {
    setIsLoading(true);
    await fetch(`https://mtongbudgettrack.herokuapp.com/${type}/${id}`, {
      method: 'DELETE',
    });

    getData();
    setIsLoading(false);
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <RowSection>
            <RowText>{item.date}</RowText>
            <RowText>{item.description}</RowText>
            <RowText>${item.amount}</RowText>
            <RowIcon>
              <TrashIconBlock onClick={() => deleteItem(item.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </TrashIconBlock>
              <EditIconBlock
                onClick={() => {
                  navigate(
                    `/addincomeexpense/${type}/${item.id}/${
                      item.date
                    }/${item.description.split(' ').join('-')}/${item.amount}`
                  );
                }}>
                <FontAwesomeIcon icon={faPen} />
              </EditIconBlock>
            </RowIcon>
          </RowSection>
        );
      })}
    </div>
  );
};

const Table = ({
  header = [],
  data = [],
  currentPage = 0,
  setCurrentPage = NOOP,
  pageSize = 0,
  loading = false,
  type = 'income',
  getData = NOOP,
  setIsLoading = NOOP,
}) => {
  const [paginateData, setPaginateData] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    const offset = currentPage * pageSize;
    const pageData = data.slice(offset, offset + pageSize);

    setPaginateData(pageData);
  }, [, currentPage, data]);

  return (
    <div>
      {renderHeader(header)}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {renderRows(paginateData, navigate, type, getData, setIsLoading)}
          {data.length > pageSize && (
            <Pagination
              total={data.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onChangePage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Table;
