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

  /*
  <Crousel
    items={itemsObject = []}
    itemsCount={no. of items to show on screen = 1}
    slideMove={no. of items to slide on screen = 1}
    maxWidth={max width hold by the crousel = 1200px}
    scrollButtonRequired={show scroll button or not = false}
    gapBetweenItems={gap between crousel items = 16px}
    PagerComponent={Pager component = <DefaultPagerComponent />(defined in Crousel.jsx file)}
    *setActiveSlide={}
    *afterSlideCallback={}
    *beforeSlideCallback={}
    *activeSlide={}
  >
  </Crousel>
*/
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
          gapBetweenItems={"1rem"}
          maxWidth={"85vw"}
          scrollButtonRequired={true}
        >
          <Card2 />
        </Crousel>
        <Crousel
          items={image_track}
          itemsCount={2}
          slideMove={1}
          maxWidth={"90vw"}
          gapBetweenItems={"0rem"}
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
