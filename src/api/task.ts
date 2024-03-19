import { api, getToken } from ".";
import {
  createTask,
  editTask,
  getManyTasks,
  getManyTasksByTags,
} from "../types";

export const getOne = async (id: string) => {
  const { data } = await api.get(`/v1/task/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.result;
};

export const getMany = async (request: getManyTasks) => {
  const { data } = await api.post(
    `/v1/task/list?${request.title ? `title=${request.title}&` : ""}${
      request.period ? `period=${request.period}&` : ""
    }`,
    {
      tags: request.tags,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return data.result;
};

export const create = async (request: createTask) => {
  return api.post(
    "/v1/task",
    {
      ...request,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const getByTags = async (request: getManyTasksByTags) => {
  return api.post(
    "/v1/task/tags",
    {
      ...request,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const edit = async (request: editTask, id: string) => {
  return api.patch(
    `/v1/task/${id}`,
    {
      ...request,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const deleteOne = async (id: string) => {
  const { data } = await api.delete(`/v1/task/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.result;
};
