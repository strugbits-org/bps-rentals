"use client"
import React, { useEffect, useState } from 'react'
import AnimateLink from './AnimateLink';
import { useCookies } from "react-cookie";
import { closeLocationsDropdown } from '@/Utils/AnimationFunctions';

 const LocationsFilter = ({ locations }) => {
   const [cookies, setCookie] = useCookies(["location"]);
   const [selectedLocation, setSelectedLocation] = useState();

   const handleLocationChange = (value) => {
     setCookie("location", value, { path: "/" });
     setTimeout(closeLocationsDropdown, 200);
   };

   useEffect(() => {
     if (!cookies.location) {
       setCookie("location", "NT", { path: "/" });
     }
     setSelectedLocation(locations.find((x) => x.value === cookies.location));
   }, [cookies]);

   return (
     <li className="local-item accordion-item">
       <div className="accordion-header custom-close location-dropdown">
         <i className="icon-pin"></i>
         <span>{selectedLocation && selectedLocation.label}</span>
       </div>
       <div className="accordion-content">
         <ul>
           {locations.map((data, index) => {
             return (
               <li
                 key={index}
                 onClick={() => {
                   handleLocationChange(data.value);
                 }}
               >
                 <AnimateLink>{data.label}</AnimateLink>
               </li>
             );
           })}
         </ul>
       </div>
     </li>
   );
 };
 export default LocationsFilter;