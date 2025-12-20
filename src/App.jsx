// import { products, news, HeroBanner } from "./lib/data";
// import { Crousel } from "./components/Crousel";
// import { Card } from "./components/Card";
import { HeroImage } from "./components/HeroImage";
import { HeroBanner, products } from "./../../../crousel/src/lib/data";
import { BrowserRouter } from "react-router-dom";
import { Card2 } from "./components/Card2";
import { Crousel } from "../../../crousel/src/components/Crousel";

function App() {
  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const itemsCount = isDesktop ? 5 : isTablet ? 2 : 1;

  return (
    <div className="container">
      <Crousel
        items={HeroBanner}
        itemsCount={1}
        slideMove={1}
        maxWidth={"100vw"}
        scrollButtonRequired={false}
      >
        <HeroImage />
      </Crousel>
      <BrowserRouter>
        <Crousel
          items={products}
          productCard={true}
          itemsCount={itemsCount}
          slideMove={itemsCount}
          maxWidth={"85vw"}
          scrollButtonRequired={true}
        >
          <Card2 />
        </Crousel>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Rest code

// <div style={{ padding: "50px" }}>
//   <Crousel
//     items={products}
//     productCard={true}
//     itemsCount={itemsCount}
//     slideMove={itemsCount}
//   >
//     <Card />
//   </Crousel>
//   {/* <Crousel items={news} productCard={false} itemsCount={4} slideMove={1}>
//     <Card />
//   </Crousel> */}
// </div>

{
  /* <div>
  <Crousel
    items={HeroBanner}
    itemsCount={1}
    slideMove={1}
    maxWidth={"100vw"}
    scrollButtonRequired={false}
  >
    <HeroImage />
  </Crousel>
  <Crousel
    items={products}
    productCard={true}
    itemsCount={4}
    slideMove={4}
    maxWidth={"90vw"}
  >
    <Card />
  </Crousel>
</div> */
}
