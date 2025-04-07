"use client";

import { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { fetchProductsForSets } from '@/Services/AdminApis';
import debounce from 'lodash/debounce';

export const CustomSelect = ({
    activeSet,
    label,
    placeholder,
    onChange,
    selectedValue,
    type,
    productsSet = [],
    mainProduct
}) => {

    const formatProductOptions = (products) =>
        products.map(({ subCategoryData = [], product }) => ({
            value: product._id,
            product: product._id,
            slug: product.slug,
            name: product.name,
            image: product.mainMedia,
            label: product.name,
            categories: subCategoryData.map((cat) => cat["link-copy-of-category-name-2"]),
        }));

    const formatVariantOptions = (products) =>
        products.filter(({ product }) => product._id !== mainProduct?.product).flatMap(({ product, variantData, pricingTiers }) => {
            return variantData
                .filter(({ sku }) => sku && !productsSet.some((prod) => prod.variant === sku))
                .map(({ sku, variant }) => ({
                    value: sku,
                    productId: product._id,
                    name: product.name,
                    slug: product.slug,
                    size: variant.size,
                    sku,
                    price: variant.price || product.price,
                    pricingTiers: pricingTiers || [],
                    color: variant.color,
                    image: variant.imageSrc,
                    label: `${product.name}${variant.color ? ` | ${variant.color}` : ""} | ${sku}`,
                }));
        });

    const fetchOptions = async (inputValue) => {
        const products = await fetchProductsForSets({
            query: inputValue,
            notEqual: activeSet?.product,
        });
        return type === "products"
            ? formatProductOptions(products)
            : formatVariantOptions(products);
    };

    const debouncedFetchOptions = useCallback(
        debounce((inputValue, callback) => {
            fetchOptions(inputValue).then(callback);
        }, 500),
        [type, activeSet, mainProduct, productsSet]
    );

    const promiseOptions = (inputValue) => {
        return new Promise((resolve) => {
            debouncedFetchOptions(inputValue, resolve);
        });
    };

    const customStyles = {
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
            '&:hover': {
                borderColor: "var(--blue-1)",
            },
        }),
    };

    return (
        <>
            {label && <label className="fs--30">{label}</label>}
            <AsyncSelect
                noOptionsMessage={({ inputValue }) => inputValue ? "No products found" : "Type to search for products"}
                className="mt-10"
                loadOptions={promiseOptions}
                onChange={onChange}
                value={selectedValue}
                placeholder={placeholder}
                hideSelectedOptions
                styles={customStyles}
            />
        </>
    );
};