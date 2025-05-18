import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuConstruction } from "react-icons/lu";
import "./footer.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerContainerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Initial setup - start footer container off-screen
    gsap.set(footerContainerRef.current, { yPercent: -50 });

    // Create animation timeline
    const uncover = gsap.timeline({ paused: true });
    uncover.to(footerContainerRef.current, { yPercent: 0, ease: "none" });

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "+=75%",
      animation: uncover,
      scrub: true,
    });

    // Cleanup on component unmount
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container " ref={footerContainerRef}>
        <div className="footer-row container">
          <div className="logo">
            Let's Build Together! <br></br> Contact us today to discuss your
            construction needs.
          </div>
        </div>

        <div className="footer-row center">
          <div className="items container">
            <a className="item" href="#home">
              Home
            </a>
            <a className="item" href="#about">
              About Us
            </a>
            <a className="item" href="#our-services">
              Services
            </a>
            <a className="item" href="#expertise">
              Our Expertise
            </a>
          </div>

          <div className="circles">
            <LuConstruction className="footer-icon" />
          </div>
        </div>

        <div className="footer-row container">
          <div className="foot">Adhi Constructions</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
