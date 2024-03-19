import { Button, Form, Input } from "antd";
import { createTag } from "../../../types";
import { useMutation } from "react-query";
import { create } from "../../../api/tag";
import toast from "react-hot-toast";

interface IAddTag {
  onClose: (isOpen: boolean) => void;
  refetchTags: () => void;
}

export function AddTag({ onClose, refetchTags }: IAddTag) {
  const notifySuccess = () => toast.success("Tag salva com sucesso!");
  const notifyError = () => toast.error("Erro ao salvar a tag.");

  const addTagMutation = useMutation(
    async (request: createTag) => create(request),
    {
      onSuccess: () => {
        notifySuccess();
        refetchTags();
        onClose(false);
        form.resetFields();
      },
      onError: () => {
        notifyError();
        form.resetFields();
      },
    }
  );

  const onSubmit = (values: any) => {
    addTagMutation.mutate(values);
  };
  const [form] = Form.useForm();
  return (
    <Form layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input style={{ width: "100%" }} placeholder="Please enter name" />
      </Form.Item>

      <Button type="primary" onClick={onSubmit} htmlType="submit">
        Enviar
      </Button>
    </Form>
  );
}
