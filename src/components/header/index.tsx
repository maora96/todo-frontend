import { Button, Layout, Menu, Typography } from "antd";
import { getToken } from "../../api";
import { useState } from "react";
import { BaseDrawer } from "../drawer";
import { Tags } from "../../types";
import { AddTask } from "../forms/addTask";
import { AddTag } from "../forms/addTag";
import { useNavigate } from "react-router-dom";

interface IHeaderComponent {
  tags: Tags[];
  refetchTasks: () => void;
  refetchTags: () => void;
}

export function HeaderComponent({
  tags,
  refetchTasks,
  refetchTags,
}: IHeaderComponent) {
  const [isAddTaskDrawerOpen, setIsAddTaskDrawerOpen] = useState(false);
  const [isAddTagDrawerOpen, setIsAddTagDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const { Header } = Layout;
  const { Title } = Typography;

  const items = [
    { key: 0, label: "Criar tarefa" },
    { key: 1, label: "Criar tag" },
  ];

  const onCloseAddTaskDrawer = () => {
    setIsAddTaskDrawerOpen(false);
  };

  const onCloseAddTagDrawer = () => {
    setIsAddTagDrawerOpen(false);
  };

  const onMenuClick = (e: any) => {
    if (e.key === "0") {
      setIsAddTaskDrawerOpen(true);
    }

    if (e.key === "1") {
      setIsAddTagDrawerOpen(true);
    }
  };

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
        <div
          style={{
            minWidth: "25%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            items={items}
            style={{
              minWidth: "50%",
              justifyContent: "flex-end",
            }}
            onClick={onMenuClick}
          />
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      )}

      <BaseDrawer
        onClose={onCloseAddTaskDrawer}
        open={isAddTaskDrawerOpen}
        title={"Criar nova tarefa"}
      >
        <AddTask
          tags={tags}
          onClose={onCloseAddTaskDrawer}
          refetchTasks={refetchTasks}
        />
      </BaseDrawer>
      <BaseDrawer
        onClose={onCloseAddTagDrawer}
        open={isAddTagDrawerOpen}
        title={"Criar nova tag"}
      >
        <AddTag onClose={onCloseAddTagDrawer} refetchTags={refetchTags} />
      </BaseDrawer>
    </Header>
  );
}
