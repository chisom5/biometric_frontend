import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { StyledSidebar } from "../layout";
import { Img, Box, Text } from "../../Primitives";
// import { openLogoutModal } from "../../../services/global/action";
// import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const { logoutIcon } = useSelector((state) => state.global);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("file_upload")) {
      setActiveIndex(0);
    } else if (pathname.includes("users")) {
      setActiveIndex(1);
    }
  }, [pathname]);

  const handleNav = (id, path) => {
    switch ((id, path)) {
      case 0:
        setActiveIndex(0);
        navigate(path);
        break;

      case 1:
        setActiveIndex(1);
        navigate(path);
        break;

      default:
        setActiveIndex(0);
        navigate(path);
        break;
    }
  };

  const handleLogout = () => {
    // dispatch(openLogoutModal({ logoutIcon: true, logout: true }));
  };

  // 09042442948
  // 08147504272

  return (
    <StyledSidebar>
      <div className="sidebar__inner">
        <div className="sidebar__inner_top">
          {props.menu?.map((item) => {
            return (
              <div
                key={item.id}
                className={[
                  "menu_item",
                  item.id === activeIndex ? "menu_item_active" : null,
                ].join(" ")}
                onClick={() => handleNav(item.id, item.path)}
              >
                <Img
                  src={
                    item.id === activeIndex
                      ? item.icon_active
                      : item.icon_default
                  }
                />

                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        <Box width="100%" position="absolute" bottom="12vh">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={2}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <Img
              src={
                // logoutIcon
                //   ? require("../../../assets/images/nav/logout-active.svg")
                //       .default
                //   : require("../../../assets/images/nav/logout-default.svg")
                //       .default

                      require("../../../assets/images/nav/logout-default.svg")
                      .default
              }
            />

            <Text
              as="p"
              mt={"8px"}
              color={"#fff"}
              // fontFamily="Lato"
              opacity={0.7}
              fontSize={"9px"}
              fontWeight={400}
            >
              Logout
            </Text>
          </Box>
        </Box>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
