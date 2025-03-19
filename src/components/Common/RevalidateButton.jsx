"use client";
import useUserData from "@/Hooks/useUserData";
import { revalidateAllPages, revalidatePage } from "@/Services/RevalidateService";
import { enableRevalidate } from "@/Utils/AnimationFunctions";
import { PERMISSIONS } from "@/Utils/Schema/permissions";
import logError from "@/Utils/ServerActions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const RevalidateButton = () => {
    const path = usePathname();
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);

    const [revalidationState, setRevalidationState] = useState({
        isRevalidatingPage: false,
        isRevalidatingSite: false,
        pageRevalidated: false,
        siteRevalidated: false,
        errorMessage: null,
        reloading: false,
    });

    const buttonRef = useDetectClickOutside({
        onTriggered: () => {
            const button = buttonRef.current;
            if (button) button.classList.remove("active");
        }
    });

    useEffect(() => {
        if (!ADMIN_PANEL_ACCESS) return;
        enableRevalidate();
    }, [ADMIN_PANEL_ACCESS])

    if (!ADMIN_PANEL_ACCESS) return;
    const handleRevalidate = async (type) => {
        const isPage = type === "page";
        const setStateKey = isPage ? "isRevalidatingPage" : "isRevalidatingSite";
        const revalidateFn = isPage ? () => revalidatePage(path) : revalidateAllPages;

        setRevalidationState((prevState) => ({
            ...prevState,
            [setStateKey]: true,
            pageRevalidated: false,
            siteRevalidated: false,
            errorMessage: null,
            reloading: false,
        }));

        try {
            const res = await revalidateFn();

            if (!isPage && !res) {
                setRevalidationState((prevState) => ({
                    ...prevState,
                    [setStateKey]: false,
                    pageRevalidated: isPage,
                    siteRevalidated: !isPage,
                }));
                return;
            }

            setRevalidationState((prevState) => ({
                ...prevState,
                [setStateKey]: false,
                pageRevalidated: isPage,
                siteRevalidated: !isPage,
                reloading: true
            }));

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            logError("Something went wrong during revalidation: ", error);
            setRevalidationState((prevState) => ({
                ...prevState,
                [setStateKey]: false,
                errorMessage: error.message,
            }));
        }
    };

    const { isRevalidatingPage, isRevalidatingSite, pageRevalidated, siteRevalidated, errorMessage, reloading } = revalidationState;

    return (
        <div ref={buttonRef} className="revalidate-button" data-cursor-style="off">
            <button className="btn-revalidate-button">
                <div className="btn-wrapper">
                    <span>INVALIDATE</span>
                    <div className="bg-1"></div>
                    <div className="bg-2"></div>
                </div>
            </button>
            <div className="container-revalidate">
                <h2 className="mb-5">MANAGE CACHE</h2>
                <p>Would you like to invalidate the current path? [{path}]</p>
                <button
                    onClick={() => handleRevalidate("page")}
                    className="modal-add-to-cart"
                    disabled={isRevalidatingPage || reloading}
                >
                    <span>{isRevalidatingPage ? "Invalidating Page..." : "Invalidate Page"}</span>
                </button>
                {pageRevalidated && <p>Page invalidated successfully! Reloading...</p>}

                <div className="divisor"></div>
                <br />

                <p>Would you like to invalidate the entire site?</p>
                <button
                    onClick={() => handleRevalidate("site")}
                    className="modal-add-to-cart"
                    disabled={isRevalidatingSite || reloading}
                >
                    <span>{isRevalidatingSite ? "Invalidating Site..." : "Invalidate Site"}</span>
                </button>
                {siteRevalidated && <p>Site invalidated successfully! Reloading...</p>}

                {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            </div>
        </div>
    );
};

export default RevalidateButton;