import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { gsap } from "gsap";
import { createHeadingAnimation } from "../../animations/pageAnimations";
import "./services.css";

// Import images
import serviceImg1 from "../../assets/images/service-1.png";
import serviceImg2 from "../../assets/images/service-2.png";
import serviceImg3 from "../../assets/images/service-3.png";
import serviceImg4 from "../../assets/images/service-4.png";

const ServicesSection = () => {
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Service data array
  const services = [
    {
      id: 1,
      title: "GENERAL CONSTRUCTION SERVICES",
      image: serviceImg1,
      details: [
        "Home and Office Renovations",
        "Interior and Exterior Re-modelling",
        "Structural Repairs and Additions",
      ],
    },
    {
      id: 2,
      title: "CERTIFIED PLUMBING SERVICES",
      image: serviceImg2,
      details: [
        "Electrical installations and Updates",
        "Plumbing Services and Fixtures",
        "HVAC Installation and Maintanence",
        "Roofing and Waterproofing",
      ],
    },
    {
      id: 3,
      title: "SPECIALIZED CONSTRUCTION SOLUTIONS",
      image: serviceImg3,
      details: [
        "Concrete and Masonary Work",
        "Flooring Installation (Tile, Wood, Vinyl, etc.)",
        "Drywall and Painting",
      ],
    },
    {
      id: 4,
      title: "PROJECT MANAGEMENT AND COMPILANCE",
      image: serviceImg4,
      details: [
        "Construction, Project Planning and Management ",
        "Permit Assistance and Code Compilance",
        "Certificate of Occupancy (CO) Clearence",
        "Site Safety and Inspection Services ",
      ],
    },
  ];

  // Create refs for each card without causing re-renders
  const wrapperRefs = useRef({});

  // Effect for mobile detection and heading animation
  useEffect(() => {
    // Animate heading
    const headingTrigger = createHeadingAnimation(headingRef, {
      animationDirection: "y",
      animationDistance: 30,
      staggerTime: 0.08,
    });

    // Check if mobile and update state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (headingTrigger) headingTrigger.kill();
    };
  }, []);

  // Function to show details for a specific service (desktop behavior)
  const showDetails = (index) => {
    const wrapper = wrapperRefs.current[index];
    if (wrapper) {
      gsap.to(wrapper, {
        duration: 0.5,
        x: "-50%",
        ease: "none",
        force3D: true,
      });
    }
  };

  // Function to hide details for a specific service (desktop behavior)
  const hideDetails = (index) => {
    const wrapper = wrapperRefs.current[index];
    if (wrapper) {
      gsap.to(wrapper, {
        duration: 0.5,
        x: "0%",
        ease: "none",
        force3D: true,
      });
    }
  };

  return (
    <section className="services-section py-5" id="our-services">
      <Container>
        <Row>
          <div className="section-heading d-flex mb-5 pb-2" ref={headingRef}>
            <span className="heading-title-uppercase">OUR SERVICES</span>{" "}
            <span className="heading-dash"></span>{" "}
            <span className="section-heading-active">
              WE PROVIDE TOP NOTCH SERVICES{" "}
            </span>
            At ADHI Construction, we provide a full range of construction
            solutions to meet the needs of residential, commercial projects. Our
            services include
          </div>
        </Row>

        {services.map((service, index) => (
          <Row className="service-item-container mb-5" key={service.id}>
            <Col xs={12}>
              {/* Desktop View */}
              <div className="carousel-container d-none d-md-block">
                <div className="carousel js-carousel">
                  <div className="carousel__slider">
                    <div
                      className="carousel__wrapper"
                      ref={(el) => {
                        wrapperRefs.current[index] = el;
                      }}
                    >
                      {/* Main Slide with service title */}
                      <div
                        className="carousel__item"
                        id={`main-slide-${service.id}`}
                      >
                        <Container>
                          <Row>
                            <Col xs={12} md={4} className="">
                              <div className="content-col main-slide-col-1 d-flex align-items-center justify-content-center">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="img-fluid rounded-4 shadow"
                                />
                              </div>
                            </Col>
                            <Col
                              xs={10}
                              md={6}
                              className="d-flex align-items-center justify-content-start"
                            >
                              <div className="content-col main-slide-col-2 d-flex align-items-center text-start">
                                <div className="service-main-title align-items-center">
                                  {service.title}
                                </div>
                              </div>
                            </Col>
                            <Col
                              xs={2}
                              md={2}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <Button
                                variant="white"
                                className="nav-arrow-in-col rounded-circle"
                                onClick={() => showDetails(index)}
                              >
                                <BsChevronRight size={18} color="#6c757d" />
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </div>

                      {/* Detail Slide with service details */}
                      <div
                        className="carousel__item"
                        id={`detail-slide-${service.id}`}
                      >
                        <Container>
                          <Row>
                            <Col xs={12} md={4}>
                              <div className="content-col right-slide-col-1 d-flex align-items-center justify-content-center">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="img-fluid rounded-4 shadow"
                                />
                              </div>
                            </Col>
                            <Col xs={11} md={6}>
                              <div className="content-col right-slide-col-2 text-start">
                                <ul className="service-list">
                                  {service.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                  ))}
                                </ul>
                              </div>
                            </Col>
                            <Col
                              xs={1}
                              md={2}
                              className="d-flex align-items-center justify-content-center"
                            >
                              <Button
                                variant="white"
                                className="nav-arrow-in-col rounded-circle"
                                onClick={() => hideDetails(index)}
                              >
                                <BsChevronLeft size={18} color="#6c757d" />
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modified Mobile View - Displaying details directly without dropdown */}
              <div className="d-md-none">
                <div className="service-card-mobile">
                  <div className="service-card-header mb-3">
                    <Row>
                      <Col xs={12}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="img-fluid rounded-3 service-img-mobile"
                        />
                      </Col>
                      <Col xs={12} className="mt-3">
                        <h3 className="service-title-mobile">
                          {service.title}
                        </h3>
                      </Col>
                    </Row>
                  </div>

                  {/* Always visible service details on mobile */}
                  <div className="service-details-mobile">
                    <ul className="service-list-mobile">
                      {service.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default ServicesSection;
