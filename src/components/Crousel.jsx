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
  const isFirstRender = useRef(true);
  const targetSlideRef = useRef(null);
  const isFirst = useRef(true);

  // Grouped state for cleaner updates
  const [scrollState, setScrollState] = useState({
    left: false,
    right: false,
    index: activeSlide ?? 0,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!items.length) return <p>No products</p>;

  // --- Core Calculation Logic ---
  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const itemWidth = clientWidth / itemsCount;
    if (isFirstRender.current) return;
    setScrollState((prev) => {
      const next = {
        left: scrollLeft > 0,
        right: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1,
        index: Math.round(scrollLeft / itemWidth),
      };

      if (isProcessing) next.index = prev.index;

      // Only update if something changed
      return prev.left === next.left &&
        prev.right === next.right &&
        prev.index === next.index
        ? prev
        : next;
    });
  }, [itemsCount, isProcessing]);

  // --- Debounced Scroll Listener ---
  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(trackRef.current.scrollTimer);
      trackRef.current.scrollTimer = setTimeout(checkScroll, 100);
    };

    const track = trackRef.current;

    if (track) {
      if (activeSlide === null || activeSlide === 0) checkScroll(); // Initial Check
      track.addEventListener("scroll", handleScroll);
    }

    return () => {
      track?.removeEventListener("scroll", handleScroll);
      clearTimeout(track?.scrollTimer);
    };
  }, [checkScroll]);

  useEffect(() => {
    // If activeSlide is provided, valid, and different from current, SCROLL TO IT.
    if (activeSlide !== null) {
      scroll_To(activeSlide);
    }
  }, [activeSlide]);

  // --- NEW: Sync Internal Scroll -> Parent State (setActiveSlide) ---
  useEffect(() => {
    // If internal index changes, notify parent
    if (!isProcessing && setActiveSlide && scrollState.index !== activeSlide) {
      setActiveSlide(scrollState.index);
    }
  }, [scrollState.index, isProcessing]);

  // --- Scroll Action ---
  const scroll_To = async (arg, e) => {
    e?.preventDefault();
    if (isProcessing || !trackRef.current) return;
    setIsProcessing(true);

    try {
      if (beforeSlideCb)
        await beforeSlideCb(scrollState.index, items[scrollState.index]);

      const { clientWidth, scrollWidth, scrollLeft } = trackRef.current;
      const itemWidth = clientWidth / itemsCount;

      // Check if arg is index(number) or direction(string) i.e passed from pager component or scroll button
      const isIndex = typeof arg === "number";

      // Calculate Target
      let target = isIndex
        ? arg
        : Math.round(scrollLeft / itemWidth) +
          slideMove * (arg === "left" ? -1 : 1);

      const maxIndex = Math.round((scrollWidth - clientWidth) / itemWidth);
      target = Math.max(0, Math.min(target, maxIndex)); // Clamp target

      targetSlideRef.current = target;

      trackRef.current[isIndex ? "scrollTo" : "scrollBy"]({
        left: isIndex
          ? target * itemWidth
          : itemWidth * slideMove * (arg === "left" ? -1 : 1),
        behavior: "smooth",
      });

      // Manual unlock fallback
      if (scrollState.index === target)
        setTimeout(() => setIsProcessing(false), 500);
    } catch (err) {
      setIsProcessing(false);
    }
  };

  // --- After Slide Callback ---
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Wait to for target to be reached
    if (
      !isProcessing ||
      (targetSlideRef.current !== null &&
        scrollState.index !== targetSlideRef.current)
    )
      return;

    const timer = setTimeout(async () => {
      try {
        if (afterSlideCb) {
          await afterSlideCb(scrollState.index, items[scrollState.index]);
        }
      } finally {
        setIsProcessing(false);
        targetSlideRef.current = null;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [scrollState.index, isProcessing, afterSlideCb, items]);

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
            <ScrollButton
              dir="left"
              onClick={(e) => scroll_To("left", e)}
              disabled={isProcessing}
            />
          )}

          <ul
            className={styles.carousel_track}
            ref={trackRef}
            style={commonStyles}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className={styles.carousel_item}
                style={{ scrollSnapAlign: itemsCount > 1 ? "start" : "center" }}
              >
                {children && React.cloneElement(children, { item })}
              </li>
            ))}
          </ul>

          {scrollButtonRequired && scrollState.right && (
            <ScrollButton
              dir="right"
              onClick={(e) => scroll_To("right", e)}
              disabled={isProcessing}
            />
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
const ScrollButton = ({ dir, onClick, disabled }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`${styles.carousel_btn} ${dir === "right" ? styles.carousel_btn_right : styles.carousel_btn_left}`}
    style={{
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "wait" : "pointer",
    }}
    aria-label={`Scroll ${dir}`}
  >
    {dir === "right" ? <>&#8250;</> : <>&#8249;</>}
  </button>
);

const DefaultPagerComponent = ({ scroll_To, index, currentSlide }) => (
  <button
    onClick={(e) => scroll_To(index, e)}
    className={`${styles.pager_dot} ${currentSlide === index ? styles.active : ""}`}
    aria-label={`Go to slide ${index + 1}`}
  />
);
