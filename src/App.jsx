// import { products, news, HeroBanner } from "./lib/data";
// import { Crousel } from "./components/Crousel";
// import { Card } from "./components/Card";
import { HeroImage } from "./components/HeroImage";
import { HeroBanner, image_track, products } from "./lib/data";
import { BrowserRouter } from "react-router-dom";
import { Card2 } from "./components/Card2";
import { Crousel } from "./components/Crousel";
import ImageTracking from "./components/ImageTracking";

function ImageTrackingPager({ scroll_To, index, currentSlide, item }) {
  return (
    <div className={"image_tracker_container"}>
      <img
        src={`${item}`}
        alt="Product image"
        key={index}
        onClick={(e) => scroll_To(index, e)}
        className={`${"image_tracker"} ${
          currentSlide === index ? "active_tracker" : ""
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    </div>
  );
}

function App() {
  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const itemsCount = isDesktop ? 5 : isTablet ? 2 : 1;

  return (
    <div className="container">
      <BrowserRouter>
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
          itemsCount={itemsCount}
          slideMove={itemsCount}
          maxWidth={"85vw"}
          scrollButtonRequired={true}
        >
          <Card2 />
        </Crousel>
        <Crousel
          items={image_track}
          itemsCount={itemsCount}
          maxWidth={"90vw"}
          scrollButtonRequired={true}
          PagerComponent={ImageTrackingPager}
        >
          <ImageTracking />
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
