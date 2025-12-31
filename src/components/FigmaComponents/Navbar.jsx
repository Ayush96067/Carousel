import React, { useState } from "react";
import { CiHeart, CiSearch, CiUser, CiMenuBurger } from "react-icons/ci";
import { MdOutlineShoppingBag, MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import SlideBar from "./FigmaUI/SlideBar";
import styles from "../../Styles/FigmaStyles/Navbar.module.css";
import { MENU_DATA } from "../../lib/figmaData";

const NAV_LINKS = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Engagement Rings",
  "Wedding Rings",
  "Bracelets",
  "Collections",
  "Gifts",
  "Edit",
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // Helper to close menu when a link is clicked
  const handleClick = () => setIsMobileMenuOpen((open) => !open);

  // console.log();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/10 backdrop-blur-sm z-40 ${activeMenu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />
      <header
        className={styles.navContainer}
        onMouseLeave={() => setActiveMenu(null)}
      >
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
              <NavLink
                href={`#${type}`}
                className={`${styles.nav_link} hover:text-black hover:underline `}
                onMouseEnter={() => setActiveMenu(type)}
              >
                {type}
              </NavLink>
            ))}
          </ul>
        </nav>
        <div
          className={`absolute left-0 w-full top-full bg-white border-t border-gray-100 shadow-xl overflow-hidden origin-top ${activeMenu ? "max-h-140 opacity-100 visible" : "max-h-0 opacity-0 invisible"} `}
        >
          {activeMenu && MENU_DATA[activeMenu] && (
            <MenuBar menu={MENU_DATA[activeMenu]} />
          )}
        </div>
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

function MenuBar({ menu }) {
  if (!menu) return null;

  return (
    <div className="w-full flex justify-center  bg-white border-t border-gray-100">
      <div className="w-full mx-auto px-10  py-10  xl:columns-5 gap-x-10 gap-y-10 space-y-52">
        {menu.map((item, index) => (
          <div
            key={index}
            className="break-inside-avoid self-center inline-block w-full mb-10"
          >
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider mb-3 text-gray-900 border-b border-gray-100 pb-2">
              {item.title}
            </h3>

            <ul className="flex flex-col gap-5">
              {item.list.map((listItem, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {listItem}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div
          key={index}
          className="break-inside-avoid self-center inline-block w-full mb-10"
        >
          <h3 className="font-serif font-bold text-sm uppercase tracking-wider mb-3 text-gray-900 border-b border-gray-100 pb-2">
            {item.title}
          </h3>

          <ul className="flex flex-col gap-5">
            {item.list.map((listItem, i) => (
              <li
                key={i}
                className="text-sm text-gray-500 hover:text-black hover:underline underline-offset-4 cursor-pointer transition-colors"
              >
                {listItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-60 border h-60">
          <img src="./FigmaImage/img1.png" alt="Ring" />
        </div>
      </div>
    </div>
  );
}

// function MenuBar({ menu }) {
//   if (!menu) return null;

//   return (
//     <div className="w-full px-10 py-8 bg-white columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-8">
//       {menu.map((item, index) => (
//         <div
//           key={index}
//           className="break-inside-avoid mb-8 inline-block w-full"
//         >
//           <h3 className="font-serif font-bold text-sm uppercase tracking-wider mb-3 text-gray-900 border-b border-gray-100 pb-1">
//             {item.title}
//           </h3>

//           <ul className="flex flex-col gap-2">
//             {item.list.map((listItem, i) => (
//               <li
//                 key={i}
//                 className="text-sm text-gray-500 hover:text-black hover:underline cursor-pointer transition-colors"
//               >
//                 {listItem}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

export default Navbar;
