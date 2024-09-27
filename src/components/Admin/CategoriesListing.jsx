"use client";
import { markPageLoaded, updatedWatched } from '@/Utils/AnimationFunctions';
import React, { useEffect, useState } from 'react';
import AnimateLink from '../Common/AnimateLink';
import { ImageWrapper } from '../Common/ImageWrapper';
import { getSlug } from '@/Utils/Utils';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';

export const CategoriesListing = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(data);
    const { role } = useUserData();

    useEffect(() => {
        const updatedCategories = data.filter(category => {
            if (!searchTerm) return true;
            return category.name.toLowerCase().includes(searchTerm);
        });
        setFilteredCategories(updatedCategories);
        updatedWatched();
    }, [searchTerm, data]);

    useEffect(() => {
        setTimeout(markPageLoaded, 500);
    }, [data]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    if (role !== "admin") return <Error404Page inline={true} />

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom d-flex-lg">
                <h1 className="fs--60 blue-1 split-words">
                    Categories
                </h1>
                <div className='search-box align-self-center ml-auto mt-10'>
                    <input
                        placeholder='Search within categories (e.g., Tables, Chairs, New)'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                {filteredCategories.length === 0 ? (
                    <div style={{ margin: '20vh auto' }}>
                        <h6 className="fs--20 text-center split-words">
                            No Categories Found
                        </h6>
                    </div>
                ) : (
                    <ul className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50">
                        {filteredCategories.map((category, index) => {
                            const { name, mainMedia, slug } = category;
                            const link = category.all ? slug : getSlug(category["link-copy-of-category-name-2"]);
                            return (
                                <li key={index} className="grid-item">
                                    <div className="product-link small saved-products active">
                                        <AnimateLink to={"manage-products-sorting/" + link} className="link">
                                            <div className="container-top">
                                                <h2 className="product-title">{name}</h2>
                                            </div>
                                            <div className="wrapper-product-img">
                                                <div className="container-img product-img active">
                                                    <ImageWrapper
                                                        timeout={0}
                                                        key={link}
                                                        defaultDimensions={{ width: 350, height: 350 }}
                                                        url={mainMedia}
                                                    />
                                                </div>
                                            </div>
                                        </AnimateLink>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};
