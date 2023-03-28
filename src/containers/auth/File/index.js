import React, { useEffect, useReducer } from "react";
import { notification } from "antd";
import {
  Content,
  MainContent,
  MiniHeaderStyle,
} from "../../../styles/pageStyle";
import TableComponent from "./components/table";
import { ConfigContext, withContext } from "../../../config/contextConfig";
import { UploadNewFile, DeleteFile, PreviewImage } from "./components/modal";
import { LogoutModal } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { initialModals, modalReducer } from "./reducer/modalReducer";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_FILES } from "../../apiServices/query";

const FileManagement = (props) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(modalReducer, initialModals);
  const [allFiles ,{data, loading, error }] = useLazyQuery(GET_ALL_FILES);

  useEffect(()=> {
    allFiles({variables: {page: 1, pageSize: 10}})
  }, [])

  const handlePagination = (pagination, filters, sorter) => {
    allFiles({variables: {page: pagination.current, pageSize: 2}})

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
    <ConfigContext.Provider
      value={{
        handlePagination,
        dispatch,
        state,
        logoutDispatch: props.value.dispatch,
        tableData: data,
        loading,
        activeUser: props.value.activeUser
      }}
    >
      <MainContent>
        <MiniHeaderStyle>
          <p className="title">File Upload</p>
        </MiniHeaderStyle>

        <Content>
          <TableComponent />
          <DeleteFile />
          <UploadNewFile />
          <PreviewImage />
          <LogoutModal logout={props.value.logout} />
        </Content>
      </MainContent>
      {/* </ErrorComponent> */}
    </ConfigContext.Provider>
  );
};

export default withContext(FileManagement);
