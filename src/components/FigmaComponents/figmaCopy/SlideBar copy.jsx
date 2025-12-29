import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
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
function SlideBar({ direction = "x" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <div
      //   className={`fixed top-0 left-0 h-full w-[80%] max-w-75 bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${
      //     isMobileMenuOpen ? `translate-x-0` : `-translate-x-full`
      //   }`}
      //   className={`fixed top-0 right-0 w-full h-[80%] bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${
      //     isMobileMenuOpen ? `translate-y-0` : `-translate-y-full`
      //   }`}
      //   className={`fixed bottom-0 left-0 w-full h-[80%]  bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${
      //     isMobileMenuOpen ? `translate-y-0` : `translate-y-full`
      //   }`}
      //   className={`fixed bottom-0 right-0 w-[80%] h-full bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${
      //     isMobileMenuOpen ? `translate-x-0` : `translate-x-full`
      //   }`}
      className={`fixed top-0 left-0 w-full h-[80%] bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? `translate-y-0` : `-translate-y-full`
      }`}
    >
      {/* Drawer Header (Close Button) */}
      <div className="flex justify-between items-center p-4">
        <Link
          className="text-xl list-none md:text-2xl tracking-[0.2em] font-serif font-medium cursor-pointer uppercase"
          href={"/"}
        >
          Angara
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl p-1"
        >
          <MdClose />
        </button>
      </div>

      {/* Drawer Links */}
      <ul className="flex flex-col gap-6">
        <input
          className="border border-gray-200 pl-8 pr-2 py-1 text-sm rounded-sm focus:outline-none w-full lg:w-45 placeholder:text-black "
          placeholder="Search"
        />
        {NAV_LINKS.map((type) => (
          <li key={type}>
            <a
              href={`#${type}`}
              onClick={handleLinkClick}
              className="text-sm uppercase font-medium tracking-wider text-gray-800 hover:text-black block"
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SlideBar;
