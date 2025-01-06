import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const ProductDetailPageInstructions = ({ setTabIndex, DASHBOARD_URL }) => {
    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">Product Details and Shared Sections Overview</h2>
            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Product Details:</span> Basic Product and Variants Details along with the snapshots can be easily managed using the WIX Catalogue. To update product information or remove a product, visit the <AnimateLink className="blue-1" target="_blank" to={`${DASHBOARD_URL}/wix-stores/products`}>Products</AnimateLink> page.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Shared Sections:</span> Certain sections are shared across multiple pages. For detailed guidance, refer to the common collections/sections instructions.
                    </p>
                    <ul>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => setTabIndex(1)}>Markets Section</span>
                                </AnimateLink>: Manage content shared across market-related pages.
                            </p>
                        </li>
                        <li>
                            <p className="black-1">
                                <AnimateLink className="blue-1">
                                    <span onClick={() => setTabIndex(1)}>Let's Get Social Section</span>
                                </AnimateLink>: Customize your social links and shared components.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>

            <h2 className="black-1">Advanced Management Instructions (Admin Panel)</h2>
            <h3 className="blue-1">Manage Product</h3>
            <p className="black-1">
                The Manage Product page in the Admin Panel offers advanced tools for product management. Visit the <AnimateLink target="_blank" to={"https://illumeet.editorx.io/rentalx/account/manage-product"} className="blue-1">Manage Product</AnimateLink> page to perform the following actions:
            </p>

            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Manage Product Variants:</span> You can manage product variants by configuring attributes such as locations, colors, and adding a URL for a 360° view. Additionally, you can select a default variant from the dropdown menu to set it as the primary variant. Please note, the product's visibility will depend on the locations you set for the variant and the user's selected location.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Upload Product Document:</span> Upload a PDF containing relevant details, such as product manuals, guides, or additional resources, to provide comprehensive information to users. This feature is available only to users with the <span className="blue-1">FireproofCertificate</span> badge. To learn more about badges, visit the <AnimateLink className="blue-1"><span onClick={() => setTabIndex(0)}>General Instructions</span></AnimateLink> section.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Upload Fireproof Documents:</span> Attach fireproof certifications or safety compliance documents to meet regulatory standards and enhance customer trust. This feature is available only to users with the <span className="blue-1">Documents</span> badge. To learn more about badges, visit the <AnimateLink className="blue-1"><span onClick={() => setTabIndex(0)}>General Instructions</span></AnimateLink> section.
                    </p>
                </li>
            </ul>

            <h3 className="blue-1">Product Found In</h3>
            <p className="black-1">
                This section displays the categories associated with the product. You can edit these categories on the <AnimateLink className="blue-1" target="_blank" to={`${DASHBOARD_URL}/wix-stores/products`}>Products</AnimateLink> page in the WIX Catalogue.
            </p>


            <h3 className="blue-1">Add Paired Products</h3>
            <p className="black-1">
                To add paired products, log in with an admin account. Then, go to the <AnimateLink target="_blank" to={"https://illumeet.editorx.io/rentalx"} className="blue-1">Old Rentals Website</AnimateLink> and navigate to the product page you want to update. On the product page, locate the <span className="blue-1">Admin</span> button below the "Save" button. Click it to open a dropdown menu and select the <span className="blue-1">Pair it with products</span> option. A modal will appear, allowing you to search for and select products to pair or remove any previously paired products.
            </p>


            <h3 className="blue-1">As Seen In Our Articles (Articles)</h3>
            <p className="black-1">
                Use the <AnimateLink target="_blank" to={"https://illumeet.editorx.io/rentalx/account/reference-blogs"} className="blue-1">Manage Blogs</AnimateLink> page to update the blogs and link products to them. Linked products will be showcased within the blog, and blogs featuring those products will appear in the "As Seen In Our Articles" section on the relevant product pages.
            </p>

            <h3 className="blue-1">Where the product was used (Projects)</h3>
            <p className="black-1">
                Use the <AnimateLink target="_blank" to={"https://illumeet.editorx.io/rentalx/account/reference-projects"} className="blue-1">Manage Projects</AnimateLink> page to update the projects and link products to them. Linked products will be showcased within the project, and projects featuring those products will appear in the "Where the product was used" section on the relevant product pages.
            </p>


            <h2 className="black-1">Product Set</h2>

            <p className="black-1">
                Manage product sets through the <AnimateLink target="_blank" to={"/admin/manage-product-sets"} className="blue-1">Manage Product Sets</AnimateLink> page.
            </p>

            <ul>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Create a Product Set:</span> Click the <span className="blue-1">Create New Set</span> button on the <AnimateLink target="_blank" to={"/admin/manage-product-sets"} className="blue-1">Manage Product Sets</AnimateLink> page to open a modal. In the modal, select the main product, add additional products to include in the set, and specify the quantity for each item. Ensure to click "Save" after adding products to finalize the product set.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className="blue-1">Update a Product Set:</span> Click the <span className="blue-1">Edit</span> button on the Product Set card to open a modal for the product set you wish to update. Modify the main product, set items, or their quantities as needed. Don't forget to save your changes to apply updates.
                    </p>
                </li>
            </ul>

            <p className="black-1">
                <span className="blue-1">Note:</span> You can delete a product set directly from the <AnimateLink target="_blank" to={"/admin/manage-product-sets"} className="blue-1">Manage Product Sets</AnimateLink> page by clicking the "Delete" icon on the product set card.
            </p>

        </>

    )
}