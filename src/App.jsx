import { BrowserRouter } from "react-router-dom";
import Filter from "./components/FigmaComponents/Filter";
import MainDisplay from "./components/FigmaComponents/MainDisplay";
import Navbar from "./components/FigmaComponents/Navbar";
import SelectionBar from "./components/FigmaComponents/SelectionBar";
import SlideBar from "./components/FigmaComponents/FigmaUI/SlideBar";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdClose } from "react-icons/md";
const card = [
  `
  Solitaire
Three Stone
Accents
Halo
Nature Inspired
Yellow Gold
White Gold
Bridal Sets
Round`,
];

function App() {
  return (
    <div className="md:px-10 py-5">
      <BrowserRouter>
        <Navbar />
        <SelectionBar />
        <Filter />
        <MainDisplay />
      </BrowserRouter>
    </div>
  );
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white w-full rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
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
          {/* You can swap icons if you prefer, but rotating ArrowDown is smoother UI */}
          <IoIosArrowDown />
        </span>
      </button>

      {/* THE MAGIC FIX: 
         1. grid: enables grid layout
         2. grid-rows-[0fr] vs [1fr]: animates the height from 0 to auto
         3. transition-all: makes it smooth
      */}
      <div
        className={`grid transition-all  duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* Inner container must have overflow-hidden (and min-h-0) for the trick to work */}
        <div className="overflow-hidden ">
          {/* Padding is applied HERE, inside the transition wrapper, to prevent jumping */}
          {/* <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-transparent">
            {children}
          </div> */}
          <div className="p-4 pt-0  text-gray-600 text-sm leading-relaxed border-t border-transparent"></div>
        </div>
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className="px-10 py-5">
//       <Navbar />
//       <SelectionBar />
//       <Filter />
//       <MainDisplay />
//     </div>
//   );
// }

export default App;
