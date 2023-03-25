import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer } from "../../../../../styles/pageStyle";
// import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
// import { openEditModal } from "../../../../../services/users/action";
import { Formik, Field, Form } from "formik";
import { AntInput, AntSelect } from "../../../../../components/AntFormik";
import { Box, Text, Label } from "../../../../../components/Primitives";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
// import { handleUpdateuser } from "../../../../../services/users/action";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({});

const EditUserModal = ({ userObj, ...props }) => {
  const initial_value = {
    email: userObj !== null && userObj.Email !== undefined ? userObj.Email : "",
    firstName:
      userObj !== null && userObj.FirstName !== undefined
        ? userObj.FirstName
        : "",
    lastName:
      userObj !== null && userObj.LastName !== undefined
        ? userObj.LastName
        : "",
    role:
      userObj !== null && userObj.RoleName !== undefined
        ? userObj.RoleName
        : "",
  };

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { showEditUser, isEditing } = useSelector((state) => state.user);
  // const { userRolesList } = useSelector((state) => state.global);

  const handleCancel = () => {
    // dispatch(openEditModal({ showEditUser: false }));
  };

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSelectChange = (e, setFieldValue) => {
    const { Id, Name } = JSON.parse(e);
    setFieldValue("role", Name);
  };

  const handleEditUser = (values, { resetForm }) => {
    const params = {
      FirstName: values.firstName,
      LastName: values.lastName,
      RoleName: values.role,
      Email: values.email,
    };

    console.log(params)
    // dispatch(handleUpdateuser(params, navigate));
    resetForm({
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    });
  };
  return (
    <Modal
      title={null}
      open={false}
      footer={null}
      closable={false}
      width={480}
      //   bodyStyle={{ padding: 40 }}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Edit User</p>
            <Text
              color={colors.danger}
              fontSize="10px"
              fontWeight={4}
            >
              * N/B: All fields are required
            </Text>
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
              onSubmit={handleEditUser}
              enableReinitialize={true}
            >
              {({ submitCount, values, setFieldValue, submitForm }) => (
                <Form style={{ width: "100%" }}>
                  <Box>
                    <Label>First Name</Label>
                    <Field
                      type="text"
                      name="firstName"
                      width="100%"
                      placeholder="Enter first name"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntInput}
                      defaultValue={values.firstName}
                      onChange={(e) => handleTextChange(e, setFieldValue)}
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Box>

                  <Box>
                    <Label>Last Name</Label>
                    <Field
                      type="text"
                      name="lastName"
                      width="100%"
                      placeholder="Enter last name"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntInput}
                      defaultValue={values.lastName}
                      onChange={(e) => handleTextChange(e, setFieldValue)}
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Box>

                  <Box>
                    <Label>Email</Label>
                    <Field
                      type="text"
                      name="email"
                      width="100%"
                      placeholder="Enter email address"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntInput}
                      defaultValue={values.email}
                      onChange={(e) => handleTextChange(e, setFieldValue)}
                      submitCount={submitCount}
                      disabled={true}
                      hasFeedback
                    />
                  </Box>

                  <Box>
                    <Label>Role</Label>
                    <Field
                      name="role"
                      width="100%"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntSelect}
                      placeholder="Select Role"
                      selectOptions={[]}
                      defaultValue={values.role}
                      onChange={(e) => handleSelectChange(e, setFieldValue)}
                      submitCount={submitCount}
                      hasFeedback
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Box>

                  <div className="buttonContainer">
                    <Button
                      key="confirm"
                      className="confirmButton"
                      type="submit"
                      onClick={submitForm}
                      // loading={isEditing}
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

export default EditUserModal;
