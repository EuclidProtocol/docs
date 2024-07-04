import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck } from "react-icons/fa"; // Import the tick mark icon
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  label: string;
  language: string;
  content: string;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const onClickTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCopyClick = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000); // Reset copied state after 5 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.tabs}>
      <div className={styles["tab-buttons"]}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ""}
            onClick={() => onClickTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles["tab-content"]}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles["tab-pane"]} ${
              activeTab === tab.id ? styles.active : ""
            }`}
          >
            <div className={styles["code-container"]}>
              <button
                className={styles["copy-button"]}
                onClick={() => handleCopyClick(tab.content.trim())}
              >
                {copied ? (
                  <FaCheck className={styles.icon} />
                ) : (
                  <FaCopy className={styles.icon} />
                )}{" "}
                {/* Conditionally render the icon */}
              </button>
              <SyntaxHighlighter
                language={tab.language}
                style={coldarkDark}
                customStyle={{
                  maxHeight: "400px",
                  overflow: "auto",
                  background: "rgb(30,30,30)",
                }}
              >
                {tab.content.trim()}
              </SyntaxHighlighter>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
