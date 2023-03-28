import React from "react";
import { Modal, Button, notification } from "antd";
import { ModalContainer } from "../../../../../styles/pageStyle";
import SVG from "react-inlinesvg";
import { useNavigate } from "react-router-dom";
import { withContext } from "../../../../../config/contextConfig";
import { useMutation } from "@apollo/client";
import { DELETE_FILE } from "../../../../apiServices/mutation";
import { GET_ALL_FILES } from "../../../../apiServices/query";

const DeleteFile = (props) => {
  const navigate = useNavigate();

  const [deleteFile, { loading, error }] = useMutation(DELETE_FILE, {
    onCompleted: ({ deleteFile }) => {
      if (deleteFile !== null) {
        props.value.dispatch({
          type: "DELETE_FILE",
          payload: { showDeleteFile: false, currentFileData: null },
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
      payload: { showDeleteFile: false, currentFileData: null },
    });
  };

  const handleAccessRevoke = () => {
    deleteFile({variables: { id: props.value.state.currentFileData.id } })
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
      open={props.value.state.showDeleteFile}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Delete File </span>
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
            <p>Are you sure you want to delete this file?</p>
          </div>
          <div className="buttonContainer">
            <Button
              key="back"
              type="text"
              className="buttonCancel"
              onClick={handleCancel}
            >
              No
            </Button>
            <Button
              key="confirm"
              onClick={handleAccessRevoke}
              className="confirmButton"
              loading={loading}
            >
              Yes, Delete
            </Button>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default withContext(DeleteFile);
