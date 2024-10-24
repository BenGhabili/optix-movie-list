import styled from "@emotion/styled";
import {Typography} from "@mui/material";
import TableCell from "@mui/material/TableCell";

export const MainHeader = styled(Typography)`
  margin: 10px 0 20px 5px;
  font-size: 48px;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

export const HeaderTotalNumbers= styled(Typography)`
  font-size: 30px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;
