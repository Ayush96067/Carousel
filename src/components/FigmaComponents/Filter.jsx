import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import SlideBar from "./FigmaUI/SlideBar";
import Accordion from "./FigmaUI/Accordion";
import { Carousel } from "../Crousel";
import Card from "./FigmaUI/Card";
import { METAL_DATA, selectionCard, SHAPES_DATA } from "../../lib/figmaData";
import { ShapeCard } from "./FigmaUI/ShapeCard";

function Filter() {
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const handleClick = () => setMobileFilterOpen((open) => !open);

  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const imageItemsCount = isDesktop ? 10 : isTablet ? 5 : 4;
  const shapeItemsCount = isDesktop ? 8 : isTablet ? 5 : 3;
  return (
    <div className="flex justify-between items-center px-6 py-7 ">
      <div className="flex flex-col gap-3">
        <button
          onClick={handleClick}
          className="bg-black fixed bottom-0 w-full left-0 md:static hover:bg-[#000000c4] cursor-pointer text-white py-2 px-3 flex justify-center items-center gap-2"
        >
          More Filters
          <VscSettings />
        </button>
        <p className="md:text-sm text-xs ">298 Results</p>
      </div>
      <div className="border p-1 lg:hidden">
        <VscSettings />
      </div>
      <div className="md:flex hidden  gap-4 justify-center items-center focus:border-none focus:outline-amber-100">
        <p className="text-gray-400"> Sort by :</p>
        <select name="cars" id="cars" className="cursor-pointer">
          <option value="bestSeller">Best Seller</option>
          <option value="price">Price</option>
          <option value="location">Location</option>
        </select>
      </div>
      <SlideBar
        isOpen={isMobileFilterOpen}
        onClose={handleClick}
        direction="bottom"
        title="Filter"
      >
        <Accordion title={"Shop by Style"}>
          <div className="md:w-[90%] mx-auto ">
            <Carousel
              items={selectionCard}
              itemsCount={imageItemsCount}
              isPagerRequired={false}
              scrollButtonRequired={true}
              slideMove={5}
            >
              <Card showDetails={false} />
            </Carousel>
          </div>
        </Accordion>
        <Accordion title={"Shop by Shape"}>
          <div className="w-[90%] mx-auto">
            <Carousel
              items={SHAPES_DATA}
              itemsCount={shapeItemsCount}
              isPagerRequired={false}
              scrollButtonRequired={true}
              slideMove={5}
              gapBetweenItems="10px"
            >
              <ShapeCard />
            </Carousel>
          </div>
        </Accordion>
        <Accordion title={"Shop by Metal"}>
          <div className="flex flex-wrap gap-x-4 gap-y-3 text-black">
            {METAL_DATA.map((item) => (
              <ShapeCard key={item.id} item={item} />
            ))}
          </div>
        </Accordion>
        <Accordion title={"Shop by Price Range"}></Accordion>
        <Accordion title={"Shop by Width"}></Accordion>
      </SlideBar>
    </div>
  );
}

export default Filter;
