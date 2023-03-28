import React from "react";
import { LoginContainer, LoginInner, BgInner } from "../../styles/loginStyle";
import Footer from "../../components/Footer";
import FormComponent from "./components/Form";
import { Box, Text } from "../../components/Primitives";
import colors from "../../theme/colors";
import { gql, useQuery } from "@apollo/client";
import client from "../../config/client";

const GET_ALL_USERS = gql`
  query allUsers {
    allUsers {
      items {
        id
        firstName
        lastName
      }
    }
  }
`;

const SignUp = () => {
  const { data, error, loading } = useQuery(GET_ALL_USERS);

  console.log({ data, error, loading });


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
