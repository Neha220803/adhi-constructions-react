import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./nav.css";

const Navigation = () => {
  // Use refs to store the timeline and DOM elements
  const tlRef = useRef();
  const navContainerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Initialize the timeline
    tlRef.current = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      paused: true, // Start the timeline in paused state
    });

    // Get DOM elements using refs where possible
    const navElement = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav ul li a");
    const navTitle = document.querySelector("nav h2");

    // Set up the timeline animation sequence
    tlRef.current
      .to(navElement, { right: 0 })
      .to(navElement, { height: "100vh" }, 0)
      .to(navLinks, { opacity: 1, pointerEvents: "all", stagger: 0.2 }, "-=.8")
      .to(closeButtonRef.current, { opacity: 1, pointerEvents: "all" }, "-=.8")
      .to(navTitle, { opacity: 1 }, "-=1")
      .to(
        navContainerRef.current,
        { opacity: 0, pointerEvents: "none" },
        "-=1"
      );

    // Define click handlers
    const handleOpenClick = () => {
      tlRef.current.play();
    };

    const handleCloseClick = () => {
      tlRef.current.reverse();
    };

    // Add event listeners if refs are available
    if (navContainerRef.current && closeButtonRef.current) {
      navContainerRef.current.addEventListener("click", handleOpenClick);
      closeButtonRef.current.addEventListener("click", handleCloseClick);

      // Cleanup function
      return () => {
        if (navContainerRef.current) {
          navContainerRef.current.removeEventListener("click", handleOpenClick);
        }
        if (closeButtonRef.current) {
          closeButtonRef.current.removeEventListener("click", handleCloseClick);
        }
      };
    }
  }, []);

  // Handle menu item clicks - close the menu when a menu item is clicked
  const handleMenuItemClick = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  return (
    <>
      <div className="nav-container" ref={navContainerRef}>
        <div className="bars"></div>
      </div>
      <nav>
        <h2>ADHI CONSTRUCTIONS</h2>
        <div className="close" ref={closeButtonRef}>
          <div></div>
        </div>
        <ul>
          <li>
            <a href="#" onClick={handleMenuItemClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleMenuItemClick}>
              About Us
            </a>
          </li>
          <li>
            <a href="#our-services" onClick={handleMenuItemClick}>
              Our Services
            </a>
          </li>
          <li>
            <a href="#expertise" onClick={handleMenuItemClick}>
              Expertise
            </a>
          </li>
          <li>
            <a href="#locations" onClick={handleMenuItemClick}>
              Locations
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleMenuItemClick}>
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
