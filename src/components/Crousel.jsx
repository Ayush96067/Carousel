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
  activeSlide = 5,
  // setActiveSlide:
  // afterSlideCb:
  // beforeSlideCb:
}) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  if (items.length === 0) return <p>No products</p>;

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

  const scroll_To = (indexOrDirection, e) => {
    e.preventDefault();

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
    <div
      id={"carousel"}
      className={styles.carousel_container}
      style={{ maxWidth: maxWidth }}
    >
      {items.length > 1 ? (
        <>
          {scrollButtonRequired && canScrollLeft && (
            <ScrollButton scroll={scroll_To} direction={"left"} />
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
            <ScrollButton scroll={scroll_To} direction={"right"} />
          )}
          <div id="pager_id" className={styles.crousel_pager}>
            {items.map((item, index) => (
              <PagerComponent
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

function ScrollButton({ scroll, index, direction }) {
  return (
    <button
      key={index}
      className={`${styles.carousel_btn} ${
        direction === "right"
          ? styles.carousel_btn_right
          : styles.carousel_btn_left
      }`}
      onClick={(e) => scroll(direction, e)}
      aria-label="Scroll Right"
    >
      {direction === "right" ? <>&#8250;</> : <>&#8249;</>}
    </button>
  );
}

const DefaultPagerComponent = ({ scroll_To, index, currentSlide }) => {
  return (
    <button
      key={index}
      onClick={(e) => scroll_To(index, e)}
      className={`${styles.pager_dot} ${
        currentSlide === index ? styles.active : ""
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  );
};
