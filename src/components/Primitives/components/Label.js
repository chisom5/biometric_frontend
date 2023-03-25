import styled from "styled-components";
import { base } from "../../../styles/baseStyle";
import colors from "../../../theme/colors";

const Label = styled.label`
  color: ${colors.gray2};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 6px;

  ${base};
`;

export default Label;
