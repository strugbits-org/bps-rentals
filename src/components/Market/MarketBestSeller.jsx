import ProductCard from '../Category/ProductCard';

export const MarketBestSeller = ({ products, savedProductsData, setSavedProductsData, getSelectedProductSnapShots, pageLimit, handleAutoSeeMore, savePageState }) => {
    if (products.length === 0) return;

    return (
        <>
            <section className="market-products pb-lg-225 pb-tablet-100 pb-phone-170">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <ul className="market-products-list">
                                {products && products.slice(0, pageLimit).map((item, index) => {
                                    return (
                                        <li key={index} className="list-item">
                                            <ProductCard
                                                onProductRedirect={savePageState}
                                                key={index}
                                                productData={item}
                                                getSelectedProductSnapShots={getSelectedProductSnapShots}
                                                savedProductsData={savedProductsData}
                                                setSavedProductsData={setSavedProductsData}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            {pageLimit < products.length && (
                                <div className="flex-center">
                                    {/* <AutoClickWrapper onIntersect={handleAutoSeeMore}> */}
                                    <button
                                        onClick={handleAutoSeeMore}
                                        className="btn-border-blue mt-lg-90 mt-tablet-40 mt-phone-50"
                                    >
                                        <span>See more</span>
                                    </button>
                                    {/* </AutoClickWrapper> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
