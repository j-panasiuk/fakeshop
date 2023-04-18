import * as s from "superstruct";

export type LoginPayload = s.Infer<typeof loginPayloadStruct>;
export type AuthToken = s.Infer<typeof authTokenStruct>;

export const loginPayloadStruct = s.object({
  username: s.nonempty(s.string()),
  password: s.nonempty(s.string()),
});

export const authTokenStruct = s.type({
  token: s.nonempty(s.string()),
});
