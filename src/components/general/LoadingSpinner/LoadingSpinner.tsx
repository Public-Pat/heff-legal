import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.Holder}>
      <div className={styles.Ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
