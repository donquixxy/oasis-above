import { useQuery } from "@tanstack/react-query";
import getAllMenuCategory, { CategoryType } from "../../services/menu-category";
import { BaseApiResponse } from "../../utils/api";
import getAllMenu from "../../services/menu";
import { useMenuStore } from "../../hooks/menu-store";

interface IMenuCategory {
  id: number;
  name: string;
}

interface IMenu {
  id: number;
  name: string;
  image_url: string;
  price: number;
  description: string;
}

export const useMenus = (categoryID?: number) => {
  const { selectedType } = useMenuStore();

  const val = selectedType[0] as CategoryType;

  const { isLoading: isCateLoading, data: cateData } = useQuery<
    BaseApiResponse<IMenuCategory[]>
  >({
    queryKey: ["menu-category", val],
    queryFn: () => getAllMenuCategory(val),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 0,
  });

  const cateID = categoryID ?? cateData?.data?.[0]?.id;

  const { isLoading: isMenuLoading, data: menuData } = useQuery<
    BaseApiResponse<IMenu[]>
  >({
    queryKey: ["menu", cateID, val],
    queryFn: () =>
      getAllMenu({
        typeMenu:
          val === "food"
            ? 1
            : val === "beverage"
            ? 2
            : val === "tobacco"
            ? 3
            : 4,
        menucategoryID: cateID,
      }),
    enabled: !!cateID,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    cateData,
    menuData,
    isMenuLoading,
    isCateLoading,
  };
};
