import React, { useEffect, useState } from "react";

export default function AdDisplay() {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    fetch("/api/ads/random")
      .then((res) => res.json())
      .then(setAd);
  }, []);

  if (!ad) return null;

  const handleClick = () => {
    window.location.href = "/welcome";
  };

  // Simple pop-up or banner style
  return (
    <div className={`ad ad-${ad.type}`} onClick={handleClick} style={{cursor: "pointer", background: "#ffe", border: "1px solid #ccc", padding: 16, margin: 16, borderRadius: 8}}>
      <strong>{ad.title}</strong>
      <div>{ad.content}</div>
      <div style={{fontSize: 12, color: "#888"}}>(Click to learn more)</div>
    </div>
  );
}
