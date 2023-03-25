import React, { useState, useEffect } from "react";
import {
  Content,
  MainContent,
  MiniHeaderStyle,
} from "../../../styles/pageStyle";
import TableComponent from "./components/table";
import {
  // RevokeUsersModal,
  // EditUserModal,
  AddNewUserModal,
} from "./components/modal";
// import { useDispatch, useSelector } from "react-redux";
import { LogoutModal } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
// import { ErrorComponent } from "../../../components/ErrorBoundry/errorComponent";
// import {
//   fetchAllUsersPaginated,
//   clearSuccessMessage,
//   clearErrorMessage,
// } from "../../../services/users/action";
// import {
//   clearGlobalSuccessMessage,
//   clearGlobalErrorMessage,
// } from "../../../services/global/action";

const FileManagement = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // const { currentUserObj, error, success } = useSelector((state) => state.user);
  // const { globalError, globalSuccess } = useSelector((state) => state.global);

  // useEffect(() => {
  //   if (error !== null || success !== null) {
  //     setTimeout(() => dispatch(clearSuccessMessage()), 5000);
  //     setTimeout(() => dispatch(clearErrorMessage()), 5000);
  //   }
  //   if (globalError !== null || globalSuccess !== null) {
  //     setTimeout(() => dispatch(clearGlobalSuccessMessage()), 5000);
  //     setTimeout(() => dispatch(clearGlobalErrorMessage()), 5000);
  //   }
  // }, [dispatch, success, error, globalError, globalSuccess]);

  useEffect(() => {
    // dispatch(
    //   fetchAllUsersPaginated(
    //     { CurrentPage: currentPage, PageSize: 10 },
    //     navigate
    //   )
    // );
  }, []);

  const handlePagination = () => {};

  // const handleClearErrorMessage = () => {
  //   if (error !== null) {
  //     dispatch(clearErrorMessage());
  //   } else if (globalError !== null) {
  //     dispatch(clearGlobalErrorMessage());
  //   }
  // };
  // const handleClearSuccessMessage = () => {
  //   if (success !== null) {
  //     dispatch(clearSuccessMessage());
  //   } else if (globalSuccess !== null) {
  //     dispatch(clearGlobalSuccessMessage());
  //   }
  // };

  return (
    // <ErrorComponent
    //   error={error || globalError}
    //   success={success || globalSuccess}
    //   clearErrorMessage={handleClearErrorMessage}
    //   clearSuccessMessage={handleClearSuccessMessage}
    // >
      <MainContent>
        <MiniHeaderStyle>
          <p className="title">File Upload</p>
        </MiniHeaderStyle>

        <Content>
          <TableComponent currentPage={currentPage} />
          {/* <RevokeUsersModal /> */}
          {/* <EditUserModal userObj={currentUserObj} /> */}
          <AddNewUserModal />
          {/* <LogoutModal /> */}
        </Content>
      </MainContent>
    // </ErrorComponent>
  );
};

export default FileManagement;
