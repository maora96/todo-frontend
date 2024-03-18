import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signIn } from "../../api/auth";
import { useState } from "react";
import { SignIn } from "../../types";
import { Layout, Menu, Button, Typography, Form, Input } from "antd";

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const [loginError, setLoginError] = useState<string>();

  const navigate = useNavigate();
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const loginMutation = useMutation(
    async (request: SignIn) => signIn(request),
    {
      onSuccess: (data) => {
        const token = data.data.access_token;
        localStorage.setItem("token", JSON.stringify(token));

        const user = {
          email: data.data.email,
          id: data.data.id,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard");
      },
      onError: (data: any) => {
        setLoginError(data.response.data.message);
      },
    }
  );

  const items = [
    { key: 0, label: "Criar tarefa" },
    { key: 1, label: "Criar tag" },
  ];

  const onFinish = (values: FormValues) => {
    loginMutation.mutate(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
          height: "100%",
        }}
      >
        <div
          style={{
            margin: "16px auto",
            background: "white",
            padding: 24,
            borderRadius: "20px",
            width: "50%",
          }}
        >
          <Form
            name="basic"
            style={{
              maxWidth: 600,
              margin: "0 auto",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title
              level={3}
              style={{
                margin: "16px auto",
                textAlign: "center",
              }}
            >
              Login
            </Title>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginRight: "15px",
                }}
              >
                Submit
              </Button>

              <Button
                type="default"
                htmlType="button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
