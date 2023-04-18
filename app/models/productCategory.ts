import * as s from "superstruct";

export type ProductCategory = s.Infer<typeof productCategoryStruct>;

export const productCategoryStruct = s.nonempty(s.string());
