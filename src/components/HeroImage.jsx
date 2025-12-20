import styles from "./../Styles/HeroImage.module.css";

export function HeroImage({ item }) {
  return (
    <div className={styles.imageContainer}>
      <img className={styles.heroImage} src={item} alt={item} />
    </div>
  );
}
