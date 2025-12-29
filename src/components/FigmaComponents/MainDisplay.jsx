import React from "react";
import Card from "./FigmaUI/Card";
import { PRODUCT_DATA } from "../../lib/figmaData";

function MainDisplay() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-7 mb-5">
      {PRODUCT_DATA.map((info) => (
        <Card key={info.id} item={info} />
      ))}
    </div>
  );
}

export default MainDisplay;
