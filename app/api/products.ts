import { array, assert } from "superstruct";
import { type Product, productStruct } from "~/models/product";
import {
  type ProductCategory,
  productCategoryStruct,
} from "~/models/productCategory";
import { request } from "~/utils/request";
import { describeResponseMismatch } from "~/utils/response";

export async function fetchProducts(): Promise<Product[]> {
  const endpoint = `/products`;
  const products = await request.get(endpoint);
  assert(products, array(productStruct), describeResponseMismatch(endpoint));
  return products;
}

export async function fetchProduct(id: Product["id"]): Promise<Product> {
  const endpoint = `/products/${id}` as const;
  const product = await request.get(endpoint);
  assert(product, productStruct, describeResponseMismatch(endpoint));
  return product;
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  const endpoint = `/products/categories` as const;
  const categories = await request.get(endpoint);
  assert(
    categories,
    array(productCategoryStruct),
    describeResponseMismatch(endpoint)
  );
  return categories;
}

export async function fetchProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const endpoint = `/products/category/${category}` as const;
  const products = await request.get(endpoint);
  assert(products, array(productStruct), describeResponseMismatch(endpoint));
  return products;
}
