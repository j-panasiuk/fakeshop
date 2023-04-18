import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Form, Link, useNavigation } from "@remix-run/react";
import { Select } from "~/components/ui/dropdown";
import { classNames } from "~/utils/classes";
import { t } from "~/i18n/t";
import { useData } from "~/data/loader";
import { useLoginRedirect } from "~/utils/redirect";
import { currencies, languages } from "./layout.constants";
import { Logo } from "./logo";

export function LayoutTopNavigation() {
  const { user } = useData();
  const navigation = useNavigation();
  const loginUrl = useLoginRedirect();

  const isPending = navigation.state !== "idle";

  return (
    <div
      className={classNames(
        "transition-colors",
        isPending ? "bg-indigo-800" : "bg-gray-900"
      )}
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <form className="flex space-x-4">
          <Select options={currencies} />
          <Select options={languages} />
        </form>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Form action="/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Logout
                </button>
              </Form>
              <Link
                to="/profile"
                className="text-sm font-medium text-yellow-200 hover:text-yellow-100"
              >
                {user.username}
              </Link>
            </>
          ) : (
            <>
              <Link
                to={loginUrl}
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type LayoutSecondaryNavigationProps = {
  openMobileMenu: () => void;
};

export function LayoutSecondaryNavigation({
  openMobileMenu,
}: LayoutSecondaryNavigationProps) {
  const { cart, categories, products } = useData();

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex h-16 items-center justify-between">
            {/* Logo (lg+) */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <div className="hidden h-full lg:flex">
              {/* Flyout menus */}
              <Popover.Group className="inset-x-0 bottom-0 px-4">
                <div className="flex h-full justify-center space-x-8">
                  {categories.map((category) => (
                    <Popover key={category} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                              {category}
                              <span
                                className={classNames(
                                  open ? "bg-white" : "",
                                  "absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out"
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                    {products
                                      .filter(
                                        (product) =>
                                          product.category === category
                                      )
                                      .map((product) => (
                                        <div
                                          key={product.id}
                                          className="group relative"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={product.image}
                                              alt={product.description}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            to={`/products/${product.id}`}
                                            className="mt-4 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {product.title}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            {t("Buy now")}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>
            </div>

            {/* Mobile menu and search (lg-) */}
            <div className="flex flex-1 items-center lg:hidden">
              <button
                type="button"
                className="-ml-2 p-2 text-white"
                onClick={openMobileMenu}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Search */}
              <a href="#" className="ml-2 p-2 text-white">
                <span className="sr-only">Search</span>
                <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            {/* Logo (lg-) */}
            <Link to="/" className="lg:hidden">
              <Logo />
            </Link>

            <div className="flex flex-1 items-center justify-end">
              <a
                href="#"
                className="hidden text-sm font-medium text-white lg:block"
              >
                Search
              </a>

              <div className="flex items-center lg:ml-8">
                {/* Cart */}
                <div className="flow-root">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingCartIcon
                      className="h-6 w-6 flex-shrink-0 text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-white">
                      {cart?.products.length || 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
