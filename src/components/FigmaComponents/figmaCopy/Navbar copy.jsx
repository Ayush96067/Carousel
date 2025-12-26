import Bar from "../FigmaUI/Bar";
import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";

const types = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Engagment Rings",
  "Wedding Rings",
  "Bracelets",
  "Collections",
  "Gifts",
  "The edit",
];

function Navbar() {
  return (
    <div className="mb-5 z-10">
      <div>
        <Bar align="justify-between">
          <div className="text-sm font-medium ">
            <span className="border-r pr-3"> 24/7 Customer Support</span>
            <span className="pl-3">+1-844-527-4367</span>
          </div>
          <div className="tracking-[7.8px] text-[1.7rem] cursor-pointer">
            ANGARA
          </div>
          <div className="flex items-center justify-center gap-5">
            <span className="relative">
              <CiSearch className="absolute top-[50%] translate-y-[-50%] left-2 text-xl" />
              <input
                className="border border-[#8080803b] px-8 py-1 font-medium capitalize placeholder:text-black placeholder:text-sm placeholder:uppercase focus:outline-none focus:border-[#8080809d]"
                placeholder="Search"
              />
            </span>
            <span className="flex text-2xl gap-4 *:cursor-pointer *:hover:-translate-y-1 *:transition-transform *:duration-200">
              <CiUser />
              <CiHeart />
              <MdOutlineShoppingBag />
            </span>
          </div>
        </Bar>
        <Bar align="justify-around" className={"mt-10 px-9"}>
          {types.map((type) => (
            <button className="uppercase font-medium hover:text-gray-600 hover:underline underline-offset-8 cursor-pointer">
              {type}
            </button>
          ))}
        </Bar>
      </div>
    </div>
  );
}

export default Navbar;
