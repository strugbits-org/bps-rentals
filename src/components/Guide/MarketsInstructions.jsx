import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const MarketsInstructions = ({ setTabIndex, DASHBOARD_URL }) => {
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">Market Page</h2>
            {/* Market Page Content Collections */}
            <p className="black-1">Manage your market page content using the following collections:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Hero Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/RentalsMarkets`}> Rentals Markets </AnimateLink> collection to update the selected market matching the slug for the hero section content.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Best Sellers Section:</span> Assign a product category to the market in the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/BestSellers`}>
                            Best Sellers
                        </AnimateLink> collection. This will display products from the selected category in the best sellers section of the chosen market.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">New Arrivals Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/RentalsNewArrivals`}>
                            Rentals New Arrivals
                        </AnimateLink> collection to manage the new arrivals section. Update the item with the <span className='code'>slug</span> matching the market to modify the content for this section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Highlights Section:</span> We use separate collections for each market to manage the highlights section. Below is a list of all the markets along with their corresponding highlights section collections:
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/HighlightsTradeshow`} className="blue-1">Highlights Tradeshows</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/HighlightsCorporate`} className="blue-1">Highlights Corporate</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/HighlightsSocial`} className="blue-1">Highlights Social</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/HighlightsWedding`} className="blue-1">Highlights Weddings</AnimateLink>
                            </p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Portfolio Section:</span> This section uses the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/Portfolios`}> Portfolio</AnimateLink> collection to list portfolios associated with the selected market. Please be cautious when making updates, as this collection is being used sitewide to display portfolios.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Reviews Slider:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/PeopleReviewSlider`}>Reviews Slider</AnimateLink> collection to update the content of the reviews slider section.
                    </p>
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
            <p className='black-1'>
                <span className='blue-1'>Important!</span> Use the <AnimateLink target="_blank" to={`${CMS_URL}/RentalsHomeSectionDetails`} className="blue-1"> Home & Market (Section Details)</AnimateLink> collection to manage the titles and descriptions for all the sections mentioned above.
            </p>
        </>
    )
}
