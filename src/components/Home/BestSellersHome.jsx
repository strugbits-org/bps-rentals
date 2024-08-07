'use client';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '../Common/CustomButton';
import ProductCard from '../Category/ProductCard';
import CartModal from '../Common/Modals/CartModal';
// import { ApiKeyStrategy, createClient } from '@wix/sdk';
// import { items } from "@wix/data";

const BestSellersHome = ({ products, content }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantChange = (index, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [index]: variant,
    }));
  };

  // const testCall = async () => {
  //   const wixClient = createClient({
  //     modules: {
  //       items,
  //     },
  //     auth: ApiKeyStrategy({
  //       siteId: "79d86157-d25d-4ab5-b416-93045c059dbe",
  //       apiKey: "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQwMDJjMGZlLTRiMzktNDI1ZC05MDg2LTBjZDQ5ZTE5MTIzMlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjk0MGJhNjgyLWM0MmYtNDhjZS04NTAxLTRmZmE4MTFiODI2M1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI2MjYwNzVjOC04ZjMxLTQ0YjAtYmQ2NS1lNTg1OWU4ZTA5YTZcIn19IiwiaWF0IjoxNzIyODQ4NTI1fQ.Olz7Zdltuymj3W9n4lK-SJVrccH5hkO-GVsA0cMPqex9BxDEeDXcIAmLfpBy2QhDWXf-mvN5VXPnzuS7HDD1nPDhxaEPcOljgD1_jec-O8S1I5a6zpE9t6Yjjulj9hfjv-5m9KxUnKrATEU1XfGrVnTeITidZ26KQImRxcmxxn24Ahyuh4q2CresegSBfxWfbfYY0O4wrYNlzvldOMhc-qreMvFVF0PIO47KMqVuLSk62ig72baNLt7f0I3TouCCcuVSltQvDaIRIxFXwj1DboG3NSpf9CAHZQRky_SZVp_QXXyt0_5SjAJhIoQ32jIQoTMI1JbO4Cm1UN2PyMqtww",
  //     }),
  //   });
  //   const memberData = await wixClient.items
  //     .queryDataItems({
  //       dataCollectionId: "Members/PrivateMembersData",
  //     })
  //     .eq("userEmail", "leo.hudson210@gmail.com")
  //     .find();
  //   console.log(memberData, ";memberData");
  // }
  // useEffect(() => {
  //   testCall();
  // }, [])

  return (
    <>
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
                      const { product, variantData } = item;
                      return (
                        <div key={index} className="swiper-slide">
                          <ProductCard
                            key={index}
                            index={index}
                            product={product}
                            variantData={variantData}
                            selectedVariant={
                              selectedVariants[index] || variantData[0]
                            }
                            handleVariantChange={handleVariantChange}
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
    </>
  );
};

export default BestSellersHome;
