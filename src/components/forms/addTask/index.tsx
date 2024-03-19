import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Tags, createTask } from "../../../types";
import { useMutation } from "react-query";
import { create } from "../../../api/task";
import toast from "react-hot-toast";

interface IAddTask {
  tags: Tags[];
  onClose: (isOpen: boolean) => void;
  refetchTasks: () => void;
}

export function AddTask({ tags, onClose, refetchTasks }: IAddTask) {
  const notifySuccess = () => toast.success("Tarefa salva com sucesso!");
  const notifyError = () => toast.error("Erro ao salvar a tarefa.");

  const addTaskMutation = useMutation(
    async (request: createTask) => create(request),
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
    addTaskMutation.mutate({ ...values, date: values?.date.toISOString() });
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
          >
            <Input placeholder="Please enter title" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Data"
            rules={[{ required: true, message: "Please enter date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="tags" label="Tags">
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
