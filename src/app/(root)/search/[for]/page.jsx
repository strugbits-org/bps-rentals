import SearchPage from "@/components/Search/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  getAllColorsData,
  getProductsByCategory,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData } from "@/Services/SectionsApis";

export default async function Page({params}) {

  const [
    homePageContent,
    bannersData,
    locations,
    marketsData,
    colorsData,
    productsData,
    ] = await Promise.all([
      getHomeSectionDetails(),
      getRentalsBanners(),
      getFilterLocations(),
      getMarketsData(),
      getAllColorsData(),
      getProductsByCategory({ searchTerm: params.for }),
    ]);

  return (
    <SearchPage
      pageContent={homePageContent}
      bannersData={bannersData}
      locations={locations}
      marketsData={marketsData}
      colorsData={colorsData}
      productsData={productsData}
    />
  );
}
