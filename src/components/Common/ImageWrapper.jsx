"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from "@uidotdev/usehooks";
import { generateImageURL, generateImageUrl2 } from "@/Utils/GenerateImageURL";

export const ImageWrapper = ({
    url,
    type = "default",
    original,
    fit = "fill",
    q = "95",
    min_w,
    min_h,
    customClasses = "",
    attributes,
    debug = false
}) => {
    if (!url) return null;

    // const windowSize = useWindowSize();
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

    const ref = useRef();

    const changeImageSize = () => {
        if (ref.current) {
            const newWidth = ref.current.clientWidth;
            const newHeight = ref.current.clientHeight;

            if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
                if (debug) console.log("changed");

                setDimensions({ width: newWidth, height: newHeight });
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            changeImageSize();
        }, 200);

        // const debounceTimeout = setTimeout(changeImageSize, 2000);

        // return () => clearTimeout(debounceTimeout);
    }, []);

    const generateSrc = () => {
        const width = min_w && min_w > dimensions.width ? min_w : dimensions.width;
        const height = min_h && min_h > dimensions.height ? min_h : dimensions.height;

        switch (type) {
            case "default":
                return generateImageURL({ wix_url: url, w: width, h: height, original, fit, q });
            case "2":
                return generateImageUrl2({ wix_url: url, w: width, h: height, original, fit, q });
            case "product":
                return `${url}/v1/${fit}/w_${width},h_${height},al_c,q_${q},usm_0.66_1.00_0.01,enc_auto/compress.webp`;
            default:
                return "";
        }
    };

    return (
        <img
            ref={ref}
            src={generateSrc()}
            className={customClasses}
            {...attributes}
        />
    );
};
