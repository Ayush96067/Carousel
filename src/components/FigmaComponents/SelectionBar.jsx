import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
import { GiDiamondRing } from "react-icons/gi";
import { Carousel } from "../Crousel"; // Ensure this path is correct
import { selectionCard, SHAPES_DATA, STEPS_DATA } from "../../lib/figmaData";
import Card from "./FigmaUI/Card";

function SelectionBar() {
  return (
    <div className="pt-10 flex flex-col gap-10">
      {/* 1. Steps Selection Bar */}
      <div className="grid grid-cols-3 border-b border-black">
        {STEPS_DATA.map((step, index) => (
          <StepCard key={step.id} step={step} isMiddle={index === 1} />
        ))}
      </div>

      {/* 2. Ring Styles Carousel */}
      <div className="w-[90%] mx-auto">
        <Carousel
          items={selectionCard}
          itemsCount={10}
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
          itemsCount={6}
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

// --- Reusable Components ---

const StepCard = ({ step, isMiddle }) => (
  <div
    className={`
      flex justify-between items-center px-5 py-8 
      text-[1.3rem] uppercase font-medium text-[#636363a6] border-t border-black
      cursor-pointer group hover:bg-[#FBF4E6] hover:text-black transition-colors
      ${!isMiddle ? "border-x" : ""} 
    `}
  >
    <div className="flex gap-4 items-center">
      <span className="w-10 h-10 rounded-full flex justify-center items-center bg-[#8080801a] group-hover:bg-black group-hover:text-white transition-colors">
        {step.id}
      </span>
      {step.text}
    </div>
    <step.icon className="text-4xl" />
  </div>
);

const ImageCard = ({ item }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="overflow-hidden">
      <img
        src={item.imageSrc}
        alt={item.Name}
        className="group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <span className="mt-2 text-sm font-medium">{item.Name}</span>
  </div>
);

const ShapeCard = ({ item }) => (
  <div className="flex gap-2 items-center justify-center py-2 border border-gray-200 text-gray-500 hover:text-black hover:border-black cursor-pointer transition-colors duration-200">
    <span className="text-2xl">
      <item.icon />
    </span>
    <p className="text-sm font-medium">{item.name}</p>
    <p className="text-xs">({item.quantity})</p>
  </div>
);

export default SelectionBar;
