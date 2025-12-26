import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Styles/carousel.module.css";

export function Carousel({
  children,
  items = [],
  itemsCount = 1,
  slideMove = 1,
  maxWidth = "100vw",
  scrollButtonRequired = true,
  gapBetweenItems = "16px",
  afterSlideCb,
  beforeSlideCb,
  isPagerRequired = true,
  activeSlide = null,
  setActiveSlide,
}) {
  const trackRef = useRef(null);

  // Ref to track mount status
  const isMounting = useRef(true);
  const targetSlideRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    left: false,
    right: false,
    index: activeSlide ?? 0,
  });

  if (!items.length) return <p>No products</p>;

  // --- Core Calculation Logic ---
  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const itemWidth = clientWidth / itemsCount;

    setScrollState((prev) => {
      const calculatedIndex = Math.round(scrollLeft / itemWidth);

      const next = {
        left: scrollLeft > 0,
        right: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1,
        index: calculatedIndex,
      };

      // --- FIX: BUTTONS VS INDEX CONFLICT ---
      // On mount, if we have an activeSlide (e.g., 5), but the DOM is still at 0,
      // the calculatedIndex will be 0. We must NOT let this overwrite our state.
      // However, we MUST allow 'left'/'right' to update so the buttons appear.
      if (
        isMounting.current &&
        activeSlide !== null &&
        activeSlide > 0 &&
        calculatedIndex === 0
      ) {
        next.index = prev.index; // Keep the '5' from props, ignore the '0' from DOM
      }

      // Only update if something changed
      return prev.left === next.left &&
        prev.right === next.right &&
        prev.index === next.index
        ? prev
        : next;
    });
  }, [itemsCount, activeSlide]);

  // --- Debounced Scroll Listener ---
  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(trackRef.current.scrollTimer);
      trackRef.current.scrollTimer = setTimeout(checkScroll, 100);
    };

    const track = trackRef.current;
    if (track) {
      // Run once immediately to show buttons
      checkScroll();
      track.addEventListener("scroll", handleScroll);
    }

    return () => {
      track?.removeEventListener("scroll", handleScroll);
      clearTimeout(track?.scrollTimer);
    };
  }, [checkScroll]);

  // --- Active Slide & First Mount Handling ---
  useEffect(() => {
    if (activeSlide !== null) {
      scroll_To(activeSlide);
    }

    // Mark mount as complete after a short delay to ensure initial scroll happened
    const timer = setTimeout(() => {
      isMounting.current = false;
    }, 500);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  // --- Sync Internal Scroll -> Parent State ---
  useEffect(() => {
    // Only update parent if we are not mounting (avoids the initial '0' sync)
    if (
      !isMounting.current &&
      setActiveSlide &&
      scrollState.index !== activeSlide
    ) {
      setActiveSlide(scrollState.index);
    }
  }, [scrollState.index, setActiveSlide, activeSlide]);

  // --- Scroll Action ---
  const scroll_To = async (arg, e) => {
    e?.preventDefault();
    if (!trackRef.current) return;

    try {
      if (beforeSlideCb) {
        await beforeSlideCb(scrollState.index, items[scrollState.index]);
      }

      const { clientWidth, scrollWidth, scrollLeft } = trackRef.current;
      const itemWidth = clientWidth / itemsCount;
      const isIndex = typeof arg === "number";

      let target = isIndex
        ? arg
        : Math.round(scrollLeft / itemWidth) +
          slideMove * (arg === "left" ? -1 : 1);

      const maxIndex = Math.round((scrollWidth - clientWidth) / itemWidth);
      target = Math.max(0, Math.min(target, maxIndex));

      targetSlideRef.current = target;

      trackRef.current[isIndex ? "scrollTo" : "scrollBy"]({
        left: isIndex
          ? target * itemWidth
          : itemWidth * slideMove * (arg === "left" ? -1 : 1),
        behavior: "smooth",
      });

      // If we are scrolling to the exact same place (e.g. 0 to 0), check buttons again manually
      if (scrollLeft === target * itemWidth) {
        checkScroll();
      }
    } catch (err) {
      // Error handling
    }
  };

  // --- After Slide Callback ---
  useEffect(() => {
    if (isMounting.current) return;

    if (
      targetSlideRef.current !== null &&
      scrollState.index !== targetSlideRef.current
    ) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (afterSlideCb) {
          await afterSlideCb(scrollState.index, items[scrollState.index]);
        }
      } finally {
        targetSlideRef.current = null;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollState.index, afterSlideCb, items]);

  const commonStyles = {
    "--item-count": itemsCount,
    "--gap-between-elements": gapBetweenItems,
    listStyle: "none",
  };

  return (
    <div
      id="carousel"
      className={styles.carousel_container}
      style={{ maxWidth }}
    >
      {items.length <= 1 ? (
        <div className={styles.carousel_item} style={commonStyles}>
          {children && React.cloneElement(children, { item: items[0] })}
        </div>
      ) : (
        <>
          {scrollButtonRequired && scrollState.left && (
            <ScrollButton dir="left" onClick={(e) => scroll_To("left", e)} />
          )}

          <ul
            className={styles.carousel_track}
            ref={trackRef}
            style={commonStyles}
          >
            {items.map((item, index) => (
              <li
                key={item.id}
                className={styles.carousel_item}
                style={{ scrollSnapAlign: itemsCount > 1 ? "start" : "center" }}
              >
                {children &&
                  React.cloneElement(children, { item, setActiveSlide, index })}
              </li>
            ))}
          </ul>

          {scrollButtonRequired && scrollState.right && (
            <ScrollButton dir="right" onClick={(e) => scroll_To("right", e)} />
          )}

          {isPagerRequired && (
            <div id="pager_id" className={styles.carousel_pager}>
              {Array.from({ length: items.length - itemsCount + 1 }).map(
                (_, i) => (
                  <DefaultPagerComponent
                    key={i}
                    scroll_To={scroll_To}
                    index={i}
                    currentSlide={scrollState.index}
                  />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// --- Simplified Helper Components ---
const ScrollButton = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.carousel_btn} ${
      dir === "right" ? styles.carousel_btn_right : styles.carousel_btn_left
    }`}
    aria-label={`Scroll ${dir}`}
  >
    {dir === "right" ? <>&#8250;</> : <>&#8249;</>}
  </button>
);

const DefaultPagerComponent = ({ scroll_To, index, currentSlide }) => (
  <button
    onClick={(e) => scroll_To(index, e)}
    className={`${styles.pager_dot} ${
      currentSlide === index ? styles.active : ""
    }`}
    aria-label={`Go to slide ${index + 1}`}
  />
);
