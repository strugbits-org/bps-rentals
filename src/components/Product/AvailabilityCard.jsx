import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

export const AvailabilityCard = ({ selectedVariantData, setUnavailable }) => {
    const [message, setMessage] = useState();
    const [cookies, setCookie] = useCookies(["location"]);
    
    const { location } = selectedVariantData;
    useEffect(() => {
        setUnavailable(false);
    
        const options = {
            "SF": 'San Francisco',
            "LV": 'Las Vegas',
            "NT": 'National delivery (Conditions apply)',
        };
    
        const messages = {
            "SF,LV,NT": `Available in San Francisco, Las Vegas, and for National delivery (Conditions apply)`,
            "SF,NT": `Available in San Francisco, and for National delivery (Conditions apply)`,
            "SF,LV": `Available in San Francisco, Las Vegas`,
            "LV,NT": `Available in Las Vegas, and for National delivery (Conditions apply)`,
        };
    
        const locationKey = location.sort().join(',');
    
        if (locationKey in messages) {
            setMessage(messages[locationKey]);
        } else if (location.length === 1) {
            setMessage(`Available in ${options[location[0]]}`);
        } else {
            setMessage(`Not Available in ${options[cookies.location]}`);
            setUnavailable(true);
        }
    }, [location, cookies]);
    
    return (
        <div
            className="container-available font-2 blue-1 mt-md-40 mt-phone-30"
            data-aos="fadeIn .8s ease-in-out .2s, d:loop"
        >
            {message && (
                <div className="available-title">
                    <i className="icon-pin"></i>
                    <h3 className="fs--16 fs-phone-14">
                        {message}
                    </h3>
                </div>
            )}
            <p className="fs--10 fs-tablet-14 mt-5">
                Please note, screen colors may not accurately match actual
                product colors. Also, natural wood items can vary in
                color, grain, and texture, which is part of their unique
                charm.
            </p>
        </div>
    )
}
