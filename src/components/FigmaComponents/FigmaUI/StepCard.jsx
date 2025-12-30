import styles from "../../../Styles/FigmaStyles/SelectionBar.module.css";

export const StepCard = ({ step, isMiddle }) => (
  <div
    className={`
      ${styles.stepcard_container} group hover:bg-[#FBF4E6]  text-[#636363a6] hover:text-black 
      ${!isMiddle ? "border-x border-[#00000028]" : ""}
    `}
  >
    <div className={`${styles.stepcard_context}`}>
      <span className="bg-[#8080801a] group-hover:bg-black group-hover:text-white transition-colors">
        {step.id}
      </span>
      {step.text}
    </div>
    <step.icon className={`${styles.stepcard_icon}`} />
  </div>
);
