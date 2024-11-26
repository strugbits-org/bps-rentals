import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const CommonCollectionsInstructions = ({ DASHBOARD_URL, CMS_URL }) => {
    return (
        <>
            <h2 className="black-1">Common Sections/Collections</h2>

            {/* Section Titles and Descrptions */}
            <h3>Section Titles and Descrptions:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/RentalsHomeSectionDetails`} className="blue-1">Home & Market (Section Details)</AnimateLink> collection to manage section titles and descriptions.</p>

            {/* HEADER */}
            <h3>Header Category Menu:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/HeaderCategoryMenu`} className="blue-1">Header Category Menu</AnimateLink> collection to manage your site's header.</p>
            <p className='black-1'>Usage:</p>
            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Category Name:</span> Select a category from the dropdown menu, which is linked to the categories collection.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Order Number:</span> Specify the order in which the categories should be displayed in the header.
                    </p>
                </li>
            </ul>

            {/* LOCATIONS */}

            <h3>Locations List:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/FilterLocations`} className="blue-1">Locations List</AnimateLink> collection to manage locations dropdown in the header. </p>
            <p class="black-1">
                <span class="blue-1">Important:</span> Do not edit the value field. However, you can freely edit the labels to update how locations appear to users.
            </p>

            {/* SEARCH SECTION DETAILS */}
            <h3>Search Section Details:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/SearchSectionDetails`} className="blue-1">Search Section Details</AnimateLink> collection to modify search section content.</p>

            {/* SOCIAL LINKS */}
            <h3>Social Links:</h3>
            <p className="black-1">Use the <AnimateLink target="_blank" to={`${CMS_URL}/SocialLinks`} className="blue-1">Social Links</AnimateLink> collection to update the social media links throughout the site.</p>
            <p className='black-1'>Usage:</p>
            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Link:</span> Add the link to the social media platform in the <span class="code">Link</span> field.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Icon:</span> Icons are manually coded. To add a new icon, you may need to contact the development team.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Order Number:</span> Specify the order in which the items should be displayed.
                    </p>
                </li>
            </ul>

            {/* MARKETS */}
            <h3>Markets:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/RentalsMarkets`} className="blue-1">Rentals Markets</AnimateLink> collection to manage markets data.</p>
            <p className='black-1'>Usage:</p>
            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Menu Item:</span> Check this box to add the market to the header menu.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Order Number:</span> Specify the order in which the markets should be displayed.
                    </p>
                </li>
            </ul>

            {/* STUDIOS */}
            <h3>Studios:</h3>

            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/StudiosSection`} className="blue-1">Studios</AnimateLink> collection to manage studios data.</p>
            <p className='black-1'><span className='blue-1'>Title and Description:</span> Update the title and description in the <span className='code'>Studio Title</span> and <span className='code'>Studio Description</span> fields. These fields can be found in the <AnimateLink target="_blank" to={`${CMS_URL}/RentalsHomeSectionDetails`} className="blue-1">Home & Market (Section Details)</AnimateLink> collection</p>

            <p className='black-1'>Usage:</p>
            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Menu Item:</span> Check this box to add the studio to the header menu (Max 5 Items).
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Order Number:</span> Specify the order in which the studios should be displayed.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Show in Filters:</span> The selected items will appear as studio options in the filters on the blog and portfolio listing pages.
                    </p>
                </li>
            </ul>

            {/* SOCIAL SECTION */}
            <h3>Let's Get Social:</h3>
            <p className="black-1">Use the <AnimateLink target="_blank" to={`${CMS_URL}/SocialSectionDetails`} className="blue-1">Let's Get Social Section Details</AnimateLink> collection to update the content in the "Let's Get Social" section. You can change the Pinterest Iframe by updating the URL in the <span class="code">Pinterest URL</span> field.</p>

            <p className="black-1"><span class="blue-1">Note:</span> Blogs and Instagram posts are automatically synced with Instagram and the blog, so manual updates may not be possible.</p>


            {/* FOOTER */}
            <h3>Footer:</h3>
            <p className="black-1">Use the <AnimateLink target="_blank" to={`${CMS_URL}/Footer`} className="blue-1">Footer</AnimateLink> collection to update the content in the Footer, Newsletter, including the copyright section.</p>

            {/* FOOTER NAVIGATION MENU */}
            <h3>Footer Navigation Menu:</h3>
            <p className='black-1'>Use the <AnimateLink target="_blank" to={`${CMS_URL}/FooterNavigationMenu`} className="blue-1">Footer Navigation Menu</AnimateLink> collection to manage the links and items displayed in the footer navigation menu.</p>
            <p className='black-1'>Usage:</p>
            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Action:</span> Choose the action to perform when the menu item is clicked, such as opening an internal link, an external link, or triggering a modal (contact the development team for assistance with modals).
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Action Target:</span> Define where the action will open (e.g., in the same tab or a new tab).
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Order Number:</span> Specify the position of the item in the menu by assigning it an order number.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Hidden:</span> Enable this option to hide the menu item from view.
                    </p>
                </li>
            </ul>
            <p className='black-1'>
                <span className='blue-1'><strong>Note:</strong></span> The Rentals and Corporate sites share the same collection for the footer navigation menu. Please ensure menu items are updated accordingly.
            </p>

            {/* FOOTER CONTACT DETAILS */}
            <h3>Footer Contact Details:</h3>
            <p className='black-1'>Use the <AnimateLink target="_blank" to={`${CMS_URL}/ContactDetails`} className="blue-1">Footer Contact Details</AnimateLink> collection to update the contact details in the footer.</p>

        </>
    )
}
