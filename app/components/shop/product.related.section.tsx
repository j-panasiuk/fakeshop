import { Link } from "@remix-run/react";
import type { Product } from "~/models/product";

type Props = {
  title: string;
  relatedProducts: Product[];
};

export function ProductRelatedSection({ title, relatedProducts }: Props) {
  return (
    <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
      <h2 id="related-heading" className="text-lg font-medium text-gray-900">
        {title}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProducts.map((relatedProduct) => (
          <div key={relatedProduct.id} className="group relative">
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.description}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {relatedProduct.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {"Pink" /*relatedProduct.color*/}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {"$35.00" /*relatedProduct.price*/}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
