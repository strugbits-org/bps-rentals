import SearchPage from "@/components/Search/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchBestSellers,
  getAllColorsData,
  getAllProducts,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData } from "@/Services/SectionsApis";

export default async function Page({ params }) {
  
  const searchTerm = decodeURIComponent(params.for);

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
    getAllProducts({ searchTerm }),
  ]);

  return (
    <SearchPage
      searchFor={searchTerm}
      pageContent={homePageContent}
      bannersData={bannersData}
      locations={locations}
      marketsData={marketsData}
      colorsData={colorsData}
      bestSeller={bestSeller}
      productsData={productsData}
    />
  );
}

export const dynamic = 'force-static'