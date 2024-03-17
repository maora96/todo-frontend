import { useQuery } from "react-query";
import { getManyTasks } from "../types";
import { getMany, getOne } from "../api/task";

export const useGetSingleTask = (id: string) => {
  return useQuery("getSingleTask", async () => getOne(id), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useGetTasks = (request: getManyTasks) => {
  return useQuery(["getManyTasks", request], async () => getMany(request), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
