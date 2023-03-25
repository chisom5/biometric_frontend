import React from "react";
import styled from "styled-components";
import colors from "../../theme/colors";
import { Box, Text } from "../Primitives";

const FooterStyle = styled(Box)`
  position: absolute;
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Footer = () => {
  return (
    <FooterStyle>
      <Text
        color={colors.white}
        fontSize="12px"
        fontWeight={4}
        textAlign="center"
      >
        This exercise aims to create a simple SPA to handle file uploads. Use
        the framework/library you are more comfortable with to build it
        (although React is prefered).
      </Text>
    </FooterStyle>
  );
};

export default Footer;
