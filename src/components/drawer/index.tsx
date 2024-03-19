import { Button, Drawer, Space } from "antd";

interface IBaseDrawer {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
}

export function BaseDrawer({ children, onClose, open, title }: IBaseDrawer) {
  return (
    <Drawer
      title={title}
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
}
