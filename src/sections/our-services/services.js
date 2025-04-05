import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { gsap } from "gsap";
import "./services.css";

// Import images
import serviceImg1 from "../../assets/images/service-1.png";
import serviceImg2 from "../../assets/images/service-2.png";
import serviceImg3 from "../../assets/images/service-3.png";
import serviceImg4 from "../../assets/images/service-4.png";

const ServicesSection = () => {
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
      title: "CERTIFIED TRADE SERVICES",
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

  // Function to show details for a specific service
  const showDetails = (index) => {
    const wrapper = wrapperRefs.current[index];
    if (wrapper) {
      gsap.to(wrapper, {
        duration: 0.6,
        x: "-50%",
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  // Function to hide details for a specific service
  const hideDetails = (index) => {
    const wrapper = wrapperRefs.current[index];
    if (wrapper) {
      gsap.to(wrapper, {
        duration: 0.6,
        x: "0%",
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <div className="section-heading mb-5 pb-2">
            OUR SERVICES -
            <span className="section-heading-active">
              WE PROVIDE TOP NOTCH SERVICES
            </span>
            At ADHI Construction, we provide a full range of construction
            solutions to meet the needs of residential, commercial, AND
            industrial industrial projects. Our services include:
          </div>
        </Row>

        {/* Services stacked vertically */}
        {services.map((service, index) => (
          <Row className="service-item-container mb-5" key={service.id}>
            <Col xs={12}>
              <div className="carousel-container">
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
                            <Col xs={5} className="">
                              <div className="content-col main-slide-col-1 d-flex align-items-center justify-content-center">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="img-fluid rounded-4 shadow"
                                />
                              </div>
                            </Col>
                            <Col xs={6}>
                              <div className="content-col main-slide-col-2 text-start">
                                <div className="service-main-title ">
                                  {service.title}
                                </div>
                              </div>
                            </Col>
                            <Col
                              xs={1}
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
                            <Col xs={5}>
                              <div className="content-col right-slide-col-1 d-flex align-items-center justify-content-center">
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="img-fluid rounded-4 shadow"
                                />
                              </div>
                            </Col>
                            <Col xs={6}>
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
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default ServicesSection;
