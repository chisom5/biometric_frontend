import React from "react";
import { Modal, Button, notification } from "antd";
import { ModalContainer } from "../../../../../styles/pageStyle";
import SVG from "react-inlinesvg";
import { withContext } from "../../../../../config/contextConfig";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../../apiServices/mutation";
import { GET_ALL_USERS } from "../../../../apiServices/query";

const RevokeUsersModal = (props) => {
  const navigate = useNavigate();

  const [deleteUser, {loading, error }] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      if (deleteUser !== null) {
        props.value.dispatch({
          type: "RESET_USER",
          payload: { showDeleteUser: false, currentUserObj: null },
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
      payload: { showDeleteUser: false, currentUserObj: null },
    });
  };

  const handleAccessRevoke = () => {
    deleteUser({ variables: { id: props.value.state.currentUserObj.id } });
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
      open={props.value.state.showDeleteUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Delete User</span>
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
            <p>Are you sure you want to delete this user?</p>
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
              Yes, delete
            </Button>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default withContext(RevokeUsersModal);
