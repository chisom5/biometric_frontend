import React from "react";
import { LoginContainer, LoginInner, BgInner } from "../../styles/loginStyle";
import Footer from "../../components/Footer";
import FormComponent from "./components/Form";
import { Box, Text } from "../../components/Primitives";
import colors from "../../theme/colors";

const Login = () => {
  return (
    <LoginContainer>
      <BgInner className="login_bg">
        <LoginInner>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pt={"40px"}
            mb={"18px"}
          >
            <Text
              fontSize={4}
              fontWeight={4}
              color={colors.white}
              lineHeight="44px"
            >
              Biometrio Frontend Exercise
            </Text>
          </Box>

          <FormComponent />
          <Footer />
        </LoginInner>
      </BgInner>
    </LoginContainer>
  );
};
export default Login;
