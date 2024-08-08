import React from 'react'

export const AvailabilityCard = () => {
    return (
        <div
            className="container-available font-2 blue-1 mt-md-40 mt-phone-30"
            data-aos="fadeIn .8s ease-in-out .2s, d:loop"
        >
            <div className="available-title">
                <i className="icon-pin"></i>
                <h3 className="fs--16 fs-phone-14">
                    Available for national delivery (Conditions apply)
                </h3>
            </div>
            <p className="fs--10 fs-tablet-14 mt-5">
                Please note, screen colors may not accurately match actual
                product colors. Also, natural wood items can vary in
                color, grain, and texture, which is part of their unique
                charm.
            </p>
        </div>
    )
}
