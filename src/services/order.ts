import api from "../utils/api";

interface IOrderPayload {
  cart_id: number | string;
  session_id: string;
}

export async function submitOrder(payload: IOrderPayload) {
  try {
    const result = await api.postForm("/menu/table/submit", {
      cart_id: payload.cart_id,
      sesssion_id: payload.session_id,
      tenant_id: 6,
      table_id: import.meta.env.VITE_AUTH_TABLE_ID,
    });

    return result.data;
  } catch (err) {
    console.log("submitOrder - ", err);
    throw err;
  }
}
