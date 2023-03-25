import { useEffect } from "react";
import { Container, Main, OtherContent } from "../../styles/pageStyle";
import HeaderComponent from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
  return (
    <Container>
      <HeaderComponent />

      <Main>
        <Sidebar menu={menu} />
        <OtherContent
        // style={{
        //   paddingLeft: currentView === "question" ? "0px" : "4.5rem",
        // }}
        >
          <Outlet />
        </OtherContent>
      </Main>
    </Container>
  );
};

export default AuthViewWrapper;
