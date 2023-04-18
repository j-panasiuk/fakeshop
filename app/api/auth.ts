import { assert } from "superstruct";
import {
  type LoginPayload,
  type AuthToken,
  authTokenStruct,
} from "~/models/auth";
import { request } from "~/utils/request";
import { describeResponseMismatch } from "~/utils/response";

export async function login(payload: LoginPayload): Promise<AuthToken> {
  const endpoint = `/auth/login` as const;
  const authToken = await request.post(endpoint, payload);
  assert(authToken, authTokenStruct, describeResponseMismatch(endpoint));
  return authToken;
}

export async function logout(): Promise<unknown> {
  return await fetch("/logout", { method: "POST" });
}
