// components/solutions/solutions.js
import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { createSolutionsAnimation } from "../../animations/pageAnimations";
// Note: Bootstrap styling only - no custom CSS import needed
import "./solutions.css";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import solutionImg2 from "../../assets/images/solu-2.jpg";
import solutionImg3 from "../../assets/images/solu-3.png";

const SolutionsSection = () => {
  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const headingRef = useRef(null);
  const introTextRef = useRef(null);

  useEffect(() => {
    const cleanup = createSolutionsAnimation(
      sectionRef,
      img1Ref,
      img2Ref,
      img3Ref,
      headingRef,
      introTextRef
    );

    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className="min-vh-100">
      <Container className="px-0 h-100">
        <Row className="g-0 h-100 solution-container">
          <Col lg={7} md={7} xs={12} className="">
            <div className="p-4 pb-0 p-md-5 content-wrapper">
              <div>
                <div className="d-flex">
                  {/* <RiDoubleQuotesL
                    style={{ width: "24px", height: "24px" }}
                    className="me-2"
                  /> */}
                  <h2
                    className="section-heading section-heading-active"
                    ref={headingRef}
                  >
                    {" "}
                    YOUR ONE STEP SOLUTION FOR ALL CONSTRUCTION NEEDS
                  </h2>
                  {/* <RiDoubleQuotesR /> */}
                </div>

                <div
                  className="intro-text"
                  ref={introTextRef}
                  style={{ marginBottom: "1.5rem" }}
                >
                  Welcome to ADHI Construction, your trusted partner in building
                  excellence. As a premier general contracting and construction
                  management firm based in New York, we specialize in delivering
                  high-quality projects across a diverse range of sectors.
                </div>
              </div>
              <div>
                <Image
                  src={solutionImg2}
                  fluid
                  className="solu-img rounded"
                  alt="Construction project"
                  id="sol-img2"
                  ref={img2Ref}
                />
              </div>
            </div>
          </Col>
          <Col
            lg={5}
            md={5}
            xs={12}
            className=""
            // style={{ minHeight: "100vh" }}
          >
            <div className="h-100 p-4 p-md-0 d-flex align-items-center justify-content-center right-img-container">
              <Image
                src={solutionImg3}
                className="img-fluid solu-img rounded-4"
                alt="Construction team"
                id="sol-img3"
                ref={img3Ref}
                style={{ objectFit: "cover", marginBottom: 0 }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SolutionsSection;
