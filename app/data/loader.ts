import { useLoaderData } from "@remix-run/react";
import { array, assert, optional } from "superstruct";
import { cartStruct } from "~/models/cart";
import { type Product, productStruct } from "~/models/product";
import { productCategoryStruct } from "~/models/productCategory";
import { userStruct } from "~/models/user";

type CartProduct = {
  product: Product;
  quantity: number;
};

export function useData() {
  const { cart, user, categories, products } = useLoaderData();

  assert(user, optional(userStruct));
  assert(cart, optional(cartStruct));
  assert(categories, array(productCategoryStruct));
  assert(products, array(productStruct));

  const cartProducts: CartProduct[] =
    cart?.products.map(({ quantity, productId }) => ({
      product: products.find((p) => p.id === productId)!, // Not type-safe, but for this example it will work
      quantity,
    })) || [];

  return { user, cart, cartProducts, categories, products };
}
