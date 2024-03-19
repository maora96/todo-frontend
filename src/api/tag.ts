import { api, getToken } from ".";
import { createTag, editTag } from "../types";

export const getOne = async (id: string) => {
  const { data } = await api.get(`/v1/task/${id}`);

  return data.result;
};

export const getMany = async () => {
  const { data } = await api.get(`/v1/tag`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.result;
};

export const create = async (request: createTag) => {
  return api.post(
    "/v1/tag",
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

export const edit = async (request: editTag) => {
  return api.patch(
    "/v1/tag",
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
  const { data } = await api.delete(`/v1/tag/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return data.result;
};
