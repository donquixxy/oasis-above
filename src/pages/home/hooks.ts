import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getAllMenuCategory, { CategoryType } from "../../services/menu-category";
import { BaseApiResponse } from "../../utils/api";
import getAllMenu from "../../services/menu";
import { useFormStore, useMenuStore } from "../../hooks/menu-store";
import { addToCart, getCart, ICartPayload } from "../../services/cart";
import { toaster } from "../../components/ui/toaster";
import { useCookie } from "../../hooks/cookies";

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

export interface ICart {
  id: number;
  total: number;
  service_amount: number;
  tax_amount: number;
  sub_total: number;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  menu_id: number;
  quantity: number;
  sub_total: number;
  menu: IMenu;
}

export const useMenus = (categoryID?: number) => {
  const { selectedType } = useMenuStore();
  const useForm = useFormStore();

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
    queryKey: ["menu", cateID, val, useForm.value],
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
        name: useForm.value,
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

export const useCartMutation = () => {
  const queryClient = useQueryClient();
  const session = useCookie();
  const { isPending, mutate, isError } = useMutation({
    mutationFn: (payload: ICartPayload) => {
      return addToCart({
        menu_id: payload.menu_id,
        quantity: payload.quantity,
        session_id: session.getSessionID,
      });
    },
    onSuccess: (_) => {
      toaster.create({
        description: "Successfully Processed",
        type: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      toaster.error({
        title: "Failed",
        type: "error",
        description: "Failed add item to cart",
        duration: 3000,
      });
      console.log("failed to retrieve data", err);
    },
  });

  return { isError, isPending, mutate };
};

export const useCart = () => {
  const session = useCookie();
  const { isLoading, data, isError } = useQuery<BaseApiResponse<ICart>>({
    queryKey: ["cart"],
    queryFn: () =>
      getCart({
        session_id: session.getSessionID,
      }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
  return { isLoading, data, isError };
};
