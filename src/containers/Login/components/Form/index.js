import React, { useState } from "react";
import { Alert, notification, Button } from "antd";
import { Formik, Field, Form } from "formik";
import { AntInput, AntPassword } from "../../../../components/AntFormik";
import { Box, Img, Label, Text } from "../../../../components/Primitives";
import * as Yup from "yup";
import { LoginFormStyle } from "../../../../styles/loginStyle";
import colors from "../../../../theme/colors";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_USER } from "../../../apiServices/mutation";

const Schema = Yup.object().shape({
  userName: Yup.string()
    .matches(
      /^(?=.*[a-z0-9])(?=.*[@/./+/-/_\*])(?=.{1,150})/,
      "Please enter valid user name"
    )
    .required("User Name is required"),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\?=+\`)\:;\(-_\<,\.>'\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and special case character"
    ),
});

const FormComponent = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const initial_value = {
    userName: "",
    password: "",
  };

  const [tokenAuth, { data, loading, error }] = useMutation(AUTHENTICATE_USER, {
    onCompleted: ({ tokenAuth }) => {
      if (tokenAuth !== null) {
        localStorage.setItem("auth-token", JSON.stringify(tokenAuth.token));
        navigate("/d/file_upload");
        notification.open({
          message: "Success",
          description: `User succesfully authenticated.`,
        });
      }
    },
  });

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSubmit = (values, { resetForm }) => {
    const params = {
      username: values.userName,
      password: values.password,
    };
    tokenAuth({ variables: params });
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (error) {
    if (error.message.includes("expired")) {
      notification.open({
        message: "Unauthorized Error",
        description: error.message,
      });
      navigate("/login");
    }
  }
  return (
    <LoginFormStyle>
      <Formik
        initialValues={initial_value}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ submitCount, submitForm, setFieldValue }) => {
          return (
            <Form style={{ width: "100%" }}>
              {error && visible && (
                <Box mb={"10px"}>
                  <Alert
                    message="Error"
                    description={error !== undefined && error.message}
                    type="error"
                    showIcon
                    closable
                    afterClose={handleClose}
                  />
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={"20px"}
              >
                <Img
                  src={
                    require("../../../../assets/images/login-profile.svg")
                      .default
                  }
                />
                <Text
                  fontSize="22px"
                  pt={"18px"}
                  fontWeight={6}
                  lineHeight="25px"
                  color={colors.darkBlue}
                >
                  Login into your account
                </Text>
              </Box>

              <Box>
                <Label>User name</Label>
                <Field
                  width="100%"
                  type="text"
                  style={{ height: "40px", borderRadius: "4px" }}
                  name="userName"
                  onChange={(e) => handleTextChange(e, setFieldValue)}
                  component={AntInput}
                  placeholder="Enter your user name"
                  submitCount={submitCount}
                />
              </Box>

              <Box>
                <Label>Password</Label>
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

                <Text
                  fontSize="11px"
                  fontWeight={7}
                  position="relative"
                  top={"-6px"}
                  color={colors.lightBlue}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Don't have an account?
                </Text>
              </Box>

              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  // key="confirm"
                  className="btn_submit"
                  type="submit"
                  onClick={submitForm}
                  loading={loading}
                >
                  Login
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </LoginFormStyle>
  );
};

export default FormComponent;
