"use client";
import { useEffect } from "react";
import { pageLoadStart } from "./AnimationFunctions";

export default function BackButtonListener() {

    useEffect(() => {
        const handleBackButton = () => {
            console.log("Back button pressed!");
            pageLoadStart({ noScroll: true });
        };

        window.addEventListener("popstate", handleBackButton);

        return () => {
            window.removeEventListener("popstate", handleBackButton);
        };
    }, []);

    return null;
}
