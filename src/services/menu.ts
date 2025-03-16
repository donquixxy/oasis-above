import api from "../utils/api";

interface IMenuParams {
  tenantID: number | string;
  typeMenu: number | string;
  name?: string;
  menucategoryID?: number | string;
}

export default async function getAllMenu(params: IMenuParams) {
  try {
    const result = await api.get("/")
  } catch (e) {
    throw Error;
  }
}
