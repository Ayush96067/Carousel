import React, { useState } from "react";
import styles from "../../../Styles/FigmaStyles/Filter.module.css";

const SimpleRangeSlider = ({ min = 0, max = 1000 }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  // Calculate percentage for the visual track background
  const minPercent = Math.round(((minVal - min) / (max - min)) * 100);
  const maxPercent = Math.round(((maxVal - min) / (max - min)) * 100);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <div className="flex_center flex-col gap-4 py-2">
      <div className="relative w-full max-w-full h-2">
        {/* Background track */}
        <div className={`${styles.range_background_track}`}>
          <div
            className="absolute h-full bg-black rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className={styles.range_input}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className={styles.range_input}
        />
      </div>
      <div className="flex_between w-full">
        <span className={styles.range_value}>${minVal}</span>

        {/* Max Text */}
        <span className={styles.range_value}>${maxVal}</span>
      </div>

      {/* Minimal CSS needed to make handles clickable */}
    </div>
  );
};

export default SimpleRangeSlider;
