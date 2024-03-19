import { Day, Holiday, Tags, Task } from "../../types";
import { Card, Tag } from "antd";
import { format } from "date-fns";
import { InnerCardComponent } from "../innerCard";

interface ICardComponent {
  day: Day;
  refetchTasks: () => void;
  tags: Tags[];
}

export function CardComponent({ day, refetchTasks, tags }: ICardComponent) {
  return (
    <Card
      title={format(new Date(day.date), "dd/MM/yyyy")}
      style={{
        width: 350,
      }}
    >
      <Tag
        color="geekblue"
        style={{
          marginBottom: 20,
        }}
      >
        Tarefas
      </Tag>
      {day.tasks?.length === 0 ? (
        <p
          style={{
            marginBottom: 20,
          }}
        >
          Nenhuma task encontrada.
        </p>
      ) : (
        <>
          {day.tasks.map((task: Task) => {
            return (
              <InnerCardComponent
                refetchTasks={refetchTasks}
                task={task}
                tags={tags}
              />
            );
          })}
        </>
      )}
      <Tag
        color="purple"
        style={{
          marginBottom: 20,
        }}
      >
        Feriados
      </Tag>
      {day.holidays.map((holiday: Holiday) => {
        return (
          <Tag
            color="#108ee9"
            style={{
              display: "block",
            }}
          >
            {holiday?.localName}
          </Tag>
        );
      })}
    </Card>
  );
}
