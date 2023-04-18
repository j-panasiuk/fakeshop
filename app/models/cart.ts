import * as s from "superstruct";

export type Cart = s.Infer<typeof cartStruct>;

export const cartStruct = s.type({
  id: s.integer(),
  userId: s.integer(),
  date: s.string(),
  products: s.array(
    s.type({
      productId: s.integer(),
      quantity: s.integer(),
    })
  ),
});
