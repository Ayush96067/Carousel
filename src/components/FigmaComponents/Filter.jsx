import { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import SlideBar from "./FigmaUI/SlideBar";
import Accordion from "./FigmaUI/Accordion";
import { Carousel } from "../Crousel";
import Card from "./FigmaUI/Card";
import { METAL_DATA, selectionCard, SHAPES_DATA } from "../../lib/figmaData";
import { ShapeCard } from "./FigmaUI/ShapeCard";
import styles from "../../Styles/FigmaStyles/Filter.module.css";
import RangeSlider from "./FigmaUI/RangeSlider";

function Filter() {
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState({
    initial: 0,
    final: 10,
  });
  const handleClick = () => setMobileFilterOpen((open) => !open);

  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const imageItemsCount = 4;
  const shapeItemsCount = isDesktop ? 2.5 : 3;
  return (
    <div className={styles.filterContainer}>
      <div className="flex flex-col gap-3">
        <button onClick={handleClick} className={styles.filterButton}>
          More Filters
          <VscSettings />
        </button>
        <p className="md:text-sm text-xs ">298 Results</p>
      </div>
      <div className="border p-1 lg:hidden">
        <VscSettings />
      </div>
      <div
        className={`focus:border-none focus:outline-amber-100 ${styles.sort_dropDown}`}
      >
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
        direction={isDesktop ? "left" : "bottom"}
        title="Filter"
      >
        <Accordion title={"Shop by Style"}>
          <div className="md:w-[90%] mx-auto ">
            <Carousel
              items={selectionCard}
              itemsCount={imageItemsCount}
              isPagerRequired={false}
              scrollButtonRequired={true}
              slideMove={4}
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
              slideMove={2}
              gapBetweenItems="6px"
            >
              <ShapeCard />
            </Carousel>
          </div>
        </Accordion>
        <Accordion title={"Shop by Metal"}>
          <div className="flex flex-wrap py-3 gap-x-4 gap-y-3 text-black">
            {METAL_DATA.map((item) => (
              <ShapeCard key={item.id} item={item} />
            ))}
          </div>
        </Accordion>
        <Accordion title={"Shop by Price Range"}>
          <RangeSlider
            min={156}
            max={5010}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </Accordion>
        <Accordion title={"Shop by Width"}>
          <div className="flex flex-col gap-2 ">
            <InputCheck name={"2mm"} label="Under 2mm" />
            <InputCheck name={"2-3mm"} label="2-3mm" />
            <InputCheck name={"over"} label="Over 3mm" />
          </div>
        </Accordion>
      </SlideBar>
    </div>
  );
}

function InputCheck({ name, label }) {
  return (
    <div className={styles.widthContainer}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="size-4 accent-black"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default Filter;
