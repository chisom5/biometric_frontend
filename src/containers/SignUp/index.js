import React, { useEffect } from "react";
import { LoginContainer, LoginInner, BgInner } from "../../styles/loginStyle";
import Footer from "../../components/Footer";
import FormComponent from "./components/Form";
import { Box, Text } from "../../components/Primitives";
import colors from "../../theme/colors";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../apiServices/mutation";

const SignUp = () => {
  const [tokenAuth, { data, loading, error }] = useMutation(AUTHENTICATE_USER, {
    onCompleted: ({ tokenAuth }) => {
      if (tokenAuth !== null) {
        localStorage.setItem("auth-token", JSON.stringify(tokenAuth.token));
      }
    },
  });

  console.log({ data, error, loading });

  useEffect(() => {
    tokenAuth({ variables: { username: "admin_1", password: "Password12*" } });
  }, []);

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
export default SignUp;
