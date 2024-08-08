import AnimateLink from "./AnimateLink";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Breadcrumb = ({ selectedProductDetails }) => {
  const router = useRouter();
  const [breadcrumbData, setBreadcrumbData] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      let breadcrumbs = [];

      if (router.components["/products"]?.query?.collection === "all") {
        breadcrumbs = [];
      }
      if (
        ["legacy", "classic-vegas", "paddock", "neon-house"].includes(
          router.components["/products"]?.query?.collection
        )
      ) {
        breadcrumbs.push({
          name: router.components["/products"]?.query.collection,
          href: `/collections/${router.components["/products"]?.query.collection}`,
        });
      }

      const categoryID = router.components["/products"]?.query?.category;

      // Iterate over subcategoryData
      for (const subcategory of selectedProductDetails.subCategoryData) {
        // Check if the categoryID matches the _id in subcategory
        if (categoryID === subcategory._id) {
          breadcrumbs.push({
            name: subcategory.name,
            href: `/products?collection=${router.components["/products"]?.query.collection}&category=${router.components["/products"]?.query.category}`,
          });
        }
      }
      setBreadcrumbData(breadcrumbs);
    }
  }, [router.query, selectedProductDetails]);
  return (
    <ul className="list-breadcrumb" data-aos="fadeIn .8s ease-in-out">
      {breadcrumbData.map((data, index) => {
        const { name, href } = data;
        return (
          <li key={index} className="list-breadcrumb-item">
            <AnimateLink to={href} className="breadcrumb">
              <span>{name}</span>
            </AnimateLink>
          </li>
        );
      })}
    </ul>
  );
};
export default Breadcrumb;
