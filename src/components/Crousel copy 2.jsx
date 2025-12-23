import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Styles/carousel.module.css";

export function Carousel({
  children,
  items = [],
  itemsCount = 1,
  slideMove = 1,
  maxWidth = "100vw",
  scrollButtonRequired = false,
  gapBetweenItems = "16px",
  // PagerComponent = DefaultPagerComponent,
  afterSlideCb,
  beforeSlideCb,
  isPagerRequired = true,
}) {
  // Reference of the current element
  const trackRef = useRef(null);
  // Ref to check if its the first render or not
  const isFirstRender = useRef(true);
  // Target last Carousel_item after scroll
  const targetSlideRef = useRef(null);

  // States to check if we can scroll left or right
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Set current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // Used in debounce effect for Carousel
  const [isProcessing, setIsProcessing] = useState(false);

  // If no items return
  if (items.length === 0) return <p>No products</p>;

  // --- 1. CORE CALCULATION LOGIC (No State Updates yet) ---
  const calculateScrollState = () => {
    if (!trackRef.current) return null;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

    const itemWidth = clientWidth / itemsCount;

    // First item index in current Carousel
    const newIndex = Math.round(scrollLeft / itemWidth);

    return {
      left: scrollLeft > 0,
      right: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1,
      index: newIndex,
    };
  };

  // --- DEBOUNCED CHECKER (Prevents flood of calls) --- ensures only update when scrolling STOPS for 100ms
  const handleScroll = useCallback(() => {
    // Clear previous timers to prevent "Ghost" Updates
    if (trackRef.current.scrollTimer) {
      clearTimeout(trackRef.current.scrollTimer);
    }

    // DEBOUNCE SCROLL
    trackRef.current.scrollTimer = setTimeout(() => {
      const result = calculateScrollState();
      if (result) {
        setCanScrollLeft(result.left);
        setCanScrollRight(result.right);
        setCurrentSlide((prev) =>
          prev !== result.index ? result.index : prev
        );
      }
    }, 100);
  }, [itemsCount]);

  // --- SCROLL TO function ---
  const scroll_To = async (indexOrDirection, e) => {
    // Disables built in behaviour to run custom logic
    if (e) e.preventDefault();

    // Prevent "Button Spamming",Handle "Wait time(Async Callbacks)",
    if (isProcessing) return;

    const track = trackRef.current;
    if (!track) return;

    setIsProcessing(true);

    try {
      if (beforeSlideCb) {
        await beforeSlideCb(currentSlide, items[currentSlide]);
      }

      const itemWidth = track.clientWidth / itemsCount;
      // Check if index
      const isIndex = typeof indexOrDirection === "number";

      // Calculate the maximum physical scroll position
      const maxScrollLeft = track.scrollWidth - track.clientWidth;

      // Convert that position into an Index
      const maxIndex = Math.round(maxScrollLeft / itemWidth);

      let targetIndex;
      if (isIndex) {
        targetIndex = indexOrDirection;
      } else {
        // If indexOrDirection === direction -> Calculate Index of Last Element in the Carousel
        const direction = indexOrDirection === "left" ? -1 : 1;
        // Index of First Item in Scroll
        const currentScrollIndex = Math.round(track.scrollLeft / itemWidth);
        targetIndex = currentScrollIndex + slideMove * direction;

        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex > maxIndex) targetIndex = maxIndex;
      }

      targetSlideRef.current = targetIndex;

      const method = isIndex ? "scrollTo" : "scrollBy";

      const amount = isIndex
        ? targetIndex * itemWidth
        : itemWidth * slideMove * (indexOrDirection === "left" ? -1 : 1);

      track[method]({ left: amount, behavior: "smooth" });

      if (currentSlide === targetIndex) {
        setTimeout(() => setIsProcessing(false), 500);
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  // ---- AFTER SLIDE LOGIC ----
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isProcessing) return;

    if (
      targetSlideRef.current !== null &&
      currentSlide !== targetSlideRef.current
    ) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (afterSlideCb) {
          console.log("✅ Reached Target. Running Callback...");
          afterSlideCb(currentSlide, items[currentSlide]);
        }
      } finally {
        setIsProcessing(false);
        targetSlideRef.current = null;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const initialData = calculateScrollState();

    if (initialData) {
      setCanScrollLeft(initialData.left);
      setCanScrollRight(initialData.right);
      setCurrentSlide(initialData.index);
    }

    const track = trackRef.current;
    if (track) {
      track.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (track) {
        track.removeEventListener("scroll", handleScroll);
        if (track.scrollTimer) clearTimeout(track.scrollTimer);
      }
    };
  }, [handleScroll]);

  const pagerArr = Array.from({ length: items.length - itemsCount + 1 });

  return (
    <div
      id={"carousel"}
      className={styles.carousel_container}
      style={{ maxWidth: maxWidth }}
    >
      {items.length > 1 ? (
        <>
          {scrollButtonRequired && canScrollLeft && (
            <ScrollButton
              scroll={scroll_To}
              direction={"left"}
              disabled={isProcessing}
            />
          )}
          <ul
            className={styles.carousel_track}
            ref={trackRef}
            style={{
              "--item-count": itemsCount,
              "--gap-between-elements": gapBetweenItems,
              listStyle: "none",
            }}
          >
            {items?.map((item) => (
              <li
                className={styles.carousel_item}
                key={item.id}
                style={{ scrollSnapAlign: itemsCount > 1 ? "start" : "center" }}
              >
                {children && React.cloneElement(children, { item })}
              </li>
            ))}
          </ul>
          {scrollButtonRequired && canScrollRight && (
            <ScrollButton
              scroll={scroll_To}
              direction={"right"}
              disabled={isProcessing}
            />
          )}
          {isPagerRequired && (
            <div id="pager_id" className={styles.carousel_pager}>
              {pagerArr.map((_, index) => (
                <DefaultPagerComponent
                  key={index}
                  scroll_To={scroll_To}
                  index={index}
                  currentSlide={currentSlide}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div
          className={styles.carousel_item}
          style={{
            "--item-count": itemsCount,
            listStyle: "none",
          }}
        >
          {children && React.cloneElement(children, { item: items[0] })}
        </div>
      )}
    </div>
  );
}

function ScrollButton({ scroll, direction, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.carousel_btn} ${
        direction === "right"
          ? styles.carousel_btn_right
          : styles.carousel_btn_left
      }`}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "wait" : "pointer",
      }}
      onClick={(e) => scroll(direction, e)}
      aria-label="Scroll Button"
    >
      {direction === "right" ? <>&#8250;</> : <>&#8249;</>}
    </button>
  );
}

const DefaultPagerComponent = ({ scroll_To, index, currentSlide }) => {
  return (
    <button
      onClick={(e) => scroll_To(index, e)}
      className={`${styles.pager_dot} ${
        currentSlide === index ? styles.active : ""
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  );
};

// console.log("Amount : ", amount, " Item Width : ", itemWidth);
// console.log(
//   "Total slide move : ",
//   maxIndex - (currentSlide + slideMove - 1)
// );

// console.log("Slides to move : ", totalSlideMove);
