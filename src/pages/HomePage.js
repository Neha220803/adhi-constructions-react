import React from "react";
import HeaderComp from "../sections/header/header";
import AboutUsSection from "../sections/about-us/AboutUs";
import SolutionsSection from "../sections/solutions/solutions";

const HomePage = () => {
  return (
    <div>
      <HeaderComp />
      <AboutUsSection />
      <SolutionsSection />
    </div>
  );
};

export default HomePage;
