import React, { useState } from "react";
import { Modal, Button, Upload, notification } from "antd";
import {
  ModalContainer,
  UploadFormStyle,
} from "../../../../../styles/pageStyle";
import SVG from "react-inlinesvg";
import { CameraOutlined } from "@ant-design/icons";
import { Box, Img } from "../../../../../components/Primitives";
import { withContext } from "../../../../../config/contextConfig";
import { useNavigate } from "react-router-dom";
import { UPDATE_FILE } from "../../../../apiServices/mutation";
import { GET_ALL_FILES } from "../../../../apiServices/query";
import { useMutation } from "@apollo/client";
import { getBase64 } from "../../../../../utils";

const EditFileModal = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState();

  const navigate = useNavigate();

  const [updateFile, { error, loading }] = useMutation(UPDATE_FILE, {
    onCompleted: ({ updateFile }) => {
      if (updateFile !== null) {
        props.value.dispatch({
          type: "RESET_FILE",
          payload: { showEditFile: false },
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
      payload: { showEditFile: false },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      id: props.value.state.currentFileData.id,
      name: selectedImageFile.name,
      mimeType: selectedImageFile.originFileObj.type,
      fileMetdata: JSON.stringify(selectedImageFile.originFileObj),
      file: selectedImageFile.originFileObj,
    };
    console.log(params);
    updateFile({ variables: params });
  };

  const handleFileChange = async (info) => {
    // console.log(info)
    let res;
    if (info.file) {
      res = await getBase64(info.file.originFileObj);
    }
    setSelectedImage(res);
    setSelectedImageFile(info.file);
  };

  const DraggerProps = {
    name: "file",
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

  const imgDb =
    props.value.state.currentFileData !== null &&
    props.value.state.currentFileData.file;

  return (
    <Modal
      title={null}
      open={props.value.state.showEditFile}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Edit File</p>
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
            <UploadFormStyle
              style={{ width: "100%" }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Box mb={"12px"}>
                <Img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={selectedImage ? selectedImage : imgDb}
                />
              </Box>

              <div className="buttonContainer">
                <Box>
                  <Upload
                    {...DraggerProps}
                    onChange={(e) => handleFileChange(e)}
                  >
                    <Button icon={<CameraOutlined />}>Change</Button>
                  </Upload>
                </Box>

                <Button
                  key="confirm"
                  className="confirmButton"
                  type="submit"
                  htmlType="submit"
                  loading={loading}
                >
                  Save change
                </Button>
              </div>
            </UploadFormStyle>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default withContext(EditFileModal);
