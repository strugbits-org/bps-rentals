"use client";
import useUserData from "@/Hooks/useUserData";
import { revalidateAllPages, revalidatePage } from "@/Services/RevalidateService";
import { enableRevalidate } from "@/Utils/AnimationFunctions";
import { PERMISSIONS } from "@/Utils/Schema/permissions";
import logError from "@/Utils/ServerActions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
        failedRoutes: [],
        reloading: false,
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
            failedRoutes: [],
            reloading: false,
        }));

        try {
            const res = await revalidateFn();

            if (!isPage && res?.failed?.length > 0) {
                setRevalidationState((prevState) => ({
                    ...prevState,
                    [setStateKey]: false,
                    failedRoutes: res.failed,
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
            logError("Something went wrong during revalidation: ",error);
            setRevalidationState((prevState) => ({
                ...prevState,
                [setStateKey]: false,
                errorMessage: error.message,
            }));
        }
    };

    const { isRevalidatingPage, isRevalidatingSite, pageRevalidated, siteRevalidated, failedRoutes, errorMessage, reloading } = revalidationState;

    return (
        <div className="revalidate-button" data-cursor-style="off">
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

                {failedRoutes.length > 0 && (
                    <div>
                        <p style={{ color: 'red' }}>Failed to invalidate routes:</p>
                        <ul>
                            {failedRoutes.map((route, index) => (
                                <li key={index}>{route}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
            </div>
        </div>
    );
};

export default RevalidateButton;