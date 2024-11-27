import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const ProductDetailPageInstructions = ({ DASHBOARD_URL }) => {
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">Product Detail Page</h2>
            {/* Product Listing Content Collections */}
            <p className="black-1">Manage your product content using the following collections:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Product:</span> Use the WIX Catalogue to manage the product. Visit the <AnimateLink className={"blue-1"} target="_blank" to={`${DASHBOARD_URL}/wix-stores/products`}>Products</AnimateLink> page to update or remove product.
                    </p>
                </li>
                <li>
                    <p className='black-1'>
                        <span className="blue-1">Shared Sections:</span> Some sections are shared across pages. For details, refer to the common collections/sections guide.
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink target="_blank" to={`${CMS_URL}/RentalsMarkets`} className="blue-1">Markets Section</AnimateLink>
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