import { api } from ".";
import {
  createTask,
  editTask,
  getManyTasks,
  getManyTasksByTags,
} from "../types";

export const getOne = async (id: string) => {
  const { data } = await api.get(`/v1/task/${id}`);

  return data.result;
};

export const getMany = async (request: getManyTasks) => {
  const { data } = await api.get(
    `/v1/task?title=${request.title}&period=${request.period}`
  );

  return data.result;
};

export const create = async (request: createTask) => {
  return api.post("/v1/task", {
    ...request,
  });
};

export const getByTags = async (request: getManyTasksByTags) => {
  return api.post("/v1/task/tags", {
    ...request,
  });
};

export const edit = async (request: editTask) => {
  return api.patch("/v1/task", {
    ...request,
  });
};

export const deleteOne = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);

  return data.result;
};
