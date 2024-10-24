import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


export const TitleTableRow = styled(TableRow)`
  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const StyledTableRow = styled(TableRow)<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#f5f5f5' : 'transparent')};
  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-head {
    font-weight: bold;
  }

  @media (max-width: 600px) {
    &:nth-of-type(1) {
      flex-basis: 50%;
    }

    &:nth-of-type(2) {
      flex-basis: 30%;
    }

    &:nth-of-type(3) {
      flex-basis: 100%;
      margin-top: 8px;
    }
  }
`;

export const StyledSortCell = styled(TableCell)`
  @media (max-width: 600px) {
    flex-basis: 30%;
  }
`;
