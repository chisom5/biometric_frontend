import React, { useRef } from "react";
import { Modal, Button, notification } from "antd";
import { ModalContainer } from "../../../../../styles/pageStyle";
import SVG from "react-inlinesvg";
import { Formik, Field, Form } from "formik";
import { AntInput, AntPassword } from "../../../../../components/AntFormik";
import {
  Box,
  Label,
  Text,
  CheckBox,
} from "../../../../../components/Primitives";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { withContext } from "../../../../../config/contextConfig";
import { CREATE_USER } from "../../../../apiServices/mutation";
import { GET_ALL_USERS } from "../../../../apiServices/query";
import { useMutation } from "@apollo/client";


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

const AddNewUserModal = (props) => {
  const formikFormRef = useRef();

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

  const navigate = useNavigate();
  const [createUser, { error, loading }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      if (createUser !== null) {
        props.value.dispatch({
          type: "RESET_FILE",
          payload: { showAddUser: false },
        });
      }
    },
    refetchQueries: [
      { query: GET_ALL_USERS, variables: { page: 1, pageSize: 10 } },
    ],
  });

  const handleCancel = () => {
    props.value.dispatch({
      type: "RESET_USER",
      payload: { showAddUser: false },
    });

    formikFormRef.current.resetForm({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      canLogin: false,
      isSuperuser: false,
      isStaff: false,
    });
  };

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
    resetForm({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      canLogin: false,
      isSuperuser: false,
      isStaff: false,
    });
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

  return (
    <Modal
      title={null}
      open={props.value.state.showAddUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Create New User</p>
          </Box>
          {/* icon delete */}
          <span onClick={handleCancel} className="close-modal-icon">
            <SVG
              src={
                require("../../../../../assets/images/close-square.svg").default
              }
            />
          </span>
        </header>
        <section className="modal-mainContent">
          <div>
            <Formik
              initialValues={initial_value}
              validationSchema={Schema}
              onSubmit={handleSubmit}
              innerRef={formikFormRef}
            >
              {({ submitCount, setFieldValue, submitForm, errors, values }) => (
                <Form style={{ width: "100%" }}>
                  <Box display="flex" style={{ gap: "12px" }}>
                    <Box flex={1}>
                      <Label>First Name</Label>
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
                      <Label>Last Name</Label>
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
                    <Label>User Name</Label>
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

                    <Box flex={1} mb={'18px'}>
                      <Box display="flex" style={{ gap: "10px" }} mb={"1px"}>
                      
                        <CheckBox
                          name="isSuperuser"
                          checked={values.isSuperuser}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              "isSuperuser",
                              setFieldValue
                            )
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

                    <Box flex={1} mb={'18px'}>
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

                  <div className="buttonContainer">
                    <Button
                      key="confirm"
                      className="confirmButton"
                      type="submit"
                      loading={loading}
                      onClick={submitForm}
                    >
                      Create User
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default withContext(AddNewUserModal);
