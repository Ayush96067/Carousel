import { VscSettings } from "react-icons/vsc";

function Filter() {
  return (
    <div className="flex justify-between items-center px-6 py-7 ">
      <div className="flex flex-col gap-3">
        <button className="bg-black hover:bg-[#000000c4] cursor-pointer text-white py-2 px-3 flex justify-center items-center gap-2">
          More Filters
          <VscSettings />
        </button>
        <p className="text-sm">298 Results</p>
      </div>
      <div className="flex gap-4 justify-center items-center focus:border-none focus:outline-amber-100">
        <p className="text-gray-400"> Sort by :</p>
        <select name="cars" id="cars" className="cursor-pointer">
          <option value="bestSeller">Best Seller</option>
          <option value="price">Price</option>
          <option value="location">Location</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
