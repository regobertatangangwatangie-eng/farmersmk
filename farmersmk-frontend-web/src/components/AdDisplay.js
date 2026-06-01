import React, { useEffect, useState } from "react";

const fallbackAd = {
  type: "banner",
  title: "Farmers MK Services",
  content: "Explore school, marketplace, communication, grants, and wallet services from one place.",
};

export default function AdDisplay() {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/ads/random")
      .then(async (res) => {
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          throw new Error("Ad API unavailable");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAd(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAd(fallbackAd);
        }
      });

    return () => {
      isMounted = false;
    };
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
