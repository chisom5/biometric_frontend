import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TableStyle, TableHeader } from "../../../../../styles/pageStyle";
import { ButtonOutlined } from "../../../../../components/Button";
import colors from "../../../../../theme/colors";
import { withContext } from "../../../../../config/contextConfig";
import { Text } from "../../../../../components/Primitives";
import moment from "moment";

const TableComponent = React.memo((props) => {
  const handleDeleteUser = (obj) => {
    props.value.dispatch({
      type: "DELETE_USER",
      payload: { showDeleteUser: true, currentUserObj: obj },
    });
  };
  const handleEditUser = (obj) => {
    props.value.dispatch({
      type: "EDIT_USER",
      payload: { showEditUser: true, currentUserObj: obj },
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "id",
      render: (_, obj) => {
        return (
          <div className="table_display">
            <div className="table_folder_icon">
              <img
                src={
                  require("../../../../../assets/images/table/person.svg")
                    .default
                }
                alt="folder_icon"
              />
            </div>
            <span>{`${obj.firstName} ${obj.lastName}`}</span>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, obj) => {
        let tagColor = isActive ? "tag_success" : "tag_warning";

        let tagIconColor = !isActive ? "iconWarningColor" : "iconSuccessColor";

        return (
          <>
            <div className={["tag", tagColor].join(" ")}>
              <div className={["icon", tagIconColor].join(" ")}></div>

              {!isActive ? "In-Active" : "Active"}
            </div>
          </>
        );
      },
    },
    {
      title: "Date Joined",
      dataIndex: "dateJoined",
      render: (_, obj) => {
        let splittedD = obj.dateJoined.split("T");

        return <Text>{moment(splittedD[0]).format("DD-DD-YYYY")}</Text>;
      },
    },
    {
      title:
        props.value.activeUser?.isSuperuser || props.value.activeUser?.isStaff
          ? "Action"
          : "",

      dataIndex: "id",
      render: (id, obj) => {
        return (
          <div className="table_action">
            {(props.value.activeUser?.isSuperuser ||
              props.value.activeUser?.isStaff) && (
              <>
                <ButtonOutlined
                  width={"auto"}
                  p={"3px 14px"}
                  height="auto"
                  fontWeight={5}
                  color={colors.white}
                  bg={colors.primaryblue}
                  borderRadius={"4px"}
                  border={'none'}
                  onClick={() => handleEditUser(obj)}
                >
                  Edit
                </ButtonOutlined>

                <ButtonOutlined
                  width={"auto"}
                  p={"3px 14px"}
                  height="auto"
                  fontWeight={5}
                  borderColor={colors.danger}
                  color={colors.danger}
                  bg={colors.white}
                  borderRadius={"4px"}
                  onClick={() => handleDeleteUser(obj)}
                >
                  Delete
                </ButtonOutlined>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const newuserClicked = () => {
    props.value.dispatch({ type: "ADD_USER", payload: { showAddUser: true } });
  };
  return (
    <TableStyle>
      <TableHeader bottomPad={true}>
        <div className="tb_header_inner"></div>
        {/*only super user or staff user can add new user.  */}
        {(props.value.activeUser?.isSuperuser ||
          props.value.activeUser?.isStaff) && (
          <Button icon={<PlusOutlined />} onClick={() => newuserClicked()}>
            New User
          </Button>
        )}
      </TableHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={props.value.tableData?.allUsers?.items}
        loading={props.value.loading}
        onChange={props.value.handlePagination}
        pagination={{
          total: props.value.tableData?.allUsers?.pageInfo?.totalCount,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total.toLocaleString()}`,
          defaultPageSize: props.value.tableData?.allUsers?.pageInfo?.pageSize,
          pageSize: props.value.tableData?.allUsers?.pageInfo?.pageSize,
          defaultCurrent:
            props.value.tableData?.allUsers?.pageInfo?.currentPage,
        }}
      />
    </TableStyle>
  );
});

export default withContext(TableComponent);
