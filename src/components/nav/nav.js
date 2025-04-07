import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./nav.css";

const Navigation = () => {
  useEffect(() => {
    const open = document.querySelector(".nav-container");
    const close = document.querySelector(".close");
    var tl = gsap.timeline({ defaults: { duration: 1, ease: "expo.inOut" } });

    open.addEventListener("click", () => {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.to("nav", { right: 0 })
          .to("nav", { height: "100vh", immediateRender: false }, 0) // Changed timing and added immediateRender
          .to(
            "nav ul li a",
            { opacity: 1, pointerEvents: "all", stagger: 0.2 },
            "-=.8"
          )
          .to(".close", { opacity: 1, pointerEvents: "all" }, "-=.8")
          .to("nav h2", { opacity: 1 }, "-=1")
          .to(".nav-container", { opacity: 0, pointerEvents: "none" }, "-=1"); // Hide the hamburger icon
      }
    });

    close.addEventListener("click", () => {
      tl.reverse().eventCallback("onReverseComplete", () => {
        // Make sure hamburger icon is visible again after animation is complete
        gsap.to(".nav-container", {
          opacity: 1,
          pointerEvents: "all",
          duration: 0.3,
        });
      });
    });

    // Cleanup function
    return () => {
      open.removeEventListener("click", () => {});
      close.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      <div className="nav-container">
        <div className="bars"></div>
      </div>
      <nav>
        <h2>ADHI CONSTRUCTIONS</h2>
        <div className="close">
          <div></div>
        </div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#our-services">Our Services</a>
          </li>
          <li>
            <a href="#expertise">Expertise</a>
          </li>
          <li>
            <a href="#locations">Locations</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
