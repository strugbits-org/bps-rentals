export const parseArrayFromParams = (queryParams) => {
    if (queryParams) {
        try {
            return JSON.parse(queryParams);
        } catch (error) {
            console.error('Error parsing JSON from query params:', error);
            return [];
        }
    }
    return [];
};
export const extractUniqueColors = (data) => {
    let allColors = [];
    data.forEach(item => {
        allColors = allColors.concat(item.colors);
    });
    const uniqueColors = [...new Set(allColors)];
    return uniqueColors;
}
export const findColor = (data) => {
    return data.filter((x) => x.colorInfo !== undefined).map((x) => x.colorInfo.original)
}
export const formatPrice = (price, quantity) => {
    const currencySymbol = price.formattedAmount.charAt(0);
    const totalPrice = price.amount * quantity;
    const formattedPrice = totalPrice.toFixed(2);
    return `${currencySymbol}${formattedPrice}`;
}
export const extractSlugFromUrl = (url) => {
    const regex = /\/([^\/]+)\/?$/;
    const match = regex.exec(url);
    if (match) {
        return match[0];
    }
    return "";
}

export const calculateTotalCartQuantity = (lineItems) => {
    return lineItems.reduce((total, currentItem) => total + currentItem.quantity, 0);
}

export const setCookie = (key, value) => {
    document.cookie = key + "=" + value + ";";
}

export const findCategoryData = (data, slug) => (data.find(x => x.parentCollection['link-copy-of-category-name-2'] === slug) || data.find((item) => item.level2Collections.some((x) => x['link-copy-of-category-name-2'] === slug))?.level2Collections.find((x) => x['link-copy-of-category-name-2'] === slug));

export const getAllCategoriesPaths = (categoriesData) => {
    const getSlug = (url) => url.match(/\/category\/(.+)/)[1];

    const paths = categoriesData.flatMap(category => {
        const parentCategory = category.parentCollection["link-copy-of-category-name-2"]
            ? [getSlug(category.parentCollection["link-copy-of-category-name-2"])]
            : [];

        const subcategories = category.level2Collections.flatMap(subcategory =>
            subcategory["link-copy-of-category-name-2"]
                ? [getSlug(subcategory["link-copy-of-category-name-2"])]
                : []
        );

        return [...parentCategory, ...subcategories];
    });
    return paths;
}