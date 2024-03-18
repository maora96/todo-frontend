import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Day, FormValues, getManyTasks } from "../../types";
import { Layout, Space } from "antd";
import { getToken } from "../../api";
import { useGetTasks } from "../../hooks/task";
import { useGetTags } from "../../hooks/tag";
import { HeaderComponent } from "../../components/header";
import { CardComponent } from "../../components/card";
import { Filters } from "../../components/filters";

export function Dashboard() {
  const [request, setRequest] = useState<getManyTasks>({});

  const navigate = useNavigate();
  const { Content } = Layout;

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, []);

  const { data } = useGetTasks(request);
  const { data: allTags } = useGetTags();

  const onFinish = (values: FormValues) => {
    setRequest({
      title: values.title,
    });
  };

  const handleChange = (value: string[]) => {
    setRequest({ ...request, tags: value });
  };

  return (
    <Layout>
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
            padding: 30,
            borderRadius: "20px",
            width: "70%",
            scrollBehavior: "auto",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Filters
            request={request}
            setRequest={setRequest}
            onSubmit={onFinish}
            handleRadioButtonsChange={handleChange}
            allTags={allTags}
          />
          <Space direction="horizontal" size={16} wrap align="baseline">
            {data?.map((day: Day) => {
              return <CardComponent day={day} />;
            })}
          </Space>
        </div>
      </Content>
    </Layout>
  );
}
