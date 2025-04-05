import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// SplitType is loaded from CDN in index.html
import "./solutions.css";

// Import images
import solutionImg2 from "../../assets/images/solu-2.jpg";
import solutionImg3 from "../../assets/images/solu-3.png";

const SolutionsSection = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null); // This is for sol-img1 if you have it
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // Set initial states for images
    if (img1Ref.current) {
      gsap.set(img1Ref.current, {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "left top",
      });
    }

    gsap.set(img2Ref.current, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "left bottom",
    });

    gsap.set(img3Ref.current, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    });

    // Create animations that trigger when the section enters the viewport
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%", // Trigger when top of section reaches 80% from top of viewport
      once: true, // Only run once
      onEnter: () => {
        // Animate first image if it exists
        if (img1Ref.current) {
          gsap.to(img1Ref.current, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          });
        }

        // Animate second image from bottom left with slight delay
        gsap.to(img2Ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out",
        });

        // Animate right image from center
        gsap.to(img3Ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: 0.6,
          ease: "power2.out",
        });
      },
    });

    // Section heading animation
    if (headingRef.current && window.SplitType) {
      const text = new window.SplitType(headingRef.current, { types: "lines" });

      gsap.from(text.lines, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 20%",
          markers: false,
        },
        duration: 2,
        opacity: 0,
        x: -100,
        stagger: 0.1,
        ease: "expo.out",
      });
    }

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <div className="container">
        <div className="row solution-container">
          <div className="col-lg-7 col-md-7 col-12 bg-succes">
            <div className="content-wrapper bg-primar h-100">
              <h2
                className="section-heading section-heading-active w-75"
                ref={headingRef}
              >
                "YOUR ONE STEP SOLUTION FOR ALL CONSTRUCTION NEEDS"
              </h2>
              <div className="intro-text">
                Welcome to ADHI Construction, your trusted partner in building
                excellence. As a premier general contracting and construction
                management firm based in New York, we specialize in delivering
                high-quality projects across a diverse range of sectors.
              </div>
              <img
                src={solutionImg2}
                className="img-fluid solu-img"
                alt="Construction project"
                id="sol-img2"
                ref={img2Ref}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-12">
            <div className="right-img-container">
              <img
                src={solutionImg3}
                className="img-fluid solu-img"
                alt="Construction team"
                id="sol-img3"
                ref={img3Ref}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
