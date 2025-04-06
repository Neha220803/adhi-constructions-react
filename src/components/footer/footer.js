import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      <div className="footer-container" ref={footerContainerRef}>
        <div className="footer-row">
          <div className="logo"></div>
        </div>

        <div className="footer-row center">
          <div className="items">
            <div className="item"></div>
            <div className="item">Home</div>
            <div className="item">About Us</div>
            <div className="item">Services</div>
            <div className="item">Projects</div>
          </div>

          <div className="circles">
            <div className="circle"></div>
          </div>
        </div>

        <div className="footer-row">
          <div className="foot">Adhi Constructions</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
