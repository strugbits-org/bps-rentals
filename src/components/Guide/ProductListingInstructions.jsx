import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const ProductListingInstructions = ({ DASHBOARD_URL }) => {
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">Product Listing or Category Page</h2>
            {/* Product Listing Content Collections */}
            <p className="black-1">Manage your product listing page content using the following collections:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Products:</span> Use the WIX Catalogue to manage the products displayed on the product listing or category page.
                        Visit the <AnimateLink className={"blue-1"} target="_blank" to={`${DASHBOARD_URL}/wix-stores/products`}>Catalogue</AnimateLink> to add, remove, or update products. To update categories or modify product assignments within a category, navigate to the <AnimateLink className={"blue-1"} target="_blank" to={`${DASHBOARD_URL}/store/categories/list`}>Categories</AnimateLink> tab under the Catalogue section.
                    </p>
                </li>
                <li>
                    <p className='black-1'>
                        <span className="blue-1">Products Sorting:</span> To change sort order of products, go to the <AnimateLink to={"/admin/manage-products-sorting"} className="blue-1">Manage Product Sorting</AnimateLink> page. You can rearrange products within their categories using a simple drag-and-drop interface. Ensure you click "Save" after adjusting the sort order. <br /> <span className='blue-1'>Note:</span> This page is accessible only to administrators.
                    </p>

                </li>
                <li>
                    <p className='black-1'>
                        <span className="blue-1">Banners:</span> Use the <AnimateLink target="_blank" to={`${CMS_URL}/RentalsBanners`} className="blue-1">Rentals Banners</AnimateLink> collection to manage banners on your site.
                    </p>
                    <p className='black-1'>Usage:</p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <span className='blue-1'>Basic Fields:</span> Use the following fields to configure banner content:
                                <ul>
                                    <li><span className='code'>Title:</span> Enter the main title for the banner.</li>
                                    <li><span className='code'>Tagline:</span> Add a supporting tagline or subtitle.</li>
                                    <li><span className='code'>Background Image:</span> Upload an image for the banner's background.</li>
                                    <li><span className='code'>Button Label:</span> Specify the text for the call-to-action button.</li>
                                    <li><span className='code'>Button Action:</span> Define the link or action triggered by the button.</li>
                                    <li><span className='code'>Show Arrow (button):</span> Toggle to show or hide an arrow icon on the button.</li>
                                    <li><span className='code'>Type:</span> Select the banner design type ("1" or "2").</li>
                                </ul>
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <span className='blue-1'>Advanced Fields:</span> Configure the banner further using these fields, They are programmed to display banners based on their score, calculated using the Advanced fields:

                                <ul>
                                    <li><span className='code'>Priority:</span> Define the display priority of the banner.</li>
                                    <li><span className='code'>Desired Position:</span> Specify the banner's intended placement on the page, applicable when a category matches.</li>
                                    <li><span className='code'>Categories:</span> Assign categories to prioritize the banner's visibility within those categories.</li>
                                </ul>
                            </p>
                        </li>
                    </ul>
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