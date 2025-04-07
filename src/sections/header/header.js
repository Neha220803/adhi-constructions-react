// components/header/header.js
import React, { useEffect, useRef } from "react";
import { createHeaderAnimation } from "../../animations/pageAnimations";
import "./header.css";

const HeaderComp = () => {
  const headerRef = useRef(null);
  const headerBgRef = useRef(null);

  useEffect(() => {
    // Initialize the animation from the separate file
    const { cleanup } = createHeaderAnimation(headerRef, headerBgRef);

    // Return cleanup function
    return cleanup;
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
