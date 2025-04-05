import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AboutUs.css";

// Import images
import aboutImg1 from "../../assets/images/about-1.jpg";
import aboutImg2 from "../../assets/images/about-2.jpg";

const AboutUsSection = () => {
  const bottomContainerRef = useRef(null);

  useEffect(() => {
    // Set initial state for the container
    gsap.set(bottomContainerRef.current, {
      x: -100,
      opacity: 0,
    });

    // Create the animation with scroll trigger
    const animation = gsap.to(bottomContainerRef.current, {
      duration: 1.2,
      x: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bottomContainerRef.current,
        start: "top bottom-=50",
        end: "bottom center",
        toggleActions: "play none none reverse",
        once: false,
        markers: false,
      },
    });

    // Cleanup on component unmount
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, []);

  return (
    <section className="bg-primar">
      <div className="container">
        <div className="row">
          <div className="section-heading mb-5 pb-2">
            WHO WE ARE -
            <span className="section-heading-active">
              Founded with a commitment
            </span>
            TO excellence, ADHI Construction brings a WEALTH OF
            <span className="section-heading-active">
              experienceD and a dedicated team
            </span>
            of PROFESSIONALS TO EVERY project. Our expertise SPANS
            <span className="section-heading-active">
              COMMERCIAL, residential, healthcare, institutional, and retail
            </span>
            sectors, ensuring that we meet the UNIQUE
            <span className="section-heading-active">
              {" "}
              NEEDS OF each client.
            </span>
          </div>
        </div>
      </div>
      <div className="row who-are-we-bottom-container" ref={bottomContainerRef}>
        <div className="col-md-3 col-12 d-flex justify-content-md-end align-items-end">
          <button className="common-button d-flex px-2">
            <i className="fa fa-arrow-right"></i>
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
