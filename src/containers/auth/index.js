import { useEffect, useReducer } from "react";
import { notification } from "antd";
import { Container, Main, OtherContent } from "../../styles/pageStyle";
import HeaderComponent from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ConfigContext } from "../../config/contextConfig";
import { initialState, logoutReducer } from "./authReducer/logoutReducer";
import { GET_ALL_USERS } from "../apiServices/query";
import { useQuery } from "@apollo/client";
import { extractCurrenAuthUser } from "../../utils";
import jwtDecode from "jwt-decode";

const AuthViewWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/d") {
      navigate("/d/file_upload");
    }
  }, [location, navigate]);

  const menu = [
    {
      id: 0,
      icon_default: require(`../../assets/images/nav/dashboard-default.svg`)
        .default,
      icon_active: require(`../../assets/images/nav/dashboard-active.svg`)
        .default,
      path: "/d/file_upload",
      name: "File Upload",
    },

    {
      id: 1,
      icon_default: require(`../../assets/images/nav/users-default.svg`)
        .default,
      icon_active: require(`../../assets/images/nav/users-active.svg`).default,
      path: "/d/users",
      name: "Users",
    },
  ];
  const [{ logoutIcon, logout, activeUser }, dispatch] = useReducer(
    logoutReducer,
    initialState
  );
  const { data, error } = useQuery(GET_ALL_USERS);

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
  console.log(data)
  useEffect(() => {
    if (data !== undefined) {
      const token = JSON.parse(localStorage.getItem("auth-token"));
      console.log(token)
      const user = jwtDecode(token);
      const userDetail = extractCurrenAuthUser(
        data.allUsers.items,
        user?.username
      );
      dispatch({
        type: "SAVE_LOGIN_USER",
        payload: { activeUser: userDetail },
      });
    }
  }, [data]);

  return (
    <ConfigContext.Provider
      value={{ dispatch, logoutIcon, logout, activeUser }}
    >
      <Container>
        <HeaderComponent />

        <Main>
          <Sidebar menu={menu} />
          <OtherContent>
            <Outlet />
          </OtherContent>
        </Main>
      </Container>
    </ConfigContext.Provider>
  );
};

export default AuthViewWrapper;
