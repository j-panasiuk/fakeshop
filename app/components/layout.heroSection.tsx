import {
  LayoutSecondaryNavigation,
  LayoutTopNavigation,
} from "./layout.header";

type LayoutHeroSectionProps = {
  openMobileMenu: () => void;
  hero?: JSX.Element;
};

export function LayoutHeroSection({
  openMobileMenu,
  hero,
}: LayoutHeroSectionProps) {
  return (
    <div className="relative bg-gray-900">
      <HeroImageAndOverlay />

      {/* Navigation */}
      <header className="relative z-10">
        <nav aria-label="Top">
          <LayoutTopNavigation />
          <LayoutSecondaryNavigation openMobileMenu={openMobileMenu} />
        </nav>
      </header>

      {hero}
    </div>
  );
}

function HeroImageAndOverlay() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />
    </>
  );
}
