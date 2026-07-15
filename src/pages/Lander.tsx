import React, { useEffect } from "react";

export interface LanderProps {
  variant?: "test" | "quiz" | "symptoms";
  metaTitle: string;
  metaDescription: string;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const Lander: React.FC<LanderProps> = ({ variant, metaTitle, metaDescription }) => {
  useEffect(() => {
    document.title = metaTitle;
    setMeta("description", metaDescription);
    setMeta("og:title", metaTitle, "property");
    setMeta("og:description", metaDescription, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", metaTitle);
    setMeta("twitter:description", metaDescription);
  }, [metaTitle, metaDescription]);

  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  if (variant) params.set("v", variant);
  const qs = params.toString();
  const src = "/home.html" + (qs ? "?" + qs : "");

  return (
    <iframe
      src={src}
      title={metaTitle}
      style={{ border: "none", width: "100vw", height: "100vh", display: "block" }}
    />
  );
};

export default Lander;