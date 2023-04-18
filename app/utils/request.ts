const headers = {
  "Content-Type": "application/json",
};

const baseUrl = "https://fakestoreapi.com";

type Endpoint = `/${string}`;
type FakeStoreApiUrl = `${typeof baseUrl}/${string}`;

export const request = {
  get: (endpoint: Endpoint, params?: RequestInit) =>
    send(endpoint, {
      method: "GET",
      headers,
      ...params,
    }),
  post: (endpoint: Endpoint, payload: unknown, params?: RequestInit) =>
    send(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      ...params,
    }),
  put: (endpoint: Endpoint, payload: unknown, params?: RequestInit) =>
    send(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
      ...params,
    }),
  patch: (endpoint: Endpoint, payload: unknown, params?: RequestInit) =>
    send(endpoint, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
      ...params,
    }),
  delete: (endpoint: Endpoint, params?: RequestInit) =>
    send(endpoint, {
      method: "DELETE",
      headers,
      ...params,
    }),
} as const;

async function send(endpoint: Endpoint, init?: RequestInit): Promise<unknown> {
  const url: FakeStoreApiUrl = `${baseUrl}${endpoint}`;
  const res = await fetch(url, init);
  if (!res.ok) throw await res.text();
  return res.json();
}
