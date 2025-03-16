import { useQuery } from "@tanstack/react-query";
import getAllMenuCategory, { CategoryType } from "../../services/menu-category";
import { BaseApiResponse } from "../../utils/api";

interface IMenuCategory {
  id: number;
  name: string;
}

export const useMenuCategory = (v: CategoryType) => {
  const { isLoading, error, data } = useQuery<BaseApiResponse<IMenuCategory[]>>(
    {
      queryKey: ["menu-category", v],
      queryFn: () => getAllMenuCategory(v),
    }
  );

  return { isLoading, error, data };
};
