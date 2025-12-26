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
  console.log("Initial Log at the start");

  // Grouped state for cleaner updates
  const [scrollState, setScrollState] = useState({
    left: false,
    right: false,
    index: activeSlide ?? 0,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  console.log(
    `Scroll state index ${scrollState.index} isProcessing ${isProcessing}`
  );

  if (!items.length) return <p>No products</p>;

  // --- Core Calculation Logic ---
  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const itemWidth = clientWidth / itemsCount;
    if (isFirstRender.current) return;
    console.log(`CheckScroll 1 scrollLeft ${scrollLeft}`);
    setScrollState((prev) => {
      const next = {
        left: scrollLeft > 0,
        right: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1,
        index: Math.round(scrollLeft / itemWidth),
      };

      console.log(
        `Check scroll 2 ScrollState ${next.index} isProcessing ${isProcessing}`
      );

      if (isProcessing) next.index = prev.index;

      console.log("Check Scroll 3 : isProcessing", isProcessing);

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
    console.log("Debounced Scroll Listener ---");
    const handleScroll = () => {
      clearTimeout(trackRef.current.scrollTimer);
      trackRef.current.scrollTimer = setTimeout(checkScroll, 100);
      console.log(
        `Debounced Scroll Listener --- Handle Scroll isProcessing ${isProcessing} `
      );
    };

    const track = trackRef.current;

    if (track) {
      if (activeSlide === null || activeSlide === 0) {
        checkScroll();
        console.log(
          "Debounced Scroll Listener --- activeSlide === null || activeSlide === 0 check scroll"
        );
      } // Initial Check
      console.log(
        "Debounced Scroll Listener --- activeSlide != null || activeSlide != 0 check scroll "
      );
      track.addEventListener("scroll", handleScroll);
    }

    return () => {
      track?.removeEventListener("scroll", handleScroll);
      clearTimeout(track?.scrollTimer);
    };
  }, [checkScroll]);

  // --- Active Slide Check
  useEffect(() => {
    // If activeSlide is provided, valid, and different from current, SCROLL TO IT.
    console.log("Active Slide Check ---");

    if (activeSlide !== null) {
      console.log("Active Slide Check --- activeSlide !== null");
      scroll_To(activeSlide - 1);
    }
    console.log(
      `Active Slide Check --- UseEffect ${activeSlide === null} ${activeSlide}`
    );
  }, [activeSlide]);

  // --- NEW: Sync Internal Scroll -> Parent State (setActiveSlide) ---
  useEffect(() => {
    // If internal index changes, notify parent
    console.log("Sync Internal Scroll --- ");

    if (!isProcessing && setActiveSlide && scrollState.index !== activeSlide) {
      console.log(
        `Inside -> isProcessing ${isProcessing} scrollState.index ${scrollState.index} activeSlide ${activeSlide}`
      );

      setActiveSlide(scrollState.index);
    }
    console.log(
      `Outside -> isProcessing ${isProcessing} scrollState.index ${scrollState.index} activeSlide ${activeSlide}`
    );
    console.log("Use effect in set active slide");
  }, [scrollState.index, isProcessing]);

  // --- Scroll Action ---
  const scroll_To = async (arg, e) => {
    console.log("Scroll To function --- ");

    e?.preventDefault();
    console.log(
      "Scroll To function --- Isprocessing at start of scroll_to ",
      isProcessing
    );

    if (isProcessing || !trackRef.current) {
      console.log(
        "Scroll To function --- isProcessing || !trackRef.current ",
        isProcessing
      );

      return;
    }

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

      console.log(
        "Scroll To function --- target(index or valueToScroll) ",
        target
      );

      const maxIndex = Math.round((scrollWidth - clientWidth) / itemWidth);
      target = Math.max(0, Math.min(target, maxIndex));

      targetSlideRef.current = target;

      console.log(
        "Scroll To function --- TargetSlideRef ",
        targetSlideRef.current
      );

      trackRef.current[isIndex ? "scrollTo" : "scrollBy"]({
        left: isIndex
          ? target * itemWidth
          : itemWidth * slideMove * (arg === "left" ? -1 : 1),
        behavior: "smooth",
      });
      console.log(
        `Scroll To function --- After sliding trackRef.current isProcessing ${isProcessing} active slide ${activeSlide}`
      );

      // Manual unlock fallback
      if (scrollState.index === target) {
        console.log(
          `Scroll To function --- scrollState.index === target ${scrollState.index === target} outside setTimeOut isProcessing ${isProcessing}`
        );
        setTimeout(() => {
          setIsProcessing(false);
          console.log(
            `Scroll To function --- scrollState.index === target ${scrollState.index === target} inside setTimeOutisProcessing ${isProcessing}`
          );
        }, 500);
      }
    } catch (err) {
      setIsProcessing(false);
      console.log(
        "Scroll To function --- isProcessing in catch ",
        isProcessing
      );
    }
  };

  // --- After Slide Callback ---
  useEffect(() => {
    console.log("After Slide Callback --- ");

    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log(
        `After Slide Callback --- isFirstRender check ${isFirstRender.current}`
      );
      return;
    }

    // Wait to for target to be reached
    if (
      !isProcessing ||
      (targetSlideRef.current !== null &&
        scrollState.index !== targetSlideRef.current)
    ) {
      console.log(
        `After Slide Callback --- Wait for target to be reached --- !isProcessing ${isProcessing} || (targetSlideRef.current ${targetSlideRef.current} !== null && scrollState.index ${scrollState.index} !== targetSlideRef.current)`
      );
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (afterSlideCb) {
          console.log(
            `After Slide Callback --- if(afterSlideCb) isProcessing `,
            isProcessing
          );
          await afterSlideCb(scrollState.index, items[scrollState.index]);
        }
      } finally {
        console.log(
          `After Slide Callback --- after if(afterSlideCb) finally isProcessing `,
          isProcessing
        );

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
