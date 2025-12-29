import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
import { GiDiamondRing } from "react-icons/gi";
import { Carousel } from "../Crousel"; // Ensure this path is correct
import { selectionCard, SHAPES_DATA, STEPS_DATA } from "../../lib/figmaData";
import Card from "./FigmaUI/Card";
import { StepCard } from "./FigmaUI/StepCard";
import { ShapeCard } from "./FigmaUI/ShapeCard";

function SelectionBar() {
  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const imageItemsCount = isDesktop ? 10 : isTablet ? 5 : 4;
  const shapeItemsCount = isDesktop ? 8 : isTablet ? 5 : 3;
  return (
    <div className="pt-10 flex flex-col md:gap-10 gap-1">
      {/* 1. Steps Selection Bar */}
      <div className="grid grid-cols-3 border-b border-black">
        {STEPS_DATA.map((step, index) => (
          <StepCard key={step.id} step={step} isMiddle={index === 1} />
        ))}
      </div>

      {/* 2. Ring Styles Carousel */}
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

      {/* 3. Diamond Shapes Carousel */}
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
    </div>
  );
}

export default SelectionBar;
