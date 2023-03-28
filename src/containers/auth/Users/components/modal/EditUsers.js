import React from "react";
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
import { UPDATE_USER } from "../../../../apiServices/mutation";
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

const EditUsersModal = (props) => {

  const initial_value = {
    firstName: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.firstName ? props.value.state.currentUserObj.firstName : "",
    lastName: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.lastName ? props.value.state.currentUserObj.lastName : "",
    userName: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.username ? props.value.state.currentUserObj.username : "",
    email: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.email ? props.value.state.currentUserObj.email : "",
    password: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.password ? props.value.state.currentUserObj.password : "",
    canLogin: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.canLogin && props.value.state.currentUserObj.canLogin,
    isSuperuser: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.isSuperuser ? props.value.state.currentUserObj.isSuperuser : false,
    isStaff: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.isStaff ? props.value.state.currentUserObj.isStaff : false,
    isActive: props.value.state.currentUserObj !== null && props.value.state.currentUserObj.isActive ? props.value.state.currentUserObj.isActive : false,
  };

  const navigate = useNavigate();
  const [updateUser, { error, loading }] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      if (updateUser !== null) {
        props.value.dispatch({
          type: "RESET_USER",
          payload: { showEditUser: false, currentUserObj: null },
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
      payload: { showEditUser: false, currentUserObj: null },
    });
   
  };

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleCheckboxChange = (e, name, setFieldValue) => {
    setFieldValue(name, e.target.checked);
  };

  const handleUpdate = (values, { resetForm }) => {
    const params = {
        id: props.value.state.currentUserObj.id,
      password: values.password,
      isSuperuser: values.isSuperuser,
      username: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      isStaff: values.isStaff,
      canLogin: values.canLogin,
      isActive: values.isActive
    };
    updateUser({ variables: params });
  
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
      open={props.value.state.showEditUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Edit New User</p>
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
              onSubmit={handleUpdate}
              enableReinitialize={true}
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
                        defaultValue={values.firstName}
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
                        defaultValue={values.lastName}
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
                      defaultValue={values.userName}
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
                      defaultValue={values.email}
                      disabled={values.email !== "" ? true: false}
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
                      defaultValue={values.password}
                      placeholder="Enter your password"
                      submitCount={submitCount}
                    />
                  </Box>

                  <Box flex={1} mb={"18px"}>
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

                  <Box flex={1} mb={"18px"}>
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

                  <Box flex={1} mb={"18px"}>
                    <Box display="flex" style={{ gap: "10px" }}>
                      <CheckBox
                        name="isActive"
                        checked={values.isActive}
                        onChange={(e) =>
                          handleCheckboxChange(e, "isActive", setFieldValue)
                        }
                      />
                      <Text>Is Active Permission </Text>
                    </Box>
                    {errors.isActive && (
                      <div className="ant-form-item-explain ant-form-item-explain-error">
                        <div role="alert"> {errors.isActive}</div>
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
                      htmlType='submit'
                    >
                      Save Change
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

export default withContext(EditUsersModal);
