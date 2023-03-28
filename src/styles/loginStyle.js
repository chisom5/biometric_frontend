import styled from "styled-components";
import { Box } from "../components/Primitives";
import colors  from "../theme/colors";

export const LoginContainer = styled(Box)`
  width: 100%;
  height: 100vh;
`;

export const BgInner = styled.div`
  width: 100%;
  height: max-content;
`;
export const LoginInner = styled.div`
  position: relative;
  width: 70%;
  height: 100vh;
  margin: auto;
`;


export const LoginFormStyle = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  width: 38%;
  height: auto;
  margin: auto;
  padding: 2rem;
  margin-bottom: 10vh;

  .btn_submit {
    color: ${colors.danger};
    border: 1px solid ${colors.danger};
    letter-spacing: 0.04em;
    font-size: 14px;
    border-radius: 6px;
    padding: 4px 12px;
    font-weight: 600;
  }

  @media(max-width: 1024px){
    width: 50%;
  }
`;


export const FormStyle = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  width: 43%;
  height: auto;
  margin: auto;
  padding: 2rem;
  margin-bottom: 10vh;

  .btn_submit {
    color: ${colors.danger};
    border: 1px solid ${colors.danger};
    letter-spacing: 0.04em;
    font-size: 14px;
    border-radius: 6px;
    padding: 4px 12px;
    font-weight: 600;
  }

  @media(max-width: 1024px){
    width: 65%;
  }
`;
