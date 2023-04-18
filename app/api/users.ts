import { array, assert } from "superstruct";
import { type User, userStruct } from "~/models/user";
import { request } from "~/utils/request";
import { describeResponseMismatch } from "~/utils/response";

export async function fetchUsers(): Promise<User[]> {
  const endpoint = `/users`;
  const users = await request.get(endpoint);
  assert(users, array(userStruct), describeResponseMismatch(endpoint));
  return users;
}

export async function fetchUser(id: User["id"]): Promise<User> {
  const endpoint = `/users/${id}` as const;
  const user = await request.get(endpoint);
  assert(user, userStruct, describeResponseMismatch(endpoint));
  return user;
}

/**
 * @todo this is not a performant implementation, but gets the job done for demo purposes (:
 */
export async function findUser(username: string): Promise<User> {
  const users = await fetchUsers();
  const user = users.find((u) => u.username === username);
  assert(user, userStruct);
  return user;
}
