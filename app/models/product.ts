import * as s from "superstruct";

export type Product = s.Infer<typeof productStruct>;

export const productStruct = s.type({
  id: s.integer(),
  title: s.nonempty(s.string()),
  description: s.nonempty(s.string()),
  category: s.nonempty(s.string()),
  image: s.string(),
  rating: s.type({
    rate: s.max(s.min(s.number(), 0), 5),
    count: s.integer(),
  }),
});

// --- HELPERS ---

export function getRelatedProducts(
  products: Product[],
  ids: number[]
): Product[] {
  // Silly placeholder implemenation
  return products.filter((p) => !ids.includes(p.id)).slice(0, 3);
}
