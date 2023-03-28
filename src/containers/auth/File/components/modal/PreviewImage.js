import React from "react";
import { Modal } from "antd";
import { withContext } from "../../../../../config/contextConfig";
import { Img } from "../../../../../components/Primitives";

const PreviewImage = (props) => {
  const handleCancel = () => {
    props.value.dispatch({
      type: "RESET_FILE",
      payload: { previewOpen: false },
    });

  };

  return (
    <Modal
      open={props.value.state.previewOpen}
      title={props.value.state.previewTitle}
      footer={null}
      onCancel={handleCancel}
      width={500}
    >
      <Img
        alt="example"
        style={{
          width: "100%",
        }}
        src={props.value.state.previewImage}
      />
    </Modal>
  );
};
export default withContext(PreviewImage);
