import { COLOR_OPTIONS, METAL_OPTIONS } from "../../../lib/figmaData";
import styles from "../../../Styles/FigmaStyles/SelectionBar.module.css";

function Card({ item, showDetails = true }) {
  // Safe default if price is missing
  const formattedPrice = item.price ? `$${item.price}` : "N/A";

  return (
    <div
      className={`${styles.productCard_container} group ${showDetails && "hover:shadow-lg"} transition-shadow duration-300 `}
    >
      {/* 1. Image Area (Common for both Carousel and Grid) */}
      <div className={`${styles.imageArea}`}>
        <img
          src={item.imgSrc}
          alt={item.name}
          className="group-hover:scale-110 transition-transform duration-500 w-[80%]"
        />
      </div>

      {/* 2. Details Area (Conditional) */}
      {/* If showDetails is false, we just show the name (Like in Carousel) */}
      <div className={styles.detailsArea}>
        {showDetails && (
          <div className="flex flex-col gap-2 mb-1">
            {/* Metal Swatches */}
            <SwatchRow options={METAL_OPTIONS} type="text" />
            {/* Color Swatches */}
            <SwatchRow options={COLOR_OPTIONS} type="color" />
          </div>
        )}

        {/* Name */}
        <span className={`${styles.name} ${showDetails && "place-self-start"}`}>
          {item.name}
        </span>

        {/* Price (Only if details needed) */}
        {showDetails && <span className={styles.price}>{formattedPrice}</span>}
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
            ${isColor ? "w-4 h-4 rounded-full border border-gray-300" : "px-1.5 py-0.5 rounded text-[10px] border border-gray-400"}
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
