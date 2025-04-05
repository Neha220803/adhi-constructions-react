import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./serviceLocations.css";

// Import images
import locationImg1 from "../../assets/images/queens.png";
import locationImg2 from "../../assets/images/suffolk.png";
import locationImg3 from "../../assets/images/nassau.png";
import logoOverlay from "../../assets/images/about-1.jpg"; // For the watermark

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ServiceLocations = () => {
  // Refs for each location image
  const queensRef = useRef(null);
  const suffolkRef = useRef(null);
  const nassauRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set up animations once components are mounted
    const setupAnimations = () => {
      // Create a batch of scroll triggers for all images
      const images = [
        {
          element: queensRef.current,
          parentContainer: queensRef.current.parentNode,
        },
        {
          element: suffolkRef.current,
          parentContainer: suffolkRef.current.parentNode,
        },
        {
          element: nassauRef.current,
          parentContainer: nassauRef.current.parentNode,
        },
      ];

      images.forEach((image) => {
        // Set initial scale to 1.2 (zoomed in)
        gsap.set(image.element, {
          scale: 1.5,
          opacity: 1,
          transformOrigin: "center center",
        });

        // Create the scale down animation tied to scroll
        gsap.to(image.element, {
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentContainer,
            start: "top bottom", // starts when top of element reaches bottom of viewport
            end: "center center", // ends when center of element reaches center of viewport
            scrub: 0.5, // smoother scrubbing effect
          },
        });
      });

      // Entry animation for text elements
      const textElements =
        sectionRef.current.querySelectorAll(".animate-entry");
      textElements.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    // Wait a small moment for everything to be properly rendered
    const timer = setTimeout(setupAnimations, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="service-locations-section" ref={sectionRef}>
      <Container>
        <Row>
          <Col>
            <div className="section-heading animate-entry">
              OUR expertise -
              <span className="section-heading-active">
                At ADHI Construction,
              </span>{" "}
              We proudly serve Queens, Nassau County, and Suffolk County,
              ensuring HIGH QUALITY craftsmanship, timely project execution, and
              full compliance with local regulations.
            </div>
          </Col>
        </Row>

        <Row className="location-cards-container">
          {/* Left Column */}
          <Col md={6} className="d-flex flex-column">
            {/* Queens Card */}
            <div className="location-card mb-4">
              <div className="card-image-wrapper">
                <div className="card-image-inner" ref={queensRef}>
                  <img src={locationImg1} alt="Queens" className="card-image" />
                </div>
                <div className="location-label">QUEENS</div>
              </div>
            </div>

            {/* Nassau Card */}
            <div className="location-card">
              <div className="card-image-wrapper">
                <div className="card-image-inner" ref={nassauRef}>
                  <img
                    src={locationImg3}
                    alt="Nassau County"
                    className="card-image"
                  />
                </div>
                <div className="location-label">NASSAU COUNTY</div>
              </div>
            </div>
          </Col>

          {/* Right Column - Suffolk */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="location-card">
              <div className="card-image-wrapper">
                <div className="card-image-inner" ref={suffolkRef}>
                  <img
                    src={locationImg2}
                    alt="Suffolk County"
                    className="card-image"
                  />
                </div>
                <div className="location-label">SUFFOLK COUNTY</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceLocations;
