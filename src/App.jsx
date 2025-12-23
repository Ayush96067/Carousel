// import { products, news, HeroBanner } from "./lib/data";
// import { Crousel } from "./components/Crousel";
// import { Card } from "./components/Card";
import { HeroImage } from "./components/HeroImage";
import { HeroBanner, image_track, products } from "./lib/data";
import { BrowserRouter } from "react-router-dom";
import { Card2 } from "./components/Card2";
import { Carousel } from "./components/Crousel";
import { ImageTracking, ImageTrackingPager } from "./components/ImageTracking";

// function ImageTrackingPager({ scroll_To, index, currentSlide, item }) {
//   return (
//     <div className={"image_tracker_container"}>
//       <img
//         src={`${item}`}
//         alt="Product image"
//         key={index}
//         onClick={(e) => scroll_To(index, e)}
//         className={`${"image_tracker"} ${
//           currentSlide === index ? "active_tracker" : ""
//         }`}
//         aria-label={`Go to slide ${index + 1}`}
//       />
//     </div>
//   );
// }

function App() {
  const isMobile = window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 1300;
  const isTablet = !isMobile && !isDesktop;

  const itemsCount = isDesktop ? 5 : isTablet ? 2 : 1;

  /*
  <Carousel
    items={itemsObject = []}
    itemsCount={no. of items to show on screen = 1}
    slideMove={no. of items to slide on screen (slideMove <= itemsCount) {Default = 1}}
    maxWidth={max width hold by the Carousel = 1200px}
    scrollButtonRequired={show scroll button or not = false}
    gapBetweenItems={gap between Carousel items = 16px}
    PagerComponent={Pager component = <DefaultPagerComponent />(defined in Carousel.jsx file)}
    *setActiveSlide={}
    *afterSlideCallback={}
    *beforeSlideCallback={}
    *activeSlide={}
    isPagerRequired={default = true}
  >
  </Carousel>
*/

  const beforeSlideTask = (message) => {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(message);
        res();
      }, 3000);
    });
  };

  const getCurrentItem = (currSlide, currItem) => {
    console.log(
      `=====> Called before sliding => Current item has index ${currSlide} and current Item is : `,
      currItem
    );
  };

  const afterSlideCB = (currSlide) => {
    console.log(
      `<===== Called after sliding  => Current item has index ${currSlide} and current Item is : `
    );
  };

  return (
    <div className="container">
      <BrowserRouter>
        {/* <Carousel
          items={HeroBanner}
          itemsCount={1}
          slideMove={1}
          maxWidth={"100vw"}
          scrollButtonRequired={false}
        >
          <HeroImage />
        </Carousel>
        <Carousel
          items={products}
          productCard={true}
          itemsCount={itemsCount}
          slideMove={5}
          gapBetweenItems={"1rem"}
          maxWidth={"85vw"}
          scrollButtonRequired={true}
          // isPagerRequired={}
          // beforeSlideCb={async (i) => {
          //   await beforeSlideTask(`Checking database for slide ${i}`);
          // }}

          beforeSlideCb={getCurrentItem}
          // afterSlideCb={afterSlideCB}
        >
          <Card2 />
        </Carousel> */}
        <Carousel
          items={image_track}
          // itemsCount={1}
          // slideMove={1}
          maxWidth={"90vw"}
          gapBetweenItems={"10px"}
          scrollButtonRequired={true}
          activeSlide={5}
        >
          <ImageTracking />
        </Carousel>
        {/* <Carousel
          items={image_track}
          itemsCount={25}
          slideMove={5}
          maxWidth={"90vw"}
          scrollButtonRequired={true}
          // isPagerRequired={false}
        >
          <ImageTrackingPager />
        </Carousel> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
