import styles from "../../../Styles/FigmaStyles/SelectionBar.module.css";

export const ShapeCard = ({ item }) => {
  return (
    <div className={`${styles.shape_card} transition-colors duration-200`}>
      <span className="md:text-2xl text-sm">
        {typeof item.icon === "string" ? item.icon : <item.icon />}
      </span>
      <span className="md:text-[.8rem] text-[0.7rem] md:font-medium ">
        {item.name} {item.quantity && `(${item.quantity})`}
      </span>
      {/* {item.quantity && (
        <span className="md:text-xs text-[0.6rem] ">({item.quantity})</span>
      )} */}
    </div>
  );
};
