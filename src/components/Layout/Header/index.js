import React from "react";
import styled from "styled-components";
import colors from "../../../theme/colors";
import { Text, Box, Img } from "../../Primitives";
import { withContext } from "../../../config/contextConfig";
import { Avatar } from "antd";
import {UserOutlined} from '@ant-design/icons';

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
    max-width: 50px;
  }

  .headerItem-right {
    display: flex;
    align-items: center;
    margin-right: 1.8rem;

    .user-avatar {
      width: 32px;
      height: 32px;
      background: #00b8f5;
      color: ${colors.white};
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
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

const HeaderComponent = (props) => {

  return (
    <HeaderStyle>
      <Img
        src={require("../../../assets/images/dashboard-logo.jpeg")}
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
          <Avatar shape="square" className="user-avatar" icon={<UserOutlined />} />

          <div className="user-details">
            <p>{`${props.value.activeUser?.firstName} ${props.value.activeUser?.lastName}`}</p>
            <span id="role">
              {(props.value.activeUser?.isSuperuser &&
                props.value.activeUser?.isStaff) ||
              (props.value.activeUser?.isSuperuser &&
                !props.value.activeUser?.isStaff)
                ? "Super User"
                : !props.value.activeUser?.isSuperuser &&
                  props.value.activeUser?.isStaff
                ? "Staff User"
                : !props.value.activeUser?.isSuperuser &&
                  !props.value.activeUser?.isStaff
                ? "User"
                : ""}
            </span>
          </div>
        </div>
      </Box>
    </HeaderStyle>
  );
};
export default withContext(HeaderComponent);
