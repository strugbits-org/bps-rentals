import SearchPage from "@/components/Search/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchBestSellers,
  getAllColorsData,
  searchProducts,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData, getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

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

export default async function Page({ params }) {
  const searchTerm = decodeURIComponent(params.for);
  const searchFor = searchTerm.toLowerCase();

  try {
    const [
      homePageContent,
      bannersData,
      locations,
      marketsData,
      colorsData,
      bestSeller,
      productsData,
    ] = await Promise.all([
      getHomeSectionDetails(),
      getRentalsBanners(),
      getFilterLocations(),
      getMarketsData(),
      getAllColorsData(),
      fetchBestSellers(),
      searchProducts(searchTerm),
    ]);

    return (
      <SearchPage
        searchFor={searchFor}
        pageContent={homePageContent}
        bannersData={bannersData}
        locations={locations}
        marketsData={marketsData}
        colorsData={colorsData}
        bestSeller={bestSeller}
        productsData={productsData}
      />
    );
  } catch (error) {
    logError("Error fetching Search page data:", error);
  }

}

export const dynamic = 'force-static';