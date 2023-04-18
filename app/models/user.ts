import * as s from "superstruct";

export type User = s.Infer<typeof userStruct>;

export const userStruct = s.type({
  id: s.integer(),
  email: s.nonempty(s.string()),
  username: s.nonempty(s.string()),
  password: s.nonempty(s.string()),
  name: s.type({
    firstname: s.string(),
    lastname: s.string(),
  }),
  address: s.type({
    city: s.string(),
    street: s.string(),
    number: s.integer(),
    zipcode: s.string(),
    geolocation: s.type({
      lat: s.string(),
      long: s.string(),
    }),
  }),
  phone: s.string(),
});
