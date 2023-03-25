import React from "react";
import { LoginContainer, LoginInner, BgInner } from "../../styles/loginStyle";
import Footer from "../../components/Footer";
import FormComponent from "./components/Form";
import { Box, Img, Text } from "../../components/Primitives";
import colors from "../../theme/colors";
import { ErrorComponent } from "../../components/ErrorBoundry/errorComponent";
// import {
//   clearGlobalSuccessMessage,
//   clearGlobalErrorMessage,
// } from "../../services/global/action";

const SignUp = () => {
  // const { globalError, globalSuccess } = useSelector((state) => state.global);

  // useEffect(() => {
  //   if (globalError !== null || globalSuccess !== null) {
  //     setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
  //     setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
  //   }
  // }, [dispatch, globalError, globalSuccess]);

  return (
    // <ErrorComponent
    //   error={globalError}
    //   success={globalSuccess}
    //   clearErrorMessage={clearGlobalErrorMessage}
    //   clearSuccessMessage={clearGlobalSuccessMessage}
    // >
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
                Biometrio Earth Frontend Exercise
              </Text>
            </Box>

            <FormComponent />
            <Footer />
          </LoginInner>
        </BgInner>
      </LoginContainer>
    // </ErrorComponent>
  );
};
export default SignUp;
