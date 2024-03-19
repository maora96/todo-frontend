import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Tags, Task, editTask } from "../../../types";
import { useMutation } from "react-query";
import { edit } from "../../../api/task";
import dayjs from "dayjs";
import toast from "react-hot-toast";

interface IEditTask {
  tags: Tags[];
  onClose: (isOpen: boolean) => void;
  refetchTasks: () => void;
  task: Task;
}

export function EditTask({ tags, onClose, refetchTasks, task }: IEditTask) {
  const notifySuccess = () => toast.success("Tarefa salva com sucesso!");
  const notifyError = () => toast.error("Erro ao salvar a tarefa.");
  const editTaskMutation = useMutation(
    async (request: editTask) => edit(request, task.id),
    {
      onSuccess: () => {
        notifySuccess();
        refetchTasks();
        form.resetFields();
        onClose(false);
      },
      onError: () => {
        notifyError();
        form.resetFields();
      },
    }
  );

  const onSubmit = (values: any) => {
    const payload: any = {};
    if (values?.title) {
      payload.title = values.title;
    }
    if (values?.description) {
      payload.description = values.description;
    }
    if (values?.date) {
      payload.date = values?.date.toISOString();
    }
    if (values?.duration) {
      payload.duration = values.duration;
    }
    if (values?.tags) {
      payload.tags = values.tags;
    }
    payload && editTaskMutation.mutate(payload);
  };

  const [form] = Form.useForm();

  return (
    <Form layout="vertical" onFinish={onSubmit} form={form}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: "Please enter title" }]}
            initialValue={task.title}
          >
            <Input placeholder="Please enter title" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Data"
            rules={[{ required: true, message: "Please enter date" }]}
            initialValue={dayjs(task.date)}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="tags"
            label="Tags"
            initialValue={task.tags?.map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              options={tags?.map((tag) => ({ value: tag.id, label: tag.name }))}
              placeholder="Please select a tag"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="duration"
            label="Duração"
            rules={[{ required: true, message: "Please enter duration" }]}
            initialValue={task.duration}
          >
            <Input type="number" placeholder="Please enter duration" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
            initialValue={task.description}
          >
            <Input.TextArea rows={4} placeholder="Please enter description" />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" onClick={onSubmit} htmlType="submit">
        Enviar
      </Button>
    </Form>
  );
}
