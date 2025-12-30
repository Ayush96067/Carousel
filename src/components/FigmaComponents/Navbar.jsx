import React, { useState } from "react";
import { CiHeart, CiSearch, CiUser, CiMenuBurger } from "react-icons/ci";
import { MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import SlideBar from "./FigmaUI/SlideBar";
import styles from "../../Styles/FigmaStyles/Navbar.module.css";

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
      <header className={styles.navContainer}>
        {/* TOP ROW */}
        <div className={styles.navUpperBar}>
          <div className={styles.navContactInfo}>
            <span>24/7 Customer Support</span>
            <span>+1-844-527-4367</span>
          </div>
          {/* 1. Mobile Hamburger Button (Visible only on Mobile) */}
          <button
            className={"md:hidden text-2xl p-1"}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <CiMenuBurger />
          </button>

          {/* 2. Logo */}
          <Link href={`/`} className="logo">
            Angara
          </Link>

          {/* 3. Actions (User, Cart, etc) */}
          <div className={styles.navSearchIcons}>
            {/* Search hidden on small mobile, visible on larger */}
            <div className={`hidden sm:block mr-2 ${styles.search_bar}`}>
              <CiSearch className="-translate-y-1/2" />
              <input
                className="focus:outline-none w-30 lg:w-45 placeholder:text-black"
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
                  className={`${styles.nav_link}`}
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
    <div className={`md:hidden w-[95%] mx-auto ${styles.search_bar}`}>
      <CiSearch className="-translate-y-1/2" />
      <input
        className="focus:outline-none w-full lg:w-45 placeholder:text-black"
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
      className={`${styles.nav_link} hover:text-black hover:underline `}
    >
      {children}
    </a>
  </li>
);

export default Navbar;
