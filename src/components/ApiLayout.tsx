import React from "react";
import styles from "./ApiLayout.module.css";

interface ApiLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const ApiLayout: React.FC<ApiLayoutProps> = ({ left, right }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
};

export default ApiLayout;
