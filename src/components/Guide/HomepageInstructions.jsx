import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const HomepageInstructions = ({ DASHBOARD_URL }) => {
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
                    <p className='black-1'><span className="blue-1">Global Sections:</span> Refer to the common collections/sections guide for instructions
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/RentalsMarkets`} className="blue-1">Markets Section</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/StudiosSection`} className="blue-1">Studios Section</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/DreamBigSection`} className="blue-1">Dream Big Section</AnimateLink>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/SocialSectionDetails`} className="blue-1">Let's Get Social Section</AnimateLink>
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}
