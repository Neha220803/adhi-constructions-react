// components/header/header.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./header.css";

gsap.registerPlugin(ScrollTrigger);

const HeaderComp = () => {
  const headerRef = useRef(null);
  const headerBgRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
        pinSpacing: true,
        markers: false,
        anticipatePin: 1, // Helps prevent layout shifts
        onLeave: (self) => {
          // Fix for possible stacking context issues
          gsap.set(headerRef.current, { zIndex: 0 });
        },
        onEnterBack: (self) => {
          // Reset z-index when re-entering
          gsap.set(headerRef.current, { zIndex: 1 });
        },
      },
    });

    // Animate the background
    headerTimeline.to(headerBgRef.current, {
      scale: 1.5,
      duration: 1,
      ease: "none",
    });

    // Set up proper cleanup
    return () => {
      if (headerTimeline.scrollTrigger) {
        headerTimeline.scrollTrigger.kill();
      }
      headerTimeline.kill();
    };
  }, []);

  return (
    <div className="header-container" ref={headerRef}>
      <header>
        <div className="header-bg" ref={headerBgRef}></div>
        <div className="container">
          <div className="row">
            <div className="header-content">AADHI CONSTRUCTIONS</div>
          </div>
          <div className="row d-flex align-items-center justify-content-center pt-5">
            {/* <dotlottie-player
              src="https://lottie.host/ebb866f0-5415-44ce-bd3f-6aadef8dca06/VazbD1c4Wq.lottie"
              background="transparent"
              speed="1"
              style={{ width: "100px" }}
              autoplay
            ></dotlottie-player> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComp;
