import React from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { userList } from "../data";
import { TableStyle, TableHeader } from "../../../../../styles/pageStyle";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   openRevokeModal,
//   openEditModal,
//   openAddModal,
// } from "../../../../../services/users/action";
import { ButtonOutlined } from "../../../../../components/Button";
import colors from "../../../../../theme/colors";
// import { fetchUserRoles } from "../../../../../services/global/action";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const TableComponent = React.memo(
  ({ currentPage, handlePagination, ...props }) => {
    // const { usersList, pagingData, isFetching } = useSelector(
    //   (state) => state.user
    // );

    // const filterUsersRecordbyDeleted = () => {
    //   return userList.filter((i) => !i.IsDeleted);
    // };

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (obj) => {
      // dispatch(fetchUserRoles(navigate));

      // dispatch(
      //   openEditModal({
      //     showEditUser: true,
      //     currentUserObj: obj,
      //   })
      // );
    };
    const columns = [
      {
        title: "Name",
        dataIndex: "Name",
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
              <span>{obj.Name} 
              {/* `${obj.FirstName} ${obj.LastName}`} */}
              </span>
            </div>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "Email",
      },
      {
        title: "Role",
        dataIndex: "RoleName",
      },
      {
        title: "Date Added",
        dataIndex: "DateAdded",
        // render: (d) => {
        //   let splitedDate = d.split("T");
        //   return moment(splitedDate[0]).format("DD-ddd-YYYY");
        // },
      },

      {
        title: "Action",
        dataIndex: "id",
        render: (id, obj) => {
          return (
            <div className="table_action">
              {obj.role !== "Super Admin" ? (
                <>
                  {/* edit */}
                  <ButtonOutlined
                    width={"auto"}
                    p={"3px 14px"}
                    height="auto"
                    fontWeight={5}
                    borderColor={colors.lightBlue}
                    color={colors.lightBlue}
                    bg={colors.white}
                    borderRadius={"4px"}
                    onClick={() => handleEdit(obj)}
                  >
                    Edit
                  </ButtonOutlined>

                  {/* delete */}
                  <ButtonOutlined
                    width={"auto"}
                    p={"3px 14px"}
                    height="auto"
                    fontWeight={5}
                    borderColor={colors.danger}
                    color={colors.danger}
                    bg={colors.white}
                    borderRadius={"4px"}
                    // onClick={() =>
                    //   dispatch(
                    //     openRevokeModal({
                    //       revokeUser: true,
                    //       currentUserObj: obj,
                    //     })
                    //   )
                    // }
                  >
                    Delete
                  </ButtonOutlined>
                </>
              ) : null}
            </div>
          );
        },
      },
    ];

    const newuserClicked = () => {
      // dispatch(fetchUserRoles(navigate));
      // dispatch(openAddModal({ showAddUser: true }));
    };
    return (
      <TableStyle>
        <TableHeader bottomPad={true}>
          <div className="tb_header_inner"></div>
          <Button icon={<PlusOutlined />} onClick={() => newuserClicked()}>
            New User
          </Button>
        </TableHeader>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={userList}
          // loading={isFetching}
          onChange={handlePagination}
          pagination={{
            total: userList?.TotalCount,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total.toLocaleString()}`,
            defaultPageSize: 10,
            pageSize: 10,
            defaultCurrent: currentPage,
          }}
        />
      </TableStyle>
    );
  }
);

export default TableComponent;
