import React, { useState } from "react";
import { Button, notification, Alert } from "antd";
import { Formik, Field, Form } from "formik";
import { AntInput, AntPassword } from "../../../../components/AntFormik";
import {
  Box,
  CheckBox,
  Img,
  Label,
  Text,
} from "../../../../components/Primitives";
import * as Yup from "yup";
import { FormStyle } from "../../../../styles/loginStyle";
import colors from "../../../../theme/colors";
import { useNavigate } from "react-router";
import { CREATE_USER } from "../../../apiServices/mutation";
import { useMutation } from "@apollo/client";

const Schema = Yup.object().shape({
  userName: Yup.string()
    .matches(
      /^(?=.*[a-z0-9])(?=.*[@/./+/-/_\*])(?=.{1,150})/,
      "Please enter valid user name"
    )
    .required("User Name is required"),

  canLogin: Yup.bool().required("Verify you're not a robot"),
  isSuperuser: Yup.bool().required("Super user access is required"),
  isStaff: Yup.bool().required("Admin access is reqiured"),

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
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    canLogin: false,
    isSuperuser: false,
    isStaff: false,
  };

  const [createUser, { error, loading }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      console.log(createUser);
      if(createUser !== null) navigate("/login");
    },
  });

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleCheckboxChange = (e, name, setFieldValue) => {
    setFieldValue(name, e.target.checked);
  };
  const handleSubmit = (values, { resetForm }) => {
    const params = {
      password: values.password,
      isSuperuser: values.isSuperuser,
      username: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      isStaff: values.isStaff,
      canLogin: values.canLogin,
    };
    createUser({ variables: params });
   
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  if (error) {
    if (error.message.includes("expired")) {
      notification.open({
        message: "Unauthorized Error",
        description: error.message,
      });
      navigate("/login");
    } else {
      notification.open({
        message: "Error",
        description: error.message,
      });
    }
  }

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <FormStyle>
      <Formik
        initialValues={initial_value}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ submitCount, submitForm, setFieldValue, values, errors }) => {
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
                  Create an Account
                </Text>
              </Box>

              <Box display="flex" style={{ gap: "12px" }}>
                <Box flex={1}>
                  <Label>First name</Label>
                  <Field
                    width="100%"
                    type="text"
                    style={{ height: "40px", borderRadius: "4px" }}
                    name="firstName"
                    onChange={(e) => handleTextChange(e, setFieldValue)}
                    component={AntInput}
                    placeholder="Enter your first name"
                    submitCount={submitCount}
                  />
                </Box>

                <Box flex={1}>
                  <Label>Last name</Label>
                  <Field
                    width="100%"
                    type="text"
                    style={{ height: "40px", borderRadius: "4px" }}
                    name="lastName"
                    onChange={(e) => handleTextChange(e, setFieldValue)}
                    component={AntInput}
                    placeholder="Enter your last name"
                    submitCount={submitCount}
                  />
                </Box>
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
                <Label>Email</Label>
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
              </Box>

                <Box mb={'18px'}>
                  <Box display="flex" style={{ gap: "10px" }} mb={"1px"}>
                    <CheckBox
                      name="isSuperuser"
                      checked={values.isSuperuser}
                      onChange={(e) =>
                        handleCheckboxChange(e, "isSuperuser", setFieldValue)
                      }
                    />
                    <Text>Super User Permission</Text>
                  </Box>
                  {errors.isSuperuser && (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {errors.isSuperuser}</div>
                    </div>
                  )}
                </Box>

                <Box mb={'18px'}>
                  <Box display="flex" style={{ gap: "10px" }}>
                    <CheckBox
                      name="isStaff"
                      checked={values.isStaff}
                      onChange={(e) =>
                        handleCheckboxChange(e, "isStaff", setFieldValue)
                      }
                    />
                    <Text>Staff User Permission </Text>

                  </Box>
                  {errors.isStaff && (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {errors.isStaff}</div>
                    </div>
                  )}
                </Box>
              
              <Box>
                <Box mb={"10px"}>
                  <Box display="flex" style={{ gap: "10px" }} mb={"8px"}>
                    <CheckBox
                      name="canLogin"
                      checked={values.canLogin}
                      onChange={(e) =>
                        handleCheckboxChange(e, "canLogin", setFieldValue)
                      }
                    />
                    <Text>Verify that you're not a robot</Text>
                  </Box>
                  {errors.canLogin && (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {errors.canLogin}</div>
                    </div>
                  )}
                </Box>

                <Text
                  fontSize="11px"
                  fontWeight={7}
                  position="relative"
                  top={"-6px"}
                  color={colors.lightBlue}
                  style={{ cursor: "pointer" }}
                  onClick={navigateToLogin}
                >
                  Already have an account?
                </Text>
              </Box>

              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  className="btn_submit"
                  type="submit"
                  onClick={submitForm}
                  loading={loading}
                  htmlType='submit'
                >
                  Submit
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </FormStyle>
  );
};

export default FormComponent;
