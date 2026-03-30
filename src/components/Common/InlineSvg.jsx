"use client";

import { useEffect, useState } from "react";

/**
 * InlineSvg component - renders SVG inline so it can inherit CSS color via currentColor
 * @param {string} src - URL of the SVG file
 * @param {string} className - CSS class to apply
 * @param {string} alt - Alt text for accessibility
 */
const InlineSvg = ({ src, className = "", alt = "" }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    if (!src) return;

    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        if (response.ok) {
          const text = await response.text();
          setSvgContent(text);
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    fetchSvg();
  }, [src]);

  if (!svgContent) {
    return <span className={className} role="img" aria-label={alt} />;
  }

  return (
    <span
      className={className}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default InlineSvg;
