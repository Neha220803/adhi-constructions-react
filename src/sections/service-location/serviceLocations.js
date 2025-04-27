import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { createServiceLocationsAnimation } from "../../animations/pageAnimations";
import "./serviceLocations.css";

// Import images
import locationImg2 from "../../assets/images/suffolk.png";
import locationImg3 from "../../assets/images/nassau.png";

const ServiceLocations = () => {
  // Refs for animation targets - matching the parameters expected by createServiceLocationsAnimation
  const headingRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initialize animation from the separate file
    const cleanup = createServiceLocationsAnimation(headingRef, sectionRef);

    // Cleanup on component unmount
    return cleanup;
  }, []);

  return (
    <section
      className="service-locations-section"
      ref={sectionRef}
      id="locations"
    >
      <Container>
        <Row className="mb-5 px-3 px-md-0">
          <div className="section-heading" ref={headingRef}>
            <div className="text-uppercase">OUR LOCATIONS</div>
            {/* <div className="heading-dash"></div> */}
            <div className="section-text">
              we proudly serve nassau county and suffolk county, ensuring
              <span className="section-heading-active"> high quality</span>{" "}
              craftsmanship, timely project execution, and full compliance with
              local regulations.
            </div>
          </div>
        </Row>

        <Row className="location-cards-container">
          {/* Nassau County */}
          <Col md={6} className="d-flex flex-column justify-content-center">
            <div className="location-card">
              <div className="card-image-wrapper">
                <div className="card-image-inner">
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

          {/* Suffolk County */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="location-card">
              <div className="card-image-wrapper">
                <div className="card-image-inner">
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
