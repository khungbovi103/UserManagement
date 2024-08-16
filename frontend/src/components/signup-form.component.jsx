import React from "react";
import { Modal, Form, Input } from "antd";

import { createUser } from "../services/userServices";

const SignUpForm = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (data) => {
    try {
      await createUser(data);
    } catch (err) {
      console.log(err);
    } finally {
      form.resetFields();
      onOk();
    }
  };

  const handleSave = async () => {
    form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue(true);
        handleSubmit(values);
      })
      .catch(() => {
        console.log("Failed to save");
      });
  };

  return (
    <>
      <Modal
        title="Sign Up Form"
        open={open}
        okText={"Sign Up"}
        onOk={handleSave}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
      >
        <Form
          form={form}
          name="userForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Re-type Password"
            name="confirmPassword"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignUpForm;
