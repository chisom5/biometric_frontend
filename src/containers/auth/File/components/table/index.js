import React from "react";
import { Button, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { TableStyle, TableHeader } from "../../../../../styles/pageStyle";
import { ButtonOutlined } from "../../../../../components/Button";
import colors from "../../../../../theme/colors";
import { withContext } from "../../../../../config/contextConfig";
import moment from "moment";
import { Text } from "../../../../../components/Primitives";

const TableComponent = React.memo((props) => {
  const handleDeleteFile = (obj) => {
    props.value.dispatch({
      type: "DELETE_FILE",
      payload: { showDeleteFile: true, currentFileId: obj.id },
    });
  };

  const handlePreviewImage = (obj) => {
    if (obj.file) {
      props.value.dispatch({
        type: "PREVIEW_IMAGE",
        payload: {
          previewOpen: true,
          previewImage: obj.file,
          previewTitle: obj.name,
        },
      });
    }
  };
  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      render: (name) => {
        return (
          <div className="table_display">
            <div className="table_folder_icon">
              <img
                src={
                  require("../../../../../assets/images/table/clipboard.svg")
                    .default
                }
                alt="folder_icon"
              />
            </div>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: "Mime Type",
      dataIndex: "mimeType",
    },
    {
      title: "File",
      dataIndex: "file",
      render: (link, obj) => {
        return (
          <Text
            color="#0074cc"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => handlePreviewImage(obj)}
          >
            Click here
          </Text>
        );
      },
    },

    {
      title: "Date Added",
      dataIndex: "createdAt",
      render: (d) => {
        let splitedDate = d.split("T");
        return moment(splitedDate[0]).format("DD-DD-YYYY");
      },
    },

    {
      title:
        (props.value.activeUser?.isSuperuser &&
          props.value.activeUser?.isStaff) ||
        (props.value.activeUser?.isSuperuser &&
          !props.value.activeUser?.isStaff) ||
        (!props.value.activeUser?.isSuperuser &&
          props.value.activeUser?.isStaff)
          ? "Action"
          : "",
      dataIndex: "id",
      render: (id, obj) => {
        return (
          <div className="table_action">
            {(props.value.activeUser?.isSuperuser &&
              props.value.activeUser?.isStaff) ||
              (props.value.activeUser?.isSuperuser &&
                !props.value.activeUser?.isStaff) ||
              (!props.value.activeUser?.isSuperuser &&
                props.value.activeUser?.isStaff && (
                  <ButtonOutlined
                    width={"auto"}
                    p={"3px 14px"}
                    height="auto"
                    fontWeight={5}
                    borderColor={colors.danger}
                    color={colors.danger}
                    bg={colors.white}
                    borderRadius={"4px"}
                    onClick={() => handleDeleteFile(obj)}
                  >
                    Delete
                  </ButtonOutlined>
                ))}
          </div>
        );
      },
    },
  ];

  const handleAddNewFile = () => {
    props.value.dispatch({ type: "ADD_FILE", payload: { showAddFile: true } });
  };

  return (
    <TableStyle>
      <TableHeader bottomPad={true}>
        <div className="tb_header_inner">
          {/* <Search
            placeholder={`Search  for  files  by  name,  mime  type  or  fields`}
            style={{
              width: '28%',
              height: "32px",
              backgroundColor: colors.inputBgColor,
            }}
            name="search"
            onSearch={(e) => props.value.handleSearch(e)}
          /> */}
        </div>
        <Button icon={<UploadOutlined />} onClick={() => handleAddNewFile()}>
          Add File
        </Button>
      </TableHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.value.tableData?.allFiles?.items}
        loading={props.value.loading}
        onChange={props.value.handlePagination}
        pagination={{
          total: props.value.tableData?.allFiles?.pageInfo?.totalCount,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total.toLocaleString()}`,
          defaultPageSize: props.value.tableData?.allFiles?.pageInfo?.pageSize,
          pageSize: props.value.tableData?.allFiles?.pageInfo?.pageSize,
          defaultCurrent:
            props.value.tableData?.allFiles?.pageInfo?.currentPage,
        }}
      />
    </TableStyle>
  );
});

export default withContext(TableComponent);
