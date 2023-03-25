import React from "react";
import styled from "styled-components";
import SVG from "react-inlinesvg";
import colors from "../../../theme/colors";
import { Text, Box } from "../../Primitives";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@material-ui/core";
// import { useSelector } from "react-redux";
// import { Dropdown } from "antd";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #e8e9eb;
  position: fixed;
  z-index: 1000;

  .logo {
    max-width: 250px;
  }

  .headerItem-right {
    display: flex;
    align-items: center;
    margin-right: 1.8rem;

    .user-avatar {
      width: 32px;
      height: 32px;
      background: #00b8f5;
      border-radius: 50px;
      color: ${colors.white};
      font-size: 14px;
    }
    .user-details {
      margin: 0px 6px 0px 6px;

      p {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.02em;
        font-weight: 700;
        color: ${colors.secondaryDarkBlue};
      }
      #role {
        font-size: 12px;
        line-height: 15px;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: rgb(102, 102, 102, 0.75);
      }
    }
    #logout-btn {
      cursor: pointer;
    }
  }
`;

const HeaderComponent = () => {
  const navigate = useNavigate();

  // const { authUser } = useSelector((state) => state.global);

  const handleLogout = () => {
    sessionStorage.clear();
    // dispatch(logoutAuthUsers(null));
    navigate("/");
  };

  const handleView = () => {};

  const items = [
    {
      label: <p onClick={handleView}>View Profile</p>,
      key: "0",
    },
  ];

  return (
    <HeaderStyle>
      <SVG
        src={require("../../../assets/images/dashboard-logo.svg").default}
        className="logo"
      />

      <Text
        fontSize={"24px"}
        color={colors.mainBlack}
        lineHeight="25px"
        fontWeight={700}
      >
        File Upload Exercise
      </Text>

      <Box display="flex" alignItems="center">
        <div className="headerItem-right">
          <Avatar className="user-avatar">AM</Avatar>

          <div className="user-details">
            {/* <p>{`${authUser.first_name} ${authUser.last_name}`}</p> */}
            <p>Chisom Okoye</p>
            <span id="role">Admin</span>
            {/* <span id="role">{authUser.role}</span> */}
          </div>
        </div>
      </Box>
    </HeaderStyle>
  );
};
export default HeaderComponent;
