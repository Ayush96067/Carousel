import React from "react";
import Card from "./FigmaUI/Card";
import { PRODUCT_DATA } from "../../lib/figmaData";

function MainDisplay() {
  return (
    <div className="grid grid-cols-5 gap-x-10 gap-y-7">
      {PRODUCT_DATA.map((info) => (
        <Card key={info.id} item={info} />
      ))}
    </div>
  );
}

export default MainDisplay;
