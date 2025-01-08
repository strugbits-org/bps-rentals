import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const HomepageInstructions = ({ setTabIndex, DASHBOARD_URL }) => {
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">Home Page</h2>
            {/* Home Page Content Collections */}
            <p className="black-1">Manage your homepage content using the following collections:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Hero Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/HomeTopSectionData`}> Home (First 2 Sections) </AnimateLink> collection to update the hero section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Get In Touch Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/GetInTouchSection`}>
                            Home (Third Sec - Get In Touch)
                        </AnimateLink> collection to manage the get in touch section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Portfolio/Projects section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/PortfolioCollection`}>
                            Portfolio
                        </AnimateLink> collection to manage the portfolio section on the home page.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Reviews Slider/Here's what people are saying:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/PeopleReviewSlider`}>
                            Reviews Slider
                        </AnimateLink> collection to update the content of the reviews slider section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Rental Store Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/RentalStore`}>
                        RentalStore
                        </AnimateLink> collection to update the content of the Rental Store Section.
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Markets Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Studios Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Dream Big Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Let's Get Social Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p className='black-1'><span className="blue-1">Shared Sections:</span> Refer to the common collections/sections guide for instructions.
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Markets Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Studios Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Dream Big Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => { setTabIndex(1) }}>Let's Get Social Section</span>
                                </AnimateLink>
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}
