"use client"
import React from 'react'
import Select from 'react-select'

export const CustomSelect = ({ options, label, placeholder, onChange }) => {

    const handleOnChange = (e) => {
        onChange(e)
    };

    return (
        <>
            {label && <label className="fs--20 mb-20">{label}</label>}
            <Select
                onChange={handleOnChange}
                options={options}
                placeholder={placeholder}
                hideSelectedOptions={true}
                styles={{
                    menu: (base) => ({ ...base, fontSize: "18px" }),
                    singleValue: (base) => ({ ...base, color: "var(--blue-1)" }),
                    placeholder: (base) => ({ ...base, color: "var(--blue-3)" }),
                    indicatorSeparator: (base) => ({ ...base, backgroundColor: "var(--blue-1)" }),
                    dropdownIndicator: (base) => ({ ...base, color: "var(--blue-1)" }),
                    input: (base) => ({ ...base, color: "var(--blue-1)" }),
                    noOptionsMessage: (base) => ({ ...base, color: "var(--blue-3)" }),
                    control: (base) => ({
                        ...base,
                        fontSize: "18px",
                        padding: "4px 8px",
                        border: "2px solid var(--blue-1)",
                        boxShadow: "none",
                        "&:hover": {
                            borderColor: "var(--blue-1)",
                        },
                    }),
                }}
            />
        </>
    )
}
