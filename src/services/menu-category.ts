import api from "../utils/api";

export type CategoryType = "food" | "beverage" | "tobacco" | "other";

export default async function getAllMenuCategory(type: CategoryType) {
  try {
    const result = await api.get("/menu-category", {
      params: {
        tenant_id: 6,
        type: type,
      },
    });
    return result.data;
  } catch (e) {
    console.log("getAllMenuCategory - ", e);
    throw Error;
  }
}
