import color from "../../theme/colors";
import styled from "styled-components";

export const StyledSidebar = styled.aside`
  width: 94px;
  height: 100%;
  position: fixed;
  background-color: ${color.sidebarColor};

  .sidebar__inner {
    height: inherit;
    position: relative;

    .sidebar__inner_top {
      padding: 4.2rem 0.28rem 0rem 0.28rem;

      .menu_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 48px;
        justify-content: center;
        margin-bottom: 0.65rem;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.25);

        p {
          font-weight: 400;
          font-size: 10px;
        }
      }
      .menu_item_active {
        p {
          color: ${color.white};
          font-weight: 600;
        }
      }
    }
  }
`;
export const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  position: fixed;
  justify-content: space-between;
  border: 1px solid #e8e9eb;
  color: ${color.darkBlue};
  background: ${color.white};
  align-items: center;
  z-index: 1;

  .headerItem__left {
    display: flex;
    align-items: center;
    margin-left: 2rem;

    img {
      margin-right: 0.813rem;
    }

    h2 {
      font-size: 1.125rem;
      line-height: 18px;
      letter-spacing: -0.02em;
      color: ${color.white};
      margin-bottom: 0px;
      font-family: "Sofia Pro";
    }
  }

  .headerItem__right {
    display: flex;
    align-items: center;
    margin-right: 2.5rem;

    .user_avatar {
      width: 32px;
      height: 32px;
      background: #00b8f5;
      border-radius: 2px;
      color: ${color.white};
      font-size: 14px;
    }
    .user_details {
      margin: 0px 12px 0px 0rem;

      p {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.02em;
        font-weight: 700;
      }
      #role {
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.02em;
        color: rgb(102, 102, 102, 0.75);
      }
    }
    #logout-btn {
      cursor: pointer;
    }
  }
`;
