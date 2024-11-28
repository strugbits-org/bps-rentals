"use client";
import { markPageLoaded, updatedWatched } from '@/Utils/AnimationFunctions';
import React, { useEffect, useState } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import { GeneralInstructions } from '../Guide/GeneralInstructions';
import { CommonCollectionsInstructions } from '../Guide/CommonCollectionsInstructions';
import { HomepageInstructions } from '../Guide/HomepageInstructions';
import { MarketsInstructions } from '../Guide/MarketsInstructions';
import { ProductListingInstructions } from '../Guide/ProductListingInstructions';
// import { ProductDetailPageInstructions } from '../Guide/ProductDetailPageInstructions';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "@/assets/style/instructions.css";

export const InstructionsRentals = ({ data }) => {
    const { permissions } = useUserData();
    const [tabIndex, setTabIndex] = useState(0);
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);
    const DASHBOARD_URL = `https://manage.editorx.com/dashboard/${process.env.CLIENT_SITE_ID_WIX}`;

    useEffect(() => {
        setTimeout(markPageLoaded, 500);
        setTimeout(() => {
            updatedWatched(true);
        }, 3000);
    }, [data]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
            updatedWatched(true);
        }
    }, [tabIndex])


    if (!ADMIN_PANEL_ACCESS) return <Error404Page inline={true} />

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom editor instructions-page">
                <Tabs className="tabs" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <div className="sticky-tabs-container"
                        data-sticky
                        data-trigger="parent"
                        data-offset="#header"
                    >
                        <TabList className="tab-list">
                            <Tab>General</Tab>
                            <Tab>Common Collections</Tab>
                            <Tab>Homepage</Tab>
                            <Tab>Markets</Tab>
                            <Tab>Product Listing</Tab>
                            {/* <Tab>Product Detail Page</Tab> */}
                        </TabList>
                    </div>

                    <TabPanel>
                        <GeneralInstructions DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <CommonCollectionsInstructions DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <HomepageInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <MarketsInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <ProductListingInstructions DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    {/* <TabPanel>
                        <ProductDetailPageInstructions DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel> */}
                </Tabs>

            </div>
        </div>

    );
};
