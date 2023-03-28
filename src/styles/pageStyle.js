import styled from "styled-components";
import colors from "../theme/colors";

export const Container = styled.div`
  width: 100%;
`;

export const Main = styled.main`
  display: flex;
  padding-top: 4.375rem;
  width: 100%;
`;

export const MainContent = styled.section`
  width: 100%;
`;

export const OtherContent = styled.section`
  width: 100%;
  padding-left: 4.5rem;

  header,
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;

    .title {
      font-family: KPMG App;
      font-weight: normal;
      font-size: 2.25rem;
      line-height: 43px;
      color: ${colors.grayBlack};
    }
  }
`;
export const Content = styled.div`
  width: 100%;
  padding-left: 3rem;
  margin-top: 1.25rem;
  padding-right: 2rem;

  .outlined_tb {
    background: transparent;
    border-radius: 0px;
    border: none;
    padding: 0px;
  }
`;

export const MiniHeaderStyle = styled.div`
  background: ${colors.white};
  padding: ${(props) =>
    props["no-bPad"] ? " 20px 24px 0px 48px" : " 20px 24px 20px 48px"};
  height: auto;
  border: 1px solid #e8e9eb;
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 500;
    font-size: 22px;
    line-height: 33px;
    font-family: Sofia Pro;
    color: ${colors.gray};
    letter-spacing: -0.03em;
  }

  .btn {
    color: ${colors.white};
    border-radius: 6px;
    background: ${colors.lightBlue};
  }
  .tag {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 2px 8px 2px 6px;
    gap: 6px;
  }
  .tag_sucess {
    color: ${colors.GreenColor};
    background: ${colors.lightGreen};
    border-radius: 10px;
  }
  .sucess_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.GreenColor};
  }

  .tag_Completed {
    color: ${colors.GreenColor};
    background: ${colors.lightGreen};
    border-radius: 10px;
  }

  .tag_closed {
    color: ${colors.mainBlue};
    background: ${colors.lightBlue};
    border-radius: 10px;
  }

  .tag_NotStart {
    color: ${colors.gray};
    background: ${colors.gray5};
    border-radius: 10px;
  }

  .tag_Ongoing {
    color: ${colors.yellowColor};
    background: ${colors.lightYellowColor};
    border-radius: 10px;
  }

  .tag_Under {
    color: ${colors.purpleColor};
    background: ${colors.lightPurple};
    border-radius: 10px;
  }

  .tag_pending {
    color: ${colors.yellowColor};
    background: ${colors.lightYellowColor};
    border-radius: 10px;
  }
  .pending_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.yellowColor};
  }

  .Completed_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.GreenColor};
  }

  .closed_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.mainBlue};
  }

  .NotStart_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.gray};
  }
  .Ongoing_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.yellowColor};
  }
  .Under_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.purpleColor};
  }

  .tabs-nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;

    .tabs-nav-wrap {
      position: relative;
      display: flex;
      flex: auto;
      align-self: stretch;
      overflow: hidden;
      white-space: nowrap;
      transform: translate(0);

      .tabs-nav-list {
        position: relative;
        display: flex;
        transition: opacity 0.3s;

        .ant-tabs-tab {
          padding: 16px 0px;
          color: ${colors.gray4};
          font-size: 14px;
        }
        .ant-tabs-tab-active {
          font-weight: 700;

          .ant-tabs-tab-btn {
            color: ${colors.mainBlack};
          }
        }

        .ant-tabs-ink-bar {
          height: 4px;
          bottom: 0px;
          background: ${colors.secondaryPink};
          border-radius: 4px 4px 0px 0px;
        }
      }

      .ant-tabs-ink-bar-animated {
        transition: width 0.3s, left 0.3s, right 0.3s;
      }
    }
  }
`;

