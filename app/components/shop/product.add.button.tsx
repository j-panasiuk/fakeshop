import { Form } from "@remix-run/react";

type Props = {
  productId: number;
};

export function ProductAddButton({ productId }: Props) {
  return (
    <Form method="POST">
      <input type="hidden" name="intent" value="ADD" />
      <input type="hidden" name="redirectUrl" value="/cart" />
      <button
        name="productId"
        value={productId}
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </Form>
  );
}
