import { Day, Holiday, Tags, Task } from "../../types";
import { Card, Tag } from "antd";
import { format } from "date-fns";

interface ICardComponent {
  day: Day;
}

export function CardComponent({ day }: ICardComponent) {
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
              <Card
                type="inner"
                size="small"
                title={task?.title}
                extra={<a href="#">More</a>}
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
