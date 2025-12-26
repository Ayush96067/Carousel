import React from "react";
import Bar from "../FigmaUI/Bar";
import { CiSettings } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
import { GiDiamondRing } from "react-icons/gi";
import { LuArrowBigRight } from "react-icons/lu";
import { selectionCard } from "../../../lib/figmaData";
import { Carousel } from "../../Crousel";
import {
  TbSquareRoundedLetterCFilled,
  TbSquareRoundedLetterEFilled,
  TbSquareRoundedLetterHFilled,
  TbSquareRoundedLetterOFilled,
  TbSquareRoundedLetterPFilled,
  TbSquareRoundedLetterRFilled,
  TbSquareRoundedLetterSFilled,
} from "react-icons/tb";

const textSelection = [
  {
    id: 1,
    name: "Round",
    quantity: 299,
    icon: <TbSquareRoundedLetterRFilled />,
  },
  {
    id: 2,
    name: "Oval",
    quantity: 299,
    icon: <TbSquareRoundedLetterOFilled />,
  },
  {
    id: 3,
    name: "Pear",
    quantity: 283,
    icon: <TbSquareRoundedLetterPFilled />,
  },
  {
    id: 4,
    name: "Cushion",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
  {
    id: 5,
    name: "Heart",
    quantity: 236,
    icon: <TbSquareRoundedLetterHFilled />,
  },
  {
    id: 6,
    name: "Cushion Rectangular",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
  {
    id: 7,
    name: "Square",
    quantity: 236,
    icon: <TbSquareRoundedLetterSFilled />,
  },
  {
    id: 8,
    name: "Emerald Cut",
    quantity: 284,
    icon: <TbSquareRoundedLetterEFilled />,
  },
  {
    id: 9,
    name: "Pear",
    quantity: 283,
    icon: <TbSquareRoundedLetterPFilled />,
  },
  {
    id: 10,
    name: "Cushion",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
  {
    id: 11,
    name: "Round",
    quantity: 299,
    icon: <TbSquareRoundedLetterRFilled />,
  },
  {
    id: 12,
    name: "Oval",
    quantity: 299,
    icon: <TbSquareRoundedLetterOFilled />,
  },
  {
    id: 13,
    name: "Pear",
    quantity: 283,
    icon: <TbSquareRoundedLetterPFilled />,
  },
  {
    id: 14,
    name: "Cushion",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
  {
    id: 15,
    name: "Heart",
    quantity: 236,
    icon: <TbSquareRoundedLetterHFilled />,
  },
  {
    id: 16,
    name: "Cushion Rectangular",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
  {
    id: 17,
    name: "Square",
    quantity: 236,
    icon: <TbSquareRoundedLetterSFilled />,
  },
  {
    id: 18,
    name: "Emerald Cut",
    quantity: 284,
    icon: <TbSquareRoundedLetterEFilled />,
  },
  {
    id: 19,
    name: "Pear",
    quantity: 283,
    icon: <TbSquareRoundedLetterPFilled />,
  },
  {
    id: 20,
    name: "Cushion",
    quantity: 299,
    icon: <TbSquareRoundedLetterCFilled />,
  },
];

function SelectionBar() {
  return (
    <div className="pt-10 flex flex-col gap-10">
      {/* Choose setting */}
      <div className="grid grid-cols-3">
        <ChooseBar
          num={1}
          text={"Choose Setting"}
          icon={<CiSettings className="text-4xl" />}
        />
        <ChooseBar
          num={2}
          text={"Choose Diamond"}
          icon={<IoDiamondOutline className="text-4xl" />}
        />
        <ChooseBar
          num={3}
          text={"Complete Ring"}
          icon={<GiDiamondRing className="text-4xl" />}
        />
      </div>
      {/* Crousel Rings */}
      <Carousel
        items={selectionCard}
        itemsCount={10}
        isPagerRequired={false}
        scrollButtonRequired={true}
        slideMove={5}
        maxWidth={"90%"}
      >
        <Card />
      </Carousel>
      <Carousel
        items={textSelection}
        itemsCount={6}
        isPagerRequired={false}
        scrollButtonRequired={true}
        slideMove={5}
        maxWidth={"90%"}
        gapBetweenItems="10px"
      >
        <TypeCard />
      </Carousel>
      {/* Crousel text */}
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="flex group  flex-col items-center">
      <span className={`overflow-hidden`}>
        <img
          src={item.imageSrc}
          alt="Solitaire"
          className="group-hover:scale-[1.05] transition-all duration-500"
        />
      </span>
      <span>{item.Name}</span>
    </div>
  );
}

function TypeCard({ item }) {
  return (
    <div className="flex gap-2  hover:text-black transition-colors duration-200  text-[1rem] py-2 border-gray-200 text-[gray] justify-center items-center border">
      <span className="text-2xl"> {item.icon}</span>
      <p>{item.name}</p>
      <p>({item.quantity})</p>
    </div>
  );
}

function ChooseBar({ num, text, icon }) {
  return (
    <Bar
      align={"justify-between"}
      className={`relative border-y group ${num !== 2 && "border-x"} hover:bg-[#FBF4E6]  cursor-pointer hover:text-black  border-black text-[1.3rem] px-5 py-6 text-[#636363a6] uppercase font-medium`}
    >
      <span className="py-5  flex gap-4 items-center">
        <span className="w-10 group-hover:text-white group-hover:bg-black h-10 rounded-full flex justify-center items-center bg-[#8080801a]">
          {num}
        </span>
        {text}
      </span>
      {icon}
    </Bar>
  );
}

export default SelectionBar;
