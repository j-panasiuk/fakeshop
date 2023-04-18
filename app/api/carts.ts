import { assert } from "superstruct";
import { type Cart, cartStruct } from "~/models/cart";
import { request } from "~/utils/request";
import { describeResponseMismatch } from "~/utils/response";

export async function fetchCart(id: Cart["id"]): Promise<Cart> {
  const endpoint = `/carts/${id}` as const;
  const cart = await request.get(endpoint);
  assert(cart, cartStruct, describeResponseMismatch(endpoint));
  return cart;
}
