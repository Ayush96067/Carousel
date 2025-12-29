import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white w-full rounded-lg  border-b border-gray-300 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      >
        <span className="font-medium text-gray-800">{title}</span>

        <span
          className={`text-xl text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown />
        </span>
      </button>

      <div
        className={`grid transition-all  duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden ">
          <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-transparent">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
