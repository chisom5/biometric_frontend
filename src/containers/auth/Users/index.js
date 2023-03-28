import React, { useReducer, useEffect } from "react";
import{notification} from 'antd'
import {
  Content,
  MainContent,
  MiniHeaderStyle,
} from "../../../styles/pageStyle";
import TableComponent from "./components/table";
import {
  RevokeUsersModal,
  AddNewUserModal,
} from "./components/modal";
import { LogoutModal } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { ConfigContext, withContext } from "../../../config/contextConfig";
import { initialModals, modalReducer } from "./reducer/modalReducer";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../apiServices/query";

const Users = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(modalReducer, initialModals);
  const [allUsers, {data, loading, error}]= useLazyQuery(GET_ALL_USERS);

  useEffect(()=> {
    allUsers({variables: {page: 1, pageSize: 10}})
  }, [])

  const handlePagination = (pagination, filters, sorter) => {
    console.log(filters, sorter)
    allUsers({variables: {page: pagination.current, pageSize: 2}})

  };

  if (error) {
    // show notification and redirect
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
          <p className="title">Users Management</p>
        </MiniHeaderStyle>

        <Content>
          <TableComponent />
          <RevokeUsersModal />
          <AddNewUserModal />
          <LogoutModal logout={props.value.logout} />
        </Content>
      </MainContent>
    </ConfigContext.Provider>
  );
};

export default withContext(Users);
