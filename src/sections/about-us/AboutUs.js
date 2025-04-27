import React, { useEffect, useRef } from "react";
import { createAboutUsAnimation } from "../../animations/pageAnimations";
import "./AboutUs.css";

// Import images
import aboutImg1 from "../../assets/images/about-1.jpg";
import aboutImg2 from "../../assets/images/about-2.jpg";
import { FaArrowRight } from "react-icons/fa";

const AboutUsSection = () => {
  const headingRef = useRef(null);
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    // Initialize animation from the separate file
    const cleanup = createAboutUsAnimation(headingRef, bottomContainerRef);

    // Cleanup on component unmount
    return cleanup;
  }, []);

  return (
    <section className="bg-primar">
      <div className="container">
        <div className="row">
          <div className="section-heading d-flex mb-5 pb-2" ref={headingRef}>
            <span className="text-uppercase">WHO WE ARE</span>
            <span className="heading-dash"></span>{" "}
            <span className="section-heading-active">
              FOUNDED WITH A COMMITMENT
            </span>{" "}
            TO EXCELLENCE, ADHI CONSTRUCTION BRINGS A WEALTH OF
            <span className="section-heading-active">
              {" "}
              EXPERIENCED AND A DEDICATED TEAM{" "}
            </span>
            OF PROFESSIONALS TO EVERY PROJECT. OUR EXPERTISE SPANS
            <span className="section-heading-active">
              {" "}
              COMMERCIAL, RESIDENTIAL{" "}
            </span>
            SECTORS, ENSURING THAT WE MEET THE UNIQUE
            <span className="section-heading-active">
              {" "}
              NEEDS OF EACH CLIENT.
            </span>
          </div>
        </div>
      </div>
      <div className="row who-are-we-bottom-container" ref={bottomContainerRef}>
        <div className="col-md-3 col-12 d-flex justify-content-md-end align-items-end ms-2 ms-md-0">
          <button className="common-button d-flex px-2">
            <FaArrowRight />
            <div>Learn more</div>
          </button>
        </div>
        <div className="col-md-5 col-6 d-flex justify-content-end align-items-end">
          <img
            src={aboutImg1}
            className="img-fluid about-img w-100 p-0 m-0"
            alt="Construction project"
            id="abour-img1"
          />
        </div>
        <div className="col-md-4 col-6 bg-dar d-flex justify-content-end align-items-end p-0">
          <img
            src={aboutImg2}
            className="img-fluid about-img w-100 ms-md-4"
            alt="Construction team"
            id="about-img1"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
