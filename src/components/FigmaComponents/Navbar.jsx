import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";

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
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm transition-all duration-300">
        {/* TOP ROW */}
        <div className="flex justify-between items-center px-6 py-2 ">
          {/* Contact Info */}
          <div className="hidden md:flex text-xs font-medium text-gray-600">
            <span className="border-r border-gray-300 pr-3">
              24/7 Customer Support
            </span>
            <span className="pl-3">+1-844-527-4367</span>
          </div>

          {/* Logo */}
          <div className="text-2xl tracking-[0.3em] font-serif font-medium cursor-pointer uppercase">
            Angara
          </div>

          {/* Actions & Search */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <CiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-lg text-gray-500" />
              <input
                className="w-full border border-gray-200 pl-10 pr-4 py-1.5 text-sm rounded-sm placeholder:text-xs placeholder:uppercase focus:outline-none focus:border-gray-400 transition-colors"
                placeholder="Search"
                aria-label="Search"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 text-2xl text-gray-700">
              <IconButton icon={<CiUser />} label="Account" />
              <IconButton icon={<CiHeart />} label="Wishlist" />
              <IconButton icon={<MdOutlineShoppingBag />} label="Cart" />
            </div>
          </div>
        </div>

        {/* BOTTOM ROW (Links) */}
        <nav className="hidden md:flex justify-center py-4 px-4 overflow-x-auto">
          <ul className="flex gap-20 whitespace-nowrap ">
            {NAV_LINKS.map((type) => (
              <li key={type}>
                <a
                  href={`#${type}`}
                  className="text-xs uppercase font-medium tracking-wider text-gray-800 hover:text-black hover:underline underline-offset-8 transition-all"
                >
                  {type}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="h-25 w-full" />
    </>
  );
}

const IconButton = ({ icon, label }) => (
  <button
    aria-label={label}
    className="hover:-translate-y-0.5 transition-transform duration-200 p-1"
  >
    {icon}
  </button>
);

export default Navbar;
