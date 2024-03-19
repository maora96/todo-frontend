import { FormValues, Tags, getManyTasks } from "../../types";
import { Button, Form, Input, Radio, Select } from "antd";

interface IFilters {
  request: getManyTasks;
  setRequest: (request: getManyTasks) => void;
  onSubmit: (values: FormValues) => void;
  handleRadioButtonsChange: (value: string[]) => void;
  allTags: Tags[];
}

export function Filters({
  request,
  setRequest,
  onSubmit,
  handleRadioButtonsChange,
  allTags,
}: IFilters) {
  const { Item } = Form;
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: "100%",
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Item
          name="title"
          style={{
            minWidth: "90%",
          }}
        >
          <Input placeholder="Busca por título" />
        </Item>

        <Item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Item>
      </Form>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <Radio.Group
          value={request.period}
          onChange={(e) => setRequest({ ...request, period: e.target.value })}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Radio.Button value="DAY">Dia</Radio.Button>
          <Radio.Button value="WEEK">Semana</Radio.Button>
          <Radio.Button value="MONTH">Mês</Radio.Button>
        </Radio.Group>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "30%" }}
          placeholder="Busque por tags"
          onChange={handleRadioButtonsChange}
          options={allTags?.map((tag: Tags) => ({
            value: tag.id,
            label: tag.name,
          }))}
        />
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            form.resetFields();
            setRequest({});
          }}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
