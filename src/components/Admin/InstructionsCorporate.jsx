"use client";
import { markPageLoaded, updatedWatched } from '@/Utils/AnimationFunctions';
import React, { useEffect, useState } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import { GeneralInstructions } from '../GuideCorporate/GeneralInstructions';
import { CommonCollectionsInstructions } from '../GuideCorporate/CommonCollectionsInstructions';
import { HomepageInstructions } from '../GuideCorporate/HomepageInstructions';
import { MarketsInstructions } from '../GuideCorporate/MarketsInstructions';
import { ProductListingInstructions } from '../GuideCorporate/ProductListingInstructions';
import { ProductDetailPageInstructions } from '../GuideCorporate/ProductDetailPageInstructions';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "@/assets/style/instructions.css";

export const InstructionsCorporate = ({ data }) => {
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
                            <Tab>Common</Tab>
                            <Tab>Homepage</Tab>
                            <Tab>Markets</Tab>
                            {/* <Tab>Category Page</Tab> */}
                            {/* <Tab>Product Page</Tab> */}
                        </TabList>
                    </div>

                    <TabPanel>
                        <GeneralInstructions DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <CommonCollectionsInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <HomepageInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    <TabPanel>
                        <MarketsInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel>
                    {/* <TabPanel>
                        <ProductListingInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel> */}
                    {/* <TabPanel>
                        <ProductDetailPageInstructions setTabIndex={setTabIndex} DASHBOARD_URL={DASHBOARD_URL} />
                    </TabPanel> */}
                </Tabs>

            </div>
        </div>

    );
};