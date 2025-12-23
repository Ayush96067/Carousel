import styles from "../Styles/image_tracker.module.css";
export function ImageTracking({ item }) {
  return (
    <div className={styles.imageContainer}>
      <img src={`${item}`} alt="Product image" />
    </div>
  );
}

export function ImageTrackingPager({ item }) {
  return (
    <div className={styles.imageContainer2}>
      <img src={`${item}`} alt="Product image" />
    </div>
  );
}
