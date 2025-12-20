import { Crousel } from "./Crousel";
import styles from "./../Styles/card.module.css";

export function Card({ item }) {
  function handleClick() {
    alert("Details");
  }

  return (
    <div className={styles.card_container}>
      <Crousel items={item.imagePath} itemsCount={1} slideMove={1}>
        <ImageCrousel />
      </Crousel>

      <div className={styles.contentContainer}>
        <p>{item.title}</p>
        {item.price ? (
          <p
            style={{
              fontSize: ".7rem",
              display: "flex",
              gap: "20px",
            }}
          >
            {item.orgPrice && <del> ${item.orgPrice}</del>}
            <span style={{ color: "black" }}>${item.price} </span>
          </p>
        ) : (
          <p style={{ color: "black", fontSize: ".8rem" }}>
            {item.description}
          </p>
        )}
        <button className={styles.cta_btn} onClick={handleClick}>
          Details
        </button>
      </div>
    </div>
  );
}

function ImageCrousel({ item }) {
  return (
    <div className={styles.imageContainer}>
      <img src={item} alt={"product image"} width={"100%"} />
    </div>
  );
}
