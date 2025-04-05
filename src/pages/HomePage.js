// HomePage.js
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderComp from "../sections/header/header";
import AboutUsSection from "../sections/about-us/AboutUs";
import SolutionsSection from "../sections/solutions/solutions";
import ServicesSection from "../sections/our-services/services";
import ExpertiseSection from "../sections/expertise/expertise";
import Footer from "../components/footer/footer";
import ServiceLocations from "../sections/service-location/serviceLocations";
import ContactUsComp from "../sections/contact-us/contactUs";

const HomePage = () => {
  useEffect(() => {
    // Force GSAP to refresh any ScrollTriggers after component mounts
    gsap.registerPlugin(ScrollTrigger);

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeaderComp />
      <div className="content-container">
        <SolutionsSection />
        <AboutUsSection />
        <ServicesSection />
        <ExpertiseSection />
        <ServiceLocations />
        <ContactUsComp />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
