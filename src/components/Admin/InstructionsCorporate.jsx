"use client";
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import React, { useEffect } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { PERMISSIONS } from '@/Utils/Schema/permissions';

export const InstructionsCorporate = ({ data }) => {
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);

    useEffect(() => {
        setTimeout(markPageLoaded, 500);
    }, [data]);

    if (!ADMIN_PANEL_ACCESS) return <Error404Page inline={true} />

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom d-flex-lg">
                <h1 className="fs--60 blue-1 split-words">
                    Content Management Instructions Rentals
                </h1>
            </div>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                Helllloooooooooooooooooooo
            </div>
        </div>
    );
};
