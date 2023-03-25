import styled from "styled-components";
import { Text, Box } from "../../Primitives";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const StyledContainer = styled.div`
  position: relative;
  border: ${(props) =>
    props.selected ? "1px solid #3c751f" : "1px solid #D2D7DB"};
  background-color: ${(props) => props.selectBox};
  border-radius: 6px;
  height: 52px;

  .inputfile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    padding: 14px 0;
    cursor: pointer;
  }

  .inputfile-inner {
    display: flex;
    justify-content: space-between;
    padding: 14px 22px;
  }
`;

const FileInput = ({ name, file, ...props }) => {
  const { isUploading } = useSelector((state) => state.reference);

  return (
    <StyledContainer selected={file ? true : false}>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        name={"partnerApproval"}
        id={"partnerApproval"}
        className="inputfile"
        onChange={props.handleChange}
      />
      <div className="inputfile-inner">
        <label htmlFor={name}>
          <Text mt={2} color={file ? "#3c751f" : "#838D9D"} fontWeight={5}>
            {file
              ? `You have selected "${file.filename}"`
              : "No file uploaded yet"}
          </Text>
        </label>
        <Box
          bg="#A4A4A4"
          borderRadius="4px"
          width="auto"
          height="30px"
          px={"14px"}
        >
          <Text color="#ffffff" lineHeight="28px">
            {isUploading ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <LoadingOutlined style={{ marginRight: "0.65rem" }} />
                Uploading
              </span>
            ) : (
              "Browse"
            )}
          </Text>
        </Box>
      </div>
    </StyledContainer>
  );
};

export default FileInput;