export const TableStyle = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  padding: 20px;

  .ant-table-container {
    table {
      table-layout: auto !important;

      .ant-table-thead > tr > th,
      .ant-table-tbody > tr > td {
        padding: 12px 16px;
        letter-spacing: 0.01071em;
      }
      .ant-table-selection {
        display: none;
      }
      .ant-table-tbody > tr > td {
        border-bottom: none;
        font-size: 12px;
        font-weight: 500;

        .table_display {
          display: flex;
          align-items: center;
          word-break: break-word;
        }

        .table_folder_icon {
          width: 32px;
          height: 32px;
          background: ${colors.secondaryLightBlue};
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 1rem;
        }

        .btn-view {
          display: flex;
          color: ${colors.lightBlue};
          border: 1px solid ${colors.lightBlue};
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.04em;
        }

        .table_action {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tag {
          display: flex;
          align-items: center;
          width: fit-content;
          height: fit-content;
          padding: 2px 8px 2px 6px;
          gap: 6px;
        }

        .tag_success {
          background: #def0de;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: fit-content;
          padding: 2px 8px 2px 8px;
          gap: 6px;
          color: #269924;
          font-weight: 600;
          border: none;
        }
        .tag_warning {
          background: #fde8d5;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: fit-content;
          padding: 2px 8px 2px 8px;
          gap: 6px;
          color: #f68d2e;
          font-weight: 600;
          border: none;
        }

        .icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .iconSuccessColor {
          background: #269924;
        }
        .iconWarningColor {
          background: #f68d2e;
        }
      }

      .ant-table-thead > tr > th {
        background: white;
        color: ${colors.gray2};
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 500;
        line-height: 1rem;
        letter-spacing: 0.25em;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
      }

      .ant-table-thead
        > tr
        > th:not(:last-child):not(.ant-table-selection-column):not(
          .ant-table-row-expand-icon-cell
        ):not([colspan]):before {
        content: none;
      }
    }
  }
  .ant-pagination-disabled .ant-pagination-item-link {
    border: none;
  }

  .ant-pagination-total-text {
    flex: 1;
    display: flex;
  }

  @media (max-width: 1024px) {
    margin-right: 1.3rem;

    .ant-table-container {
      table {
        table-layout: auto !important;

        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
          padding: 12px 14px;
          font-size: 12px;
        }
      }

      .ant-table-tbody > tr > td {
        .table_display {
          display: flex;
          align-items: center;
          word-break: break-word;
        }

        .table_folder_icon {
          margin-right: 0.5rem !important;
        }
      }
    }
  }
`;

export const TableHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: auto;
  margin-bottom: 1.2rem;

  .tb_header_inner {
    display: flex;
    width: inherit;

    p {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: -0.02em;
    }
  }

  .ant-btn {
    background: ${colors.lightBlue};
    border-radius: 3px;
    height: 30px;
    border: none;
    color: ${colors.white};
    display: flex;
    align-items: center;
  }

  @media (max-width: 1024px) {
  }
`;

export const ModalContainer = styled.div`
  header {
    background: #f2f2f2;
    height: 71px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 24px;
    position: absolute;
    top: 0px;
    width: 100%;
    right: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    .modal-title {
      font-style: normal;
      font-weight: 500;
      font-size: 26px;
      line-height: 33px;
      letter-spacing: -0.01em;
    }

    .close-modal-icon {
      cursor: pointer;
    }
  }
  .modal-mainContent {
    padding-top: 65px;

    .divider {
      border-top: 1px solid #e5e5e5;
      padding-top: 16px;

      #sub_title {
        margin-bottom: 14px;
        letter-spacing: 0.33em;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 10px;
      }
    }
  }
  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 26px;
  }
  .confirmButton {
    background: ${colors.lightBlue};
    border-radius: 3px;
    border: none;
    color: ${colors.white};
    display: flex;
    align-items: center;
  }
  .ant-input,
  .ant-select-selection-item {
    font-weight: 400;
    font-size: 12px;
  }
  .ant-select-selection-placeholder {
    font-size: 12px;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const UploadFormStyle = styled.form`
  .ant-upload-list {
    display: none;
  }
`;
