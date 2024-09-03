'use client';
import React from 'react';
import { CustomButton } from '../Common/CustomButton';
import ProductCard from '../Category/ProductCard';

const BestSellersHome = ({ products, content, savedProductsData, setSavedProductsData, getSelectedProductSnapShots }) => {

  return (
    <section className="home-best-sellers white-1" data-aos="d:loop">
      <div className="container-fluid">
        <div className="row pb-lg-40 pb-tablet-100 pb-phone-190">
          <div className="col-lg-4 offset-lg-1">
            <div className="container-text pt-lg-65 pt-tablet-25 pt-phone-40">
              <h2 className="fs--60 fw-600 split-chars" data-aos="d:loop">
                {content && content.subTitle}
              </h2>
              <p
                className="d-block fs--40 fs-mobile-18 fw-600 lh-140 pt-10 pt-phone-10"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                {content && content.firstDescription}

                <br />
                {content && content.secondDescription}
              </p>
              <CustomButton
                customClasses={'btn-blue mt-20 no-mobile'}
                data={{
                  label: content.buttonLabel,
                  action: content.buttonAction,
                }}
                attributes={{
                  'data-aos':
                    'd:fadeIn .6s ease-in-out .6s, m:fadeIn .6s ease-in-out 0s, d:loop',
                  'data-cursor-style': 'off',
                }}
              >
                {content && content.buttonLabel}
              </CustomButton>
            </div>
          </div>
          <div className="col-lg-7 mt-phone-5">
            <div className="best-sellers-slider" data-aos>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {products.map((item, index) => {
                    return (
                      <div key={index} className="swiper-slide">
                        <ProductCard
                          key={index}
                          productData={item}
                          getSelectedProductSnapShots={getSelectedProductSnapShots}
                          savedProductsData={savedProductsData}
                          setSavedProductsData={setSavedProductsData}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="swiper-button-prev swiper-button-01 no-mobile"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                <span>
                  <i className="icon-arrow-left-3"></i>
                </span>
              </div>
              <div
                className="swiper-button-next swiper-button-01 no-mobile"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                <span>
                  <i className="icon-arrow-right-3"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-12 no-desktop column-btn">
            <CustomButton
              customClasses={'btn-blue mt-lg-20 mt-mobile-40'}
              data={{
                label: content.buttonLabel,
                action: content.buttonAction,
              }}
            >
              {content && content.buttonLabel}
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellersHome;
