import { Outlet } from "@remix-run/react";

export default function Auth() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
}
