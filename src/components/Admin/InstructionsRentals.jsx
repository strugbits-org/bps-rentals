"use client";
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import React, { useEffect } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import { GeneralInstructions } from '../Guide/GeneralInstructions';

export const InstructionsRentals = ({ data }) => {
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);
    const DASHBOARD_URL = `https://manage.editorx.com/dashboard/${process.env.CLIENT_SITE_ID_WIX}`;
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    useEffect(() => {
        setTimeout(markPageLoaded, 500);
    }, [data]);

    if (!ADMIN_PANEL_ACCESS) return <Error404Page inline={true} />

    return (
        <div className="wrapper-account">
            <h1 className="fs--60 blue-1">
                Content Management Instructions for Rentals
            </h1>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25 editor instructions-page">

                {/* GENERAL INSTRUCTIONS */}
                <GeneralInstructions DASHBOARD_URL={DASHBOARD_URL} CMS_URL={CMS_URL} />
            </div>
        </div>

    );
};
