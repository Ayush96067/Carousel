import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../../Styles/FigmaStyles/FigmaUIStyles/Accordion.module.css";
export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.accordion_container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.title_button} flex_between hover:bg-gray-100 transition-colors duration-200 `}
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown />
        </span>
      </button>
      <div
        className={`grid transition-all  duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden ">
          <div className={styles.accordion_content}>{children}</div>
        </div>
      </div>
    </div>
  );
}
