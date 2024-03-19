import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { signIn } from "../../api/auth";
import { SignIn } from "../../types";
import { Layout, Button, Typography, Form, Input } from "antd";
import toast from "react-hot-toast";
import { HeaderComponent } from "../../components/header";

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const { Content } = Layout;
  const { Title } = Typography;

  const notifyError = () => toast.error("Erro no login.");

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
      onError: () => {
        notifyError();
      },
    }
  );

  const onFinish = (values: FormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <HeaderComponent />
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
