import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Styles/carousel.module.css";

export function Crousel({
  children,
  items = [],
  itemsCount = 1,
  slideMove = 2,
  maxWidth = "100vw",
  scrollButtonRequired = false,
  gapBetweenItems = "16px",
  PagerComponent = DefaultPagerComponent,
  afterSlideCb,
  beforeSlideCb,
}) {
  const trackRef = useRef(null);
  const isFirstRender = useRef(true);
  const targetSlideRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // Start at 0 usually
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) return <p>No products</p>;

  // --- 1. CORE CALCULATION LOGIC (No State Updates yet) ---
  const calculateScrollState = () => {
    if (!trackRef.current) return null;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

    const totalItemWidth = clientWidth / itemsCount;
    const newIndex = Math.floor(scrollLeft / totalItemWidth);

    return {
      left: scrollLeft > 0,
      right: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1,
      index: newIndex,
    };
  };

  // --- DEBOUNCED CHECKER (Prevents flood of calls) --- ensures only update when scrolling STOPS for 100ms
  const handleScroll = useCallback(() => {
    if (trackRef.current.scrollTimer) {
      clearTimeout(trackRef.current.scrollTimer);
    }

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

  // --- SCROLL TO FUNCTION ---
  const scroll_To = async (indexOrDirection, e) => {
    if (e) e.preventDefault();
    if (isProcessing) return;

    const track = trackRef.current;
    if (!track) return;

    setIsProcessing(true);

    try {
      if (beforeSlideCb) {
        await beforeSlideCb(currentSlide, items[currentSlide]);
      }

      const itemWidth = track.clientWidth / itemsCount;
      const isIndex = typeof indexOrDirection === "number";
      let targetIndex;

      if (isIndex) {
        targetIndex = indexOrDirection;
      } else {
        const direction = indexOrDirection === "left" ? -1 : 1;
        const currentScrollIndex = Math.round(track.scrollLeft / itemWidth);
        targetIndex = currentScrollIndex + slideMove * direction;

        const maxIndex = Math.ceil(track.scrollWidth / itemWidth) - 1;
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

    // const timer = setTimeout(async () => {
    try {
      if (afterSlideCb) {
        console.log("✅ Reached Target. Running Callback...");
        afterSlideCb(currentSlide, items[currentSlide]);
      }
    } finally {
      setIsProcessing(false);
      targetSlideRef.current = null;
    }
    // }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide, isProcessing]);

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
          <div id="pager_id" className={styles.crousel_pager}>
            {items.map((item, index) => (
              <PagerComponent
                key={index}
                scroll_To={scroll_To}
                index={index}
                currentSlide={currentSlide}
                item={item}
              />
            ))}
          </div>
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
