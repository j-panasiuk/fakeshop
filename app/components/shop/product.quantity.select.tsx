import { Form } from "@remix-run/react";
import { useRef } from "react";

type Props = {
  productId: number;
  quantity: number;
};

export function ProductQuantitySelect({ productId, quantity }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelect = () => {
    const form = formRef.current;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <Form method="POST" ref={formRef}>
      <input type="hidden" name="intent" value="SET" />
      <input type="hidden" name="productId" value={productId} />
      <label htmlFor={`quantity-${productId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <select
        id={`quantity-${productId}`}
        name="quantity"
        className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        defaultValue={quantity}
        onChange={handleSelect}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </Form>
  );
}
