import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getManyTasks } from "../../types";
import { Layout, Menu, Typography } from "antd";
import { getToken } from "../../api";
export function HeaderComponent() {
  const [request, setRequest] = useState<getManyTasks>({});
  const [tasks, setTasks] = useState<any[]>([]);

  const navigate = useNavigate();
  const { Header } = Layout;
  const { Title } = Typography;

  const items = [
    { key: 0, label: "Criar tarefa" },
    { key: 1, label: "Criar tag" },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Tarefas
      </Title>
      {getToken() && (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={items}
          style={{
            minWidth: "50%",
            justifyContent: "flex-end",
          }}
        />
      )}
    </Header>
  );
}
