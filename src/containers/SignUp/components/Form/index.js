import React from "react";
import { Formik, Field, Form } from "formik";
import { AntInput, AntPassword } from "../../../../components/AntFormik";
import { Box, Img, Text } from "../../../../components/Primitives";
import * as Yup from "yup";
import { FormStyle } from "../../../../styles/loginStyle";
import colors from "../../../../theme/colors";
import { ButtonOutlined } from "../../../../components/Button";
import { useNavigate } from "react-router";
import qs from "qs";

const Schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    ),
  password: Yup.string()
    .required("Password is required")
    // zVdG8Pppcek=
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\?=+\`)\:;\(-_\<,\.>'\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and special case character"
    ),
});

const FormComponent = () => {
  const navigate = useNavigate();

  const initial_value = {
    email: "",
    password: "",
  };

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSubmit = (values) => {
    const params = qs.stringify({
      username: values.email,
      password: values.password,
      grant_type: "password",
    });
  };

  return (
    <FormStyle>
      <Formik
        initialValues={initial_value}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ submitCount, submitForm, setFieldValue }) => (
          <Form style={{ width: "100%" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={"20px"}
            >
              <Img
                src={
                  require("../../../../assets/images/login-profile.svg").default
                }
              />
              <Text
                fontSize="18px"
                pt={"24px"}
                fontWeight={6}
                lineHeight="25px"
                color={colors.darkBlue}
              >
                Login into your account
              </Text>
            </Box>

            <Box>
              <Field
                width="100%"
                type="text"
                style={{ height: "40px", borderRadius: "4px" }}
                name="email"
                onChange={(e) => handleTextChange(e, setFieldValue)}
                component={AntInput}
                placeholder="Enter email address"
                submitCount={submitCount}
              />
            </Box>

            <Box>
              <Field
                width="100%"
                type="text"
                style={{ height: "40px", borderRadius: "4px" }}
                name="password"
                onChange={(e) => handleTextChange(e, setFieldValue)}
                component={AntPassword}
                placeholder="Enter your password"
                submitCount={submitCount}
              />
            </Box>

            <Box display="flex" justifyContent="center" mt={3}>
              <ButtonOutlined
                color={colors.danger}
                border={`1px solid ${colors.danger}`}
                letterSpacing="0.04em"
                fontSize="14px"
                borderRadius="6px"
                p={"10px 20px"}
                fontWeight={7}
                type="submit"
                onClick={submitForm}
              >
                Login
              </ButtonOutlined>
            </Box>
          </Form>
        )}
      </Formik>
    </FormStyle>
  );
};

export default FormComponent;
