"use client"
import { generateImageURL, generateImageUrl2 } from "@/Utils/GenerateImageURL";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from 'react'

export const ImageWrapper = ({ url, type = "1", original, fit = "fill", q = "95", min_w, min_h, customClasses = "", attributes }) => {
    if (!url) return;

    const windowsSize = useWindowSize();
    const [height, setHeight] = useState("1080");
    const [width, setWidth] = useState("1920");

    const ref = useRef();

    const changeImageSize = () => {
        setHeight(ref.current?.clientHeight);
        setWidth(ref.current?.clientWidth);
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            changeImageSize();
        }, 2000);

        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [windowsSize]);

    const generateSrc = () => {
        let src;
        if (type === "1") {
            src = generateImageURL({
                wix_url: url,
                w: min_w && min_w > width ? min_w : width,
                h: min_h && min_h > height ? min_h : height,
                original,
                fit,
                q,
            });
        }else if (type === "2"){
            src = generateImageUrl2({
                wix_url: url,
                w: min_w && min_w > width ? min_w : width,
                h: min_h && min_h > height ? min_h : height,
                original,
                fit,
                q,
            });
        }
        return src;

    }

    return (
        <img
            style={{ minHeight: min_h }}
            ref={ref}
            src={generateSrc()}
            className={customClasses}
            {...attributes}
        />
    )
}
