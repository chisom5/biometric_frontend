import React, { useRef } from "react";
import { Modal, Button, Upload, notification } from "antd";
import { ModalContainer } from "../../../../../styles/pageStyle";
import SVG from "react-inlinesvg";
import { Formik, Form } from "formik";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Box } from "../../../../../components/Primitives";
import * as Yup from "yup";
import { withContext } from "../../../../../config/contextConfig";
import { useNavigate } from "react-router-dom";
import { CREATE_FILE } from "../../../../apiServices/mutation";
import { GET_ALL_FILES } from "../../../../apiServices/query";
import { useMutation } from "@apollo/client";
const { Dragger } = Upload;

const Schema = Yup.object().shape({});

const UploadNewFile = (props) => {
  const formikFormRef = useRef();

  const initial_value = {
    fileList: null,
  };
  const navigate = useNavigate();

  const [createFile, { error, loading }] = useMutation(CREATE_FILE, {
    onCompleted: ({ createFile }) => {
      console.log(createFile);
      if (createFile !== null) {
        props.value.dispatch({
          type: "RESET_FILE",
          payload: { showAddFile: false },
        });
      }
    },
    refetchQueries: [
      { query: GET_ALL_FILES, variables: { page: 1, pageSize: 10 } },
    ],
  });

  const handleCancel = () => {
    props.value.dispatch({
      type: "RESET_FILE",
      payload: { showAddFile: false },
    });
  };

  const handleSubmit = (values, { resetForm }) => {
    values.fileList?.map((item) => {
      const params = {
        name: item.name,
        mimeType: item.originFileObj.type,
        fileMetdata: JSON.stringify(item.originFileObj),
        file: item.originFileObj,
      };

      createFile({ variables: params });
    });

    resetForm({
      fileList: null,
    });
  };

  const handleFileChange = (info, setFieldValue) => {
    setFieldValue("fileList", info.fileList);
  };

  const DraggerProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        console.log("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        console.log("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
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
      open={props.value.state.showAddFile}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Add New File</p>
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
              {({ setFieldValue, submitForm }) => (
                <Form style={{ width: "100%" }}>
                  <Box>
                    <Dragger
                      {...DraggerProps}
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    >
                      <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        {/* Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files. */}
                      </p>
                    </Dragger>
                  </Box>

                  <div className="buttonContainer">
                    <Button
                      key="confirm"
                      className="confirmButton"
                      type="submit"
                      loading={loading}
                      onClick={submitForm}
                    >
                      Upload
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

export default withContext(UploadNewFile);
