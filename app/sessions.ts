import { createCookieSessionStorage } from "@remix-run/node";
import type { AuthToken } from "./models/auth";
import type { User } from "./models/user";
import { Cart } from "./models/cart";

type SessionData = {
  token: AuthToken["token"];
  userId: User["id"];
  cartProducts: Cart["products"];
};

type SessionFlashData = { error: string };

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      // httpOnly: true,
      // sameSite: "strict",
      secrets: ["misie-pysie"],
    },
  });
