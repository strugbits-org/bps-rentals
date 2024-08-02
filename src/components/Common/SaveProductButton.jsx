import { useState, useEffect } from 'react';

import { saveProduct, unSaveProduct } from '@/Services/ProductsApis';
import useUserData from '@/Hooks/useUserData';

export const SaveProductButton = ({
  productData,
  dataAos,
  savedProductsData,
  setSavedProductsData,
}) => {
  const [productSaved, setProductSaved] = useState(false);
  const [error, setError] = useState('');
  const { memberId } = useUserData();
  const productId = productData?._id;
  // console.log(savedProductsData, 'savedProductsData');
  useEffect(() => {
    if (savedProductsData?.length) {
      setProductSaved(savedProductsData?.some((i) => i?._id === productId));
    }
  }, [memberId, savedProductsData]);

  const handleProductSaveToggle = async (productId, isSaving) => {
    try {
      setProductSaved(isSaving);
      updateSavedProducts(productId);
      if (isSaving) {
        await saveProduct(productId);
      } else {
        await unSaveProduct(productId);
      }
    } catch (error) {
      console.error(
        `Error ${isSaving ? 'saving' : 'unsaving'} product:`,
        error
      );
      updateSavedProducts(productId);
      if (isSaving) {
        setError('saving');
        setProductSaved(false);
      } else {
        setError('unsaving');
        setProductSaved(true);
      }
    }
  };

  const updateSavedProducts = (productId) => {
    if (setSavedProductsData) {
      if (savedProductsData.findIndex((x) => x._id === productId) !== -1) {
        const data = savedProductsData.filter((x) => x._id !== productId);
        setSavedProductsData(data);
      } else {
        const data = [...savedProductsData, productData];
        setSavedProductsData(data);
      }
    }
  };

  const handleClick = () => {
    handleProductSaveToggle(productId, !productSaved);
  };

  const buttonProps = {
    className: `btn-bookmark aos-animate 
    ${error === '' && productSaved ? 'productSavedColor' : ''}
    ${error === 'saving' && productSaved ? 'productSavedColor' : ''}
    ${error === 'unsaving' && productSaved ? 'productSavedColor' : ''}`,
    onClick: handleClick,
    ...(dataAos && { 'data-aos': dataAos }),
  };

  return (
    <button type="button" {...buttonProps}>
      <i className="icon-bookmark"></i>
      <i className="icon-bookmark-full"></i>
    </button>
  );
};
