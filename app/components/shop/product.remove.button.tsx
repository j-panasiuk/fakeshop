import { XMarkIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";

type Props = {
  productId: number;
};

export function ProductRemoveButton({ productId }: Props) {
  return (
    <Form method="POST">
      <input type="hidden" name="intent" value="DELETE" />
      <button
        name="productId"
        value={productId}
        type="submit"
        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </Form>
  );
}
