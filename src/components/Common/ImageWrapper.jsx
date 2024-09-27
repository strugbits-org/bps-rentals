"use client"
import React, { useEffect, useRef, useState } from 'react';
import { generateImageURL, generateImageUrl2 } from "@/Utils/GenerateImageURL";
import { debounce } from 'lodash';
import Image from 'next/image';

export const ImageWrapper = ({
    url,
    type = "default",
    original,
    fit = "fill",
    q = "90",
    min_w,
    min_h,
    customClasses = "",
    attributes,
    defaultDimensions,
    timeout = 200,
    useNextImage = false
}) => {

    if (!url) return null;

    const ref = useRef();
    const [src, setSrc] = useState();
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();

    const generateSrc = () => {
        if (original) return generateImageURL({ wix_url: url, original });

        if (ref.current) {
            const newWidth = ref.current.clientWidth;
            const newHeight = ref.current.clientHeight;
            let width = min_w && min_w > newWidth ? min_w : newWidth;
            let height = min_h && min_h > newHeight ? min_h : newHeight;

            if (!width) width = defaultDimensions.width;
            if (!height) height = defaultDimensions.height;
            setHeight(height);
            setWidth(width);
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
        }
    };

    const handleResize = debounce(() => {
        const newSrc = generateSrc();
        setSrc(newSrc);
    }, 2000);

    useEffect(() => {
        setTimeout(() => {
            const newSrc = generateSrc();
            setSrc(newSrc);
        }, timeout);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {useNextImage && src && height && width ? <Image ref={ref} src={src} quality={q} loading={"eager"} height={height} width={width} className={customClasses} {...attributes} alt='' /> :
                <img
                    ref={ref}
                    src={src}
                    className={customClasses}
                    {...attributes}
                />
            }
        </>
    );
};
