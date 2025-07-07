import React, { useState } from "react";
import styles from "./Description.module.scss";

interface DescriptionProps {
  text: string;
  limit?: number;
}

function Description({ text, limit = 120 }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) {
    return <p>{text}</p>;
  }

  const shortText = text.slice(0, limit);

  return (
    <p>
      {expanded ? text : shortText + "... "}
      <button
        onClick={() => setExpanded(!expanded)}
        className={styles.expandButton}
        aria-label={expanded ? "Свернуть описание" : "Развернуть описание"}
      >
        {expanded ? "Свернуть" : "Развернуть"}
      </button>
    </p>
  );
}

export { Description };