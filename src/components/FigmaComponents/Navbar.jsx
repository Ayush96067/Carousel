import React, { useState } from "react";
import { CiHeart, CiSearch, CiUser, CiMenuBurger } from "react-icons/ci";
import { MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import SlideBar from "./FigmaUI/SlideBar";

const NAV_LINKS = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Engagement Rings",
  "Wedding Rings",
  "Bracelets",
  "Collections",
  "Gifts",
  "The edit",
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const handleClick = () => setIsMobileMenuOpen((open) => !open);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
        {/* TOP ROW */}
        <div className="flex justify-between items-center px-4 md:px-6 py-3 border-b border-gray-100">
          <div className="hidden md:flex  text-xs font-medium text-gray-600">
            <span className="border-r border-gray-300 pr-3">
              24/7 Customer Support
            </span>
            <span className="pl-3 hover:text-[#b07e1c] cursor-pointer">
              +1-844-527-4367
            </span>
          </div>
          {/* 1. Mobile Hamburger Button (Visible only on Mobile) */}
          <button
            className="md:hidden text-2xl p-1"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <CiMenuBurger />
          </button>

          {/* 2. Logo */}
          <Link
            href={`/`}
            className="text-xl md:text-2xl tracking-[0.2em] font-serif font-medium cursor-pointer uppercase"
          >
            Angara
          </Link>

          {/* 3. Actions (User, Cart, etc) */}
          <div className="flex items-center gap-3 md:gap-4 text-2xl text-gray-700">
            {/* Search hidden on small mobile, visible on larger */}
            <div className="hidden sm:block relative mr-2">
              <CiSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-lg text-gray-500" />
              <input
                className="border border-gray-200 pl-8 pr-2 py-1 text-sm rounded-sm focus:outline-none w-30 lg:w-45"
                placeholder="Search"
              />
            </div>

            <IconButton icon={<CiUser />} label="Account" />
            <IconButton icon={<CiHeart />} label="Wishlist" />
            <IconButton icon={<MdOutlineShoppingBag />} label="Cart" />
          </div>
        </div>

        {/* DESKTOP NAV (Hidden on Mobile) */}
        <nav className="hidden md:flex justify-center py-4 px-4">
          <ul className="flex gap-8 lg:gap-12 whitespace-nowrap">
            {NAV_LINKS.map((type) => (
              <NavLink key={type} href={`#${type}`}>
                {type}
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>

      {/* --- MOBILE DRAWER & BACKDROP --- */}
      <SlideBar
        isOpen={isMobileMenuOpen}
        onClose={handleClick}
        title="ANGARA"
        direction="left"
      >
        <nav className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <ul className="flex flex-col gap-6">
            <SearchBar />
            {NAV_LINKS.map((type) => (
              <li key={type}>
                <a
                  href={`#${type}`}
                  onClick={handleClick}
                  className="text-sm uppercase font-medium tracking-wider text-gray-800 hover:text-black block"
                >
                  {type}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SlideBar>

      {/* SPACER (Pushes content down) */}
      <div className="h-12 md:h-32.5 w-full" />
      <SearchBar />
    </>
  );
}

function SearchBar() {
  return (
    <div className="md:hidden relative w-[95%] mx-auto">
      <CiSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-lg text-black" />
      <input
        className="border border-gray-200 pl-8 pr-2 py-2 text-sm rounded-sm focus:outline-none w-full lg:w-45 placeholder:text-black"
        placeholder="Search"
      />
    </div>
  );
}

// --- Helper Components ---
const IconButton = ({ icon, label }) => (
  <button
    aria-label={label}
    className={`${label === "Account" && "md:block hidden"} hover:-translate-y-1 transition-transform p-1`}
  >
    {icon}
  </button>
);

const NavLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-xs uppercase font-medium tracking-wider text-gray-800 hover:text-black hover:underline underline-offset-8 transition-all"
    >
      {children}
    </a>
  </li>
);

export default Navbar;
