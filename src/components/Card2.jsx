import { BrowserRouter, Link } from "react-router-dom";
import styles from "./../Styles/card2.module.css";
import { Carousel } from "../components/Crousel";
import { useState } from "react";

export function Card2({ item }) {
  const [addToWishlist, setAddToWishlist] = useState(false);
  const {
    imagePath,
    title,
    delivery,
    price,
    orgPrice,
    link,
    badgeLabel = "",
  } = item;

  return (
    <div className={styles.card_wrapper}>
      {/* Card Header */}
      <div className={styles.product_card}>
        <div className={styles.card_header}>
          <div
            className={styles.wishlist_btn}
            role="button"
            aria-label="Add to wishlist"
            onClick={() => setAddToWishlist((add) => !add)}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill={`${addToWishlist ? "black" : "none"}`}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <Link
            to={
              "https://www.angara.com/p/classic-prong-set-linear-garnet-tennis-bracelet-sb0186g?clasp=bracelet+catch&stoneSize=5mm&braceletLength=7+inches&gemstoneQuality=best&metalType=silver"
            }
            className={styles.card_link_wrapper}
          >
            <div className={styles.image_container}>
              <Carousel items={imagePath}>
                <ImageCarousel />
              </Carousel>
              <div
                className={`${styles.badge_container} ${styles.a2} ${styles.a1}`}
              >
                <span className={styles.badge}>Deliver by {delivery}</span>
                {badgeLabel && (
                  <span className={styles.badge}>{badgeLabel}</span>
                )}
              </div>
            </div>

            <p className={styles.product_title}>{title}</p>

            <div className={`${styles.product_price} ${styles.a1}`}>
              <span className={styles.current_price}>${price}</span>
              {orgPrice && (
                <span className={styles.original_price}>${orgPrice}</span>
              )}
            </div>
          </Link>
        </div>

        <Link
          to={
            "https://www.angara.com/p/classic-prong-set-linear-garnet-tennis-bracelet-sb0186g?clasp=bracelet+catch&stoneSize=5mm&braceletLength=7+inches&gemstoneQuality=best&metalType=silver"
          }
          className={`${styles.action_btn} ${styles.a1}`}
        >
          <span
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "0.75rem",
            }}
          >
            Customize Now
          </span>
        </Link>
      </div>
    </div>
  );
}

function ImageCarousel({ item }) {
  return (
    <img
      src={item}
      alt="Product Image"
      className={styles.product_image}
      loading="lazy"
    />
  );
}
