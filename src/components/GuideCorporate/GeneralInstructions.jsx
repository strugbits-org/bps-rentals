import React from 'react'
import AnimateLink from '../Common/AnimateLink'

export const GeneralInstructions = ({ DASHBOARD_URL }) => {

    const CMS_URL = `${DASHBOARD_URL}/database/data`;

    return (
        <>
            <h2 className="black-1">General Instructions</h2>

            {/* CHATBOT */}
            <h3>Chatbot Configuration</h3>
            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/ChatbotConfiguration`} className="blue-1">Chatbot Configuration</AnimateLink> collection to manage your site's chatbot settings.</p>
            <p className="black-1">Usage:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>Add Chat Box:</span> Add your chat box script to the <span className='code'>Widget</span> field. Then, define your site's origin URL (the base URL from your environment) in the <span className='code'>Origin (Base URL)</span> field for it to display correctly.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>Toggle Chat Box:</span> Toggle the chat box on or off by using the <span className='code'>Enable Chatbot</span> field.
                    </p>
                </li>
            </ul>

            {/* CHATBOT EVENT TRIGGERS */}
            <h3>Chatbot Event Triggers</h3>
            <p className="black-1">You can use the <AnimateLink target="_blank" to={`${CMS_URL}/ChatWidgetTriggerRentals`} className="blue-1">Chatbot Event Triggers (Rentals)</AnimateLink> collection to manage your site's chatbot event triggers.</p>

            <p className="black-1">Usage:</p>
            <ul>
                <li>
                    <p className="black-1">

                        <li>
                            <span className='blue-1'>Add Event Trigger:</span> To set up an event trigger for your page, fill out the <span className='code'>slug</span> field.
                        </li>
                        <li>
                            <span className='blue-1'>Trigger Type:</span> Select the type of event (e.g., 'onScroll', 'onLoad', 'onInactivity').<br />
                        </li>
                        <li>
                            <span className='blue-1'>Value Field:</span> Enter the corresponding value for that trigger (e.g., scroll percentage, inactivity time in seconds, number of seconds after page load, etc.).
                        </li>
                    </p>
                </li>
            </ul>

            <p className="black-1">Trigger Details:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>onScroll:</span> Define the scroll percentage (e.g., 50 for 50%).<br />
                        Trigger the event when the user scrolls a certain percentage of the page.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>onLoad:</span> Specify the number of seconds after which the event should be triggered.<br />
                        Trigger the event after given seconds when the page fully loads.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>onInactivity:</span> Specify the number of seconds of inactivity before the chatbot is triggered.<br />
                        Trigger the event after a specified number of seconds of inactivity.
                    </p>
                </li>
            </ul>

            {/* SEO SETTINGS */}
            <h3>SEO Settings</h3>
            <p className="black-1">You can manage your page SEO settings in the <AnimateLink target="_blank" to={`${CMS_URL}/PageSeoConfiguration`} className="blue-1">Page SEO Configuration</AnimateLink> collection.</p>
            <p className="black-1">Usage:</p>
            <ul>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>Add Page Title and Description:</span> Add the slug of the page you want to manage SEO settings for. Then, define the title and description in the <span className='code'>Title</span> and <span className='code'>Description</span> fields.
                    </p>
                </li>
                <li>
                    <p className="black-1">
                        <span className='blue-1'>Disable Search Engine Indexing:</span> Toggle search engine indexing on or off using the <span className='code'>Disable Search Engine Indexing</span> field. When set to "true," the page will not be indexed by search engines.
                    </p>
                </li>
            </ul>

            {/* Dynamic Fields */}
            <h3 class="black-1">Dynamic Fields</h3>

            <p class="black-1">
                <span className="blue-1">Action or Button Action:</span> These fields can trigger various actions such as navigating to an internal or external link, or opening a modal.
            </p>

            <p class="black-1">Examples of Actions:</p>

            <ul>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Internal Link:</span> Navigates the user to a page within the site. These links start with "/", e.g., <span className="blue-1">/about</span>.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">External Link:</span> Redirects the user to an external website. These links start with "http://" or "https://", e.g., <span className="blue-1">https://blueprintstudios.com</span>.
                    </p>
                </li>
                <li>
                    <p class="black-1">
                        <span class="blue-1">Contact Modals:</span> Triggers contact modal popup. Use <span className="code">modal-contact</span> to open the modal.
                    </p>
                </li>
            </ul>

        </>
    )
}
