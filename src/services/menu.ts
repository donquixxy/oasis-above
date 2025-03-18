import api from "../utils/api";

export interface IMenuParams {
  typeMenu: number | string;
  name?: string;
  menucategoryID?: number | string;
}

export default async function getAllMenu(params: IMenuParams) {
  try {
    const queryParams: Record<string, any> = {
      tenant_id: 6,
      type_menu: params.typeMenu,
    };

    if (params.menucategoryID) {
      queryParams.menu_category_id = params.menucategoryID;
    }

    if (params.name) {
      queryParams.name = params.name;
    }

    const result = await api.get("/menu/table", {
      params: queryParams,
    });

    return result.data;
  } catch (e) {
    throw e; // Avoid throwing generic `Error` object without message
  }
}
