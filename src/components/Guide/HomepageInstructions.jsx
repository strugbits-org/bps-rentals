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
                        <span className="blue-1">Hero Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/RentalsHomeHero`}> Home - Hero Section </AnimateLink> collection to update the hero section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Products Featured in Hero Section:</span> Assign a product category to the item with the <span className='code'>slug</span> matching <span className='blue-1'>"all"</span> in the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/BestSellers`}>
                            Best Sellers
                        </AnimateLink> collection. This will display products from the selected category in the hero section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">New Arrivals Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/RentalsNewArrivals`}>
                            Rentals New Arrivals
                        </AnimateLink> collection to manage the new arrivals section. Update the item with the <span className='code'>slug</span> matching <span className='blue-1'>"/"</span> to modify the content for this section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Highlights Section:</span> Use the <AnimateLink className="blue-1" target="_blank" to={`${CMS_URL}/HighlightsProducts`}> Highlights Home </AnimateLink> collection to manage the highlights section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Hot Trends Section:</span> Use the Hot Trends category from <AnimateLink className="blue-1" target="_blank" to={`${DASHBOARD_URL}/store/categories/list`}> Product Categories </AnimateLink> to update the hot trends section.
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
                                    <span onClick={() => { setTabIndex(1) }}> Dream Big Section </span>
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
