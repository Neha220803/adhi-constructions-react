import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHeadingAnimation } from "../../animations/pageAnimations";
import "./expertise.css";

// Import images
import architecturalImg from "../../assets/images/exp-1.png";
import contractorsImg from "../../assets/images/exp-2.png";
import electricalImg from "../../assets/images/exp-3.png";
import plumbingImg from "../../assets/images/exp-4.png";
import projManage from "../../assets/images/exp-5.png";
import coclearanceImg from "../../assets/images/exp-6.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  // Create refs for each card
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const cardRowRef = useRef(null);
  const flipTimelineRefs = useRef({});
  const [flippedStates, setFlippedStates] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Service data
  const services = [
    {
      id: 1,
      title: "ARCHITECTURAL SERVICES",
      image: architecturalImg,
      description:
        "Our skilled architects bring visionary designs to life, creating functional and aesthetically pleasing spaces, whether it's residential, commercial, or industrial projects. We ensure innovative and sustainable designs that meet your needs while complying with all building codes.",
    },
    {
      id: 2,
      title: "CERTIFIED CONTRACTORS",
      image: contractorsImg,
      description:
        "As a licensed and certified contractor, ADHI Construction guarantees quality craftsmanship on every project. Our experienced team is committed to construction regulations. From initial planning to final execution, we ensure durability, safety, and precision in every project.",
    },
    {
      id: 3,
      title: "CERTIFIED ELECTRICAL SERVICES",
      image: electricalImg,
      description:
        "Our certified electricians provide safe, efficient, and code-compliant electrical installations, upgrades, and repairs. We focus on energy efficiency, seamless integration, and long-term reliability for residential, commercial, and industrial properties.",
    },
    {
      id: 4,
      title: "CERTIFIED PLUMBING SERVICES",
      image: plumbingImg,
      description:
        "Reliable plumbing is essential for any structure, and our certified plumbers deliver top-tier solutions. From piping and drainage to water supply and fixtures, we implement durable, efficient, leak-free, and compliant plumbing systems.",
    },
    {
      id: 5,
      title: "PROJECT MANAGEMENT EXPERTISE",
      image: projManage,
      description:
        "At ADHI Construction, our experienced project managers oversee every aspect of your project, ensuring timely completion, budget management, and quality control. We coordinate with architects, engineers, and subcontractors to streamline operations, mitigate risks, and maintain transparency throughout the construction process.",
    },
    {
      id: 6,
      title: "CO CLEARENCE ASSISTANCE",
      image: coclearanceImg,
      description:
        "We ensure a smooth process for obtaining a Certificate of Occupancy (CO) clearance, which is essential for legally occupying a building. Our team meticulously follows building codes and safety regulations, ensuring all inspections and approvals are met without delays.",
    },
  ];

  useEffect(() => {
    // Check if mobile and update state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Animate heading using our reusable function
    const headingTrigger = createHeadingAnimation(headingRef, {
      animationDirection: "y",
      animationDistance: 30,
      staggerTime: 0.08,
      ease: "power2.out",
    });

    // Set up GSAP for cards
    gsap.set(".expertise-card", {
      transformStyle: "preserve-3d",
      opacity: 0,
      y: 50,
    });

    gsap.set(".expertise-card-back", {
      rotationY: 180,
      backfaceVisibility: "hidden",
    });

    gsap.set(".expertise-card-front", {
      backfaceVisibility: "hidden",
    });

    // Create entrance animation for cards
    const cardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: cardRowRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // Animate each card in staggered
    cardsTimeline.to(".expertise-card", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Create flip timelines for each card
    services.forEach((service, index) => {
      if (cardsRef.current[index]) {
        const card = cardsRef.current[index];
        // Create a new timeline for each card
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { duration: 0.6, rotationY: 180, ease: "power2.inOut" });
        flipTimelineRefs.current[service.id] = tl;
      }
    });

    // Cleanup
    return () => {
      if (headingTrigger) headingTrigger.kill();
      if (cardsTimeline.scrollTrigger) cardsTimeline.scrollTrigger.kill();
      cardsTimeline.kill();

      Object.values(flipTimelineRefs.current).forEach((tl) => {
        if (tl) tl.kill();
      });

      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Reset refs array when component re-renders
  useEffect(() => {
    cardsRef.current = [];
  }, []);

  // Add to refs array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Handle mouse events for desktop
  const handleMouseEnter = (service) => {
    if (!isMobile) {
      const tl = flipTimelineRefs.current[service.id];
      if (tl) {
        tl.play();
      }
    }
  };

  const handleMouseLeave = (service) => {
    if (!isMobile) {
      const tl = flipTimelineRefs.current[service.id];
      if (tl) {
        tl.reverse();
      }
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e, service) => {
    if (isMobile) {
      e.preventDefault();
      const serviceId = service.id;
      const tl = flipTimelineRefs.current[serviceId];

      if (tl) {
        // Check if this card is currently flipped
        const isCurrentlyFlipped = flippedStates[serviceId];

        if (isCurrentlyFlipped) {
          // If it's flipped, reverse the animation
          tl.reverse();
        } else {
          // If it's not flipped, play the animation
          tl.play();
        }

        // Update the flipped state
        setFlippedStates((prev) => ({
          ...prev,
          [serviceId]: !isCurrentlyFlipped,
        }));
      }
    }
  };

  return (
    <section className="expertise-section py-5" id="expertise">
      <Container>
        <Row className="mb-5 px-3 px-md-0">
          <div className="section-heading d-flex mb-5 pb-2" ref={headingRef}>
            <span className="heading-title-uppercase">OUR expertise</span>{" "}
            <span className="heading-dash"></span>{" "}
            <span className="section-heading-active">
              At ADHI Construction,{" "}
            </span>
            we take pride in delivering high quality constructionservices backed
            by a team of{" "}
            <span className="section-heading-active">
              certified professionals
            </span>
            . From design to execution, we ensure that every Project meets{" "}
            <span className="section-heading-active">
              design standards, safety regulations
            </span>{" "}
            and compliance requirements including certificate of occupancy (CO)
            clearance for a seamless hassle free experience.
          </div>
        </Row>

        <Row className="gy-4" ref={cardRowRef}>
          {services.map((service, index) => (
            <Col md={6} lg={4} key={service.id} className="mb-4">
              <div className="expertise-card-container">
                <div
                  className="expertise-card"
                  ref={addToRefs}
                  onMouseEnter={() => handleMouseEnter(service)}
                  onMouseLeave={() => handleMouseLeave(service)}
                  onTouchStart={(e) => handleTouchStart(e, service)}
                >
                  {/* Front of card */}
                  <div className="expertise-card-front">
                    <div className="expertise-card-inner">
                      <div className="expertise-image-container">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="expertise-image"
                        />
                      </div>
                      <div className="expertise-title-container">
                        <h3 className="expertise-title">{service.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="expertise-card-back">
                    <div className="expertise-card-inner">
                      <div className="expertise-description">
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ExpertiseSection;
