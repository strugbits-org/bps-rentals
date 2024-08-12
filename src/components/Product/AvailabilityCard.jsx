import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

export const AvailabilityCard = ({ selectedVariantData, setUnavailable }) => {
    const [message, setMessage] = useState();
    const [cookies, setCookie] = useCookies(["location"]);
    
    const { location } = selectedVariantData;
    useEffect(() => {
        setUnavailable(false);
        if (location.length === 3) {
            setMessage('Available in San Francisco, Las Vegas, and for National delivery (Conditions apply)');
        } else if (location.length === 2) {
            let arr1 = ["SF", "NT"]
            let arr2 = ["SF", "LV"]
            let arr3 = ["NT", "LV"]

            let allValuesInArr1ExistInLoc = arr1.every(value => location.includes(value));
            let allValuesInArr2ExistInLoc = arr2.every(value => location.includes(value));
            let allValuesInArr3ExistInLoc = arr3.every(value => location.includes(value));

            if (allValuesInArr1ExistInLoc) setMessage('Available in San Francisco, and for National delivery (Conditions apply)')
            if (allValuesInArr2ExistInLoc) setMessage('Available in San Francisco, Las Vegas')
            if (allValuesInArr3ExistInLoc) setMessage('Available in Las Vegas, and for National delivery (Conditions apply)')
        } else if (location.length === 1) {
            const options = {
                "SF": 'in San Francisco',
                "LV": 'in Las Vegas',
                "NT": 'for National delivery (Conditions apply)'
            };
            setMessage(`Available ${options[location[0]]}`);
        } else {
            const options = {
                "SF": 'San Francisco',
                "LV": 'Las Vegas',
                "NT": 'National'
            };
            setMessage(`Not Available in ${options[cookies.location]}`);
            setUnavailable(true);
        }
    }, [location, cookies])

    return (
        <div
            className="container-available font-2 blue-1 mt-md-40 mt-phone-30"
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
