import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className={styles["tab-header"]}>
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
        <button
          className={styles["expand-button"]}
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls="tabs-content"
          type="button"
        >
          {isExpanded ? "Compact" : "Expand"}
        </button>
      </div>
      <div id="tabs-content" className={styles["tab-content"]}>
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
                style={coldarkCold}
                customStyle={{
                  maxHeight: isExpanded ? "none" : "360px",
                  overflow: "auto",
                  background: "var(--euclid-surface)",
                  border: "1px solid var(--euclid-line)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 30px rgba(17, 24, 28, 0.04)",
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
