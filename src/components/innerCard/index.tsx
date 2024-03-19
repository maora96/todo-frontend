import { PlusOutlined } from "@ant-design/icons";
import { Tags, Task } from "../../types";
import { Card, Dropdown, Modal, Space, Tag } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { deleteOne } from "../../api/task";
import { BaseDrawer } from "../drawer";
import { EditTask } from "../forms/editTask";
import toast from "react-hot-toast";

interface IInnerCardComponent {
  task: Task;
  refetchTasks: () => void;
  tags: Tags[];
}

export function InnerCardComponent({
  task,
  refetchTasks,
  tags,
}: IInnerCardComponent) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditTagDrawerOpen, setIsEditTagDrawerOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteTaskMutation.mutate();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCloseEditTaskDrawer = () => {
    setIsEditTagDrawerOpen(false);
  };

  const onOpenEditTagDrawer = () => {
    setIsEditTagDrawerOpen(true);
  };

  const notifySuccess = () => toast.success("Tarefa deletada com sucesso!");
  const notifyError = () => toast.error("Erro ao deletar a tarefa.");

  const deleteTaskMutation = useMutation(async () => deleteOne(task.id), {
    onSuccess: () => {
      notifySuccess();
      refetchTasks();
      handleCancel();
    },
    onError: () => {
      notifyError();
    },
  });

  const items: any[] = [
    {
      key: "1",
      label: <span onClick={onOpenEditTagDrawer}>Editar tarefa</span>,
    },
    {
      key: "2",
      label: <span onClick={showModal}>Deletar tarefa</span>,
      danger: true,
    },
  ];

  return (
    <>
      <Card
        type="inner"
        size="small"
        title={task?.title}
        extra={
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                <PlusOutlined />
              </Space>
            </a>
          </Dropdown>
        }
        style={{
          width: 300,
          marginBottom: 20,
        }}
      >
        <p>{task?.description}</p>
        <Tag
          color="#108ee9"
          style={{
            marginTop: 10,
          }}
        >
          {(task?.duration / 60).toFixed(0)}min
        </Tag>
        <div>
          {task.tags?.map((tag: Tags) => (
            <Tag
              color="#2db7f5"
              style={{
                marginTop: 10,
              }}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </Card>

      <Modal
        title="Deletar tarefa"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Deseja deletar a tarefa selecionada?</p>
      </Modal>
      <BaseDrawer
        onClose={onCloseEditTaskDrawer}
        open={isEditTagDrawerOpen}
        title={"Editar nova tag"}
      >
        <EditTask
          onClose={onCloseEditTaskDrawer}
          refetchTasks={refetchTasks}
          task={task}
          tags={tags}
        />
      </BaseDrawer>
    </>
  );
}
