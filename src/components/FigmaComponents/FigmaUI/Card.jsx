import { COLOR_OPTIONS, METAL_OPTIONS } from "../../../lib/figmaData";

function Card({ item, showDetails = true }) {
  // Safe default if price is missing
  const formattedPrice = item.price ? `$${item.price}` : "N/A";

  return (
    <div className="flex flex-col items-center group text-start w-full py-4 px-2 hover:shadow-lg rounded-md transition-shadow duration-300">
      {/* 1. Image Area (Common for both Carousel and Grid) */}
      <div className="overflow-hidden w-[80%] aspect-square flex items-center justify-center mb-4">
        <img
          src={item.imgSrc}
          alt={item.name}
          className="group-hover:scale-110 object-contain w-full h-full transition-transform duration-500"
        />
      </div>

      {/* 2. Details Area (Conditional) */}
      {/* If showDetails is false, we just show the name (Like in Carousel) */}
      <div className="flex flex-col gap-2 items-center text-center w-full">
        {showDetails && (
          <div className="flex flex-col gap-2 mb-1">
            {/* Metal Swatches */}
            <SwatchRow options={METAL_OPTIONS} type="text" />
            {/* Color Swatches */}
            <SwatchRow options={COLOR_OPTIONS} type="color" />
          </div>
        )}

        {/* Name */}
        <p
          className={`text-gray-400 text-sm ${showDetails && "place-self-start"}  text-start font-medium line-clamp-2 min-h-[2.5em] leading-tight`}
        >
          {item.name}
        </p>

        {/* Price (Only if details needed) */}
        {showDetails && (
          <p className="text-gray-900 place-self-start font-medium text-sm mt-1">
            {formattedPrice}
          </p>
        )}
      </div>
    </div>
  );
}

// --- Helper Component: Swatch Row ---
// Replaces the repetitive <button> code
const SwatchRow = ({ options, type }) => (
  <div className="flex gap-2 justify-center">
    {options.map((opt, index) => {
      const isColor = type === "color";
      const label = isColor ? "" : opt;
      const bgClass = isColor ? opt.color : "bg-transparent";

      return (
        <button
          key={index}
          className={`
            ${isColor ? "w-4 h-4  rounded-full border border-gray-300" : "px-1.5 py-0.5 rounded text-[10px] border border-gray-400"}
            ${bgClass}
            hover:border-black hover:scale-110 transition-all duration-200
            flex items-center justify-center cursor-pointer
          `}
          title={isColor ? opt.label : opt}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export default Card;
