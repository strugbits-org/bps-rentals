import SearchPage from "@/components/Search/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchBestSellers,
  getAllColorsData,
  getAllProducts,
  getProductsKeywords
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData, getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";
import { Suspense } from "react";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("search");
    const { title, noFollowTag } = metaData;

    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(Search page):", error);
  }
}

export default async function Page() {

  try {
    const [
      homePageContent,
      bannersData,
      locations,
      marketsData,
      colorsData,
      bestSeller,
      productKeywords,
      productsData,
    ] = await Promise.all([
      getHomeSectionDetails(),
      getRentalsBanners(),
      getFilterLocations(),
      getMarketsData(),
      getAllColorsData(),
      fetchBestSellers(),
      getProductsKeywords(),
      getAllProducts({}),
    ]);

    return (
      <Suspense>
        <SearchPage
          pageContent={homePageContent}
          bannersData={bannersData}
          locations={locations}
          marketsData={marketsData}
          colorsData={colorsData}
          bestSeller={bestSeller}
          productKeywords={productKeywords}
          fullProductsData={productsData}
        />
      </Suspense>
    );
  } catch (error) {
    logError("Error fetching Search page data:", error);
  }

}