import React, { useEffect, useState } from "react";
import { Button, Flex, Table, Modal, message } from "antd";
import SignUpForm from "./signup-form.component";
import {
  getAllUsers,
  deleteUser,
  exportUserByIds,
} from "../services/userServices";

const UserTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    try {
      await getAllUsers().then((response) => {
        setUsers(
          response.data.map((item, i) => ({
            key: i,
            ...item,
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const exportUsers = async (selectedUserIds) => {
    try {
      await exportUserByIds(selectedUserIds).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.error("Error exporting users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    fetchData();
  };

  const handleOk = () => {
    messageApi.open({
      type: "success",
      content: "The user was added successfully!",
    });
    setIsModalOpen(false);
    refetchData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteUserById = async (id) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.log(err);
    } finally {
      messageApi.open({
        type: "success",
        content: "The user was deleted successfully!",
      });
      refetchData();
    }
  };

  const rowSelection = {
    selectedRow,
    onChange: (selectedRowKeys, selectedRows) =>
      onSelectChange(selectedRowKeys, selectedRows),
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRow(selectedRows);
  };

  const handleExport = () => {
    setLoading(true);
    const listUserIds = selectedRow.map((item) => {
      return item._id;
    });
    setTimeout(() => {
      exportUsers(listUserIds);
    }, 1000);
  };

  const hasSelected = selectedRow.length > 0;

  const handleDelete = (id) => {
    Modal.warning({
      centered: true,
      title: "Delete user?",
      content: "Are you sure you want to delete this user?",
      okText: "Confirm",
      onOk: () => deleteUserById(id),
      closable: true,
    });
  };

  const columns = [
    {
      title: "First Name",
      key: "firstName",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      key: "lastName",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            handleDelete(record._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Flex gap="middle" vertical>
        <Flex align="center" justify="flex-end" gap="middle">
          <Button type="primary" onClick={showModal}>
            SIGN UP
          </Button>
          <Button
            type="primary"
            onClick={handleExport}
            disabled={!hasSelected}
            loading={loading}
          >
            EXPORT
          </Button>
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
          footer={() =>
            hasSelected ? `Selected ${selectedRow.length} items` : null
          }
        />
      </Flex>
      <SignUpForm open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
    </>
  );
};

export default UserTable;
