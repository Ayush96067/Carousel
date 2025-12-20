import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../Styles/carousel.module.css";

export function Crousel({
  children,
  items,
  itemsCount = 1,
  slideMove = 2,
  maxWidth = 1200,
  scrollButtonRequired = true,
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  const checkScrollability = useCallback(() => {
    if (!trackRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);

    const totalItemWidth = clientWidth / itemsCount;
    setCurrentSlide(Math.round(scrollLeft / totalItemWidth));
  }, [itemsCount]);

  useEffect(() => {
    checkScrollability();
    const track = trackRef.current;

    if (track) {
      track.addEventListener("scroll", checkScrollability);
    }

    return () => {
      if (track) {
        track.removeEventListener("scroll", checkScrollability);
      }
    };
  }, [checkScrollability]);

  const scroll_To = (indexOrDirection) => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = trackRef.current.clientWidth / itemsCount;
    const isIndex = typeof indexOrDirection === "number";
    const method = isIndex ? "scrollTo" : "scrollBy";
    const amount = isIndex
      ? indexOrDirection * itemWidth
      : itemWidth * slideMove * (indexOrDirection === "left" ? -1 : 1);

    track[method]({ left: amount, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel_container} style={{ maxWidth: maxWidth }}>
      {items.length > 1 ? (
        <>
          {scrollButtonRequired && canScrollLeft && (
            <ScrollButton scroll={scroll_To} direction={"left"} />
          )}
          <ul
            className={styles.carousel_track}
            ref={trackRef}
            style={{ "--item-count": itemsCount, listStyle: "none" }}
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
            <ScrollButton scroll={scroll_To} direction={"right"} />
          )}
          <div className={styles.crousel_pager}>
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => scroll_To(index)}
                className={`${styles.pager_dot} ${
                  currentSlide === index ? styles.active : ""
                }`}
                aria-label={`Go to slide ${index + 1}`}
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

function ScrollButton({ scroll, direction }) {
  return (
    <button
      className={`${styles.carousel_btn} ${
        direction === "right"
          ? styles.carousel_btn_right
          : styles.carousel_btn_left
      }`}
      onClick={() => scroll(direction)}
      aria-label="Scroll Right"
    >
      {direction === "right" ? <>&#8250;</> : <>&#8249;</>}
    </button>
  );
}
