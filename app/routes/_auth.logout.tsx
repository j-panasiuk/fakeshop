import { redirect, type ActionArgs } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cookie = await destroySession(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
