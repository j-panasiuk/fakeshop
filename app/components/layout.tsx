import { Outlet } from "@remix-run/react";
import { useToggle } from "~/utils/toggle";
import { LayoutFooter } from "./layout.footer";
import { LayoutMobileMenu } from "./layout.mobileMenu";
import { LayoutHeroSection } from "./layout.heroSection";

type LayoutProps = {
  hero?: JSX.Element;
  main?: JSX.Element;
};

export function Layout({ hero, main }: LayoutProps) {
  const [mobileMenuIsOpen, { open, close }] = useToggle(false);

  return (
    <div className="bg-white min-h-full">
      <LayoutMobileMenu isOpen={mobileMenuIsOpen} close={close} />
      <LayoutHeroSection openMobileMenu={open} hero={hero} />
      {main ?? <Outlet />}
      <LayoutFooter />
    </div>
  );
}
