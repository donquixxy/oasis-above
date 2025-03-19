import api from "../utils/api";

export interface ICartPayload {
  menu_id: number | string;
  quantity: number | string;
  session_id: string;
}

export interface ICartParam {
  session_id: string;
}

export async function addToCart(payload: ICartPayload) {
  try {
    const result = await api.postForm("/menu/table/cart", {
      menu_id: payload.menu_id,
      quantity: payload.quantity,
      session_id: payload.session_id,
    });

    return result.data;
  } catch (e) {
    console.log("addToCart -", e);
    throw Error;
  }
}

export async function getCart(param: ICartParam) {
  try {
    const result = await api.get("/menu/table/cart", {
      params: {
        hotel_id: 0,
        session_id: param.session_id,
      },
    });

    return result.data;
  } catch (e) {
    console.log("getCART - ", e);
    throw Error;
  }
}
