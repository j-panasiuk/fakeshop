import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  type ActionArgs,
  type LinksFunction,
  type LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import styles from "./root.css";
import { assert, integer } from "superstruct";
import { commitSession, getSession } from "./sessions";
import { fetchProductCategories, fetchProducts } from "./api/products";
import { fetchUser } from "./api/users";
import { fetchCart } from "./api/carts";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/logo.png" },
];

export default function App() {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderArgs) {
  try {
    console.log("ROOT loader", request.url);

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");
    const userId = session.get("userId");

    const [categories, products, user, cart] = await Promise.all([
      fetchProductCategories(),
      fetchProducts(),
      userId ? fetchUser(userId) : undefined,
      userId ? fetchCart(userId) : undefined,
    ]);

    const sessionCartProducts = session.get("cartProducts");
    if (cart && sessionCartProducts) {
      cart.products = sessionCartProducts;
    }

    return json({
      token,
      categories,
      products,
      user,
      cart,
    });
  } catch (err) {
    throw new Response("", { status: 400 });
  }
}

export async function action({ request }: ActionArgs) {
  console.log("ROOT action", request.url, request.method);

  const formValues = Object.fromEntries(await request.formData());

  const intent =
    typeof formValues.intent === "string" ? formValues.intent : undefined;

  const productId =
    typeof formValues.productId === "string"
      ? Number(formValues.productId)
      : undefined;

  const quantity =
    typeof formValues.quantity === "string"
      ? Number(formValues.quantity)
      : undefined;

  const redirectUrl =
    typeof formValues.redirectUrl === "string"
      ? formValues.redirectUrl
      : undefined;

  assert(productId, integer());

  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("userId")) {
    let cartProducts = session.get("cartProducts") ?? [];
    let cartProduct = cartProducts.find((p) => p.productId === productId);

    switch (intent) {
      case "ADD": {
        if (cartProduct) {
          cartProduct.quantity += 1;
        } else {
          cartProducts.push({
            productId,
            quantity: 1,
          });
        }
        break;
      }
      case "SET": {
        assert(quantity, integer());
        if (cartProduct) {
          cartProduct.quantity = quantity;
        } else {
          cartProducts.push({
            productId,
            quantity,
          });
        }
        break;
      }
      case "DELETE": {
        cartProducts = cartProducts.filter((p) => p.productId !== productId);
        break;
      }
    }

    session.set("cartProducts", cartProducts);
  }

  const sessionCookie = await commitSession(session);
  const headers = {
    "Set-Cookie": sessionCookie,
  };

  return typeof redirectUrl === "string"
    ? redirect(redirectUrl, { headers })
    : json({}, { headers });
}
