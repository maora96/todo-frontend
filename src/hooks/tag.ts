import { useQuery } from "react-query";
import { getMany, getOne } from "../api/tag";

export const useGetSingleTag = (id: string) => {
  return useQuery("getSingleTag", async () => getOne(id), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useGetTags = () => {
  return useQuery("getManyTags", async () => getMany(), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
