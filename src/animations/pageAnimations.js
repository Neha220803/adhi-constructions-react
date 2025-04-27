// animations/pageAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a reusable heading animation that can be used across multiple pages
 * @param {React.RefObject} headingRef - Reference to the heading element
 * @param {Object} options - Animation options
 * @param {string} options.animationDirection - Direction of animation ('x' or 'y'), default 'x'
 * @param {number} options.animationDistance - Distance to animate in pixels, default -100 for x, 50 for y
 * @param {number} options.staggerTime - Time between each line animation in seconds, default 0.1
 * @param {string} options.ease - GSAP easing function, default 'expo.out'
 * @param {number} options.duration - Animation duration in seconds, default 1.5
 * @param {boolean} options.splitLines - Whether to split text into lines, default true
 * @return {Object} The ScrollTrigger instance for cleanup
 */
export const createHeadingAnimation = (headingRef, options = {}) => {
  // Default options
  const {
    animationDirection = "x",
    animationDistance = animationDirection === "x" ? -100 : 50,
    staggerTime = 0.1,
    ease = "expo.out",
    duration = 1.5,
    splitLines = true,
    triggerStart = "top 85%",
    triggerEnd = "bottom center",
  } = options;

  // If no heading ref or element, return null
  if (!headingRef?.current) return null;

  let headingTrigger = null;

  // If using SplitType for line animations
  if (splitLines && window.SplitType) {
    // Set initial state for heading
    gsap.set(headingRef.current, { opacity: 0 });

    // Create split text object for heading
    const headingText = new window.SplitType(headingRef.current, {
      types: "lines",
    });

    // Make sure the heading is visible again
    gsap.set(headingRef.current, { opacity: 1 });

    // Create animation object with just the direction we need
    const animProps = {
      opacity: 0,
      stagger: staggerTime,
      duration: duration,
      ease: ease,
    };

    // Add the right direction property
    animProps[animationDirection] = animationDistance;

    // Animate heading text lines
    headingTrigger = gsap.from(headingText.lines, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: triggerStart,
        end: triggerEnd,
        markers: false,
      },
      ...animProps,
    }).scrollTrigger;
  } else {
    // Simple animation without SplitType
    const animProps = {
      opacity: 0,
      duration: duration,
      ease: ease,
    };

    // Add the right direction property
    animProps[animationDirection] = animationDistance;

    // Animate the whole heading
    headingTrigger = gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: triggerStart,
        end: triggerEnd,
        markers: false,
      },
      ...animProps,
    }).scrollTrigger;
  }

  return headingTrigger;
};

/**
 * Creates and returns a header animation using GSAP and ScrollTrigger
 * @param {React.RefObject} headerRef - Reference to the header container element
 * @param {React.RefObject} headerBgRef - Reference to the header background element
 * @return {Object} The animation timeline and cleanup function
 */
export const createHeaderAnimation = (headerRef, headerBgRef) => {
  // Create the timeline with scroll trigger
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
      onLeave: () => {
        // Fix for possible stacking context issues
        gsap.set(headerRef.current, { zIndex: 0 });
      },
      onEnterBack: () => {
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

  // Return cleanup function
  const cleanup = () => {
    if (headerTimeline.scrollTrigger) {
      headerTimeline.scrollTrigger.kill();
    }
    headerTimeline.kill();
  };

  return {
    timeline: headerTimeline,
    cleanup,
  };
};

/**
 * Creates and returns animations for the Solutions section
 * @param {React.RefObject} sectionRef - Reference to the solutions section container
 * @param {React.RefObject} img1Ref - Reference to the first image (optional)
 * @param {React.RefObject} img2Ref - Reference to the second image
 * @param {React.RefObject} img3Ref - Reference to the third image
 * @param {React.RefObject} headingRef - Reference to the section heading
 * @param {React.RefObject} introTextRef - Reference to the intro text
 * @return {Function} Cleanup function to kill all animations
 */
export const createSolutionsAnimation = (
  sectionRef,
  img1Ref,
  img2Ref,
  img3Ref,
  headingRef,
  introTextRef
) => {
  // Set initial states for images
  if (img1Ref?.current) {
    gsap.set(img1Ref.current, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "left top",
    });
  }

  gsap.set(img2Ref.current, {
    opacity: 0,
    scale: 0.5,
    transformOrigin: "left bottom",
  });

  gsap.set(img3Ref.current, {
    opacity: 0,
    scale: 0,
    transformOrigin: "center center",
  });

  // Create animations that trigger when the section enters the viewport
  const sectionTrigger = ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top 80%", // Trigger when top of section reaches 80% from top of viewport
    once: true, // Only run once
    onEnter: () => {
      // Animate first image if it exists
      if (img1Ref?.current) {
        gsap.to(img1Ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Animate second image from bottom left with slight delay
      gsap.to(img2Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
      });

      // Animate right image from center
      gsap.to(img3Ref.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.6,
        ease: "power2.out",
      });
    },
  });

  // Use the common heading animation with horizontal movement
  const headingTrigger = createHeadingAnimation(headingRef, {
    animationDirection: "x",
    animationDistance: -100,
    staggerTime: 0.1,
    ease: "expo.out",
    duration: 2,
    triggerStart: "top 80%",
    triggerEnd: "top 20%",
  });

  // Intro text animation with SplitType if available
  let introTextTrigger = null;

  if (introTextRef?.current) {
    // Use the common heading animation for intro text too
    introTextTrigger = createHeadingAnimation(introTextRef, {
      animationDirection: "x",
      animationDistance: -100,
      staggerTime: 0.15,
      ease: "expo.out",
      duration: 1.5,
      triggerStart: "top 85%",
      triggerEnd: "top 20%",
    });
  }

  // Return cleanup function
  return () => {
    sectionTrigger.kill();
    if (headingTrigger) headingTrigger.kill();
    if (introTextTrigger) introTextTrigger.kill();
  };
};

/**
 * Creates animations for the AboutUs section
 * @param {React.RefObject} headingRef - Reference to the heading text element
 * @param {React.RefObject} bottomContainerRef - Reference to the bottom container element
 * @return {Function} Cleanup function to kill all animations
 */
export const createAboutUsAnimation = (headingRef, bottomContainerRef) => {
  // Use the common heading animation with vertical movement
  const headingTrigger = createHeadingAnimation(headingRef, {
    animationDirection: "y",
    animationDistance: 50,
    ease: "power3.out",
  });

  // Bottom container animation
  // Set initial state for the container
  gsap.set(bottomContainerRef.current, {
    x: -100,
    opacity: 0,
  });

  // Create the animation with scroll trigger
  const animation = gsap.to(bottomContainerRef.current, {
    duration: 1.2,
    x: 0,
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: bottomContainerRef.current,
      start: "top bottom-=50",
      end: "bottom center",
      toggleActions: "play none none reverse",
      once: false,
      markers: false,
    },
  });

  // Return cleanup function
  return () => {
    if (animation.scrollTrigger) {
      animation.scrollTrigger.kill();
    }
    if (headingTrigger) {
      headingTrigger.kill();
    }
    animation.kill();
  };
};

/**
 * Creates animations for the Expertise section
 * @param {React.RefObject} headingRef - Reference to the heading text element
 * @param {React.RefObject} cardsRef - Reference to the cards container element
 * @return {Function} Cleanup function to kill all animations
 */
export const createExpertiseAnimation = (headingRef, cardsRef) => {
  // Use the common heading animation with vertical movement
  const headingTrigger = createHeadingAnimation(headingRef, {
    animationDirection: "y",
    animationDistance: 30,
    staggerTime: 0.08,
    ease: "power2.out",
  });

  // Cards animation
  // Set initial state for cards
  gsap.set(".expertise-card", {
    opacity: 0,
    y: 50,
  });

  // Create the animation with scroll trigger
  const cardsAnimation = gsap.to(".expertise-card", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: cardsRef.current,
      start: "top 80%",
      once: true,
    },
  });

  // Return cleanup function
  return () => {
    if (cardsAnimation.scrollTrigger) {
      cardsAnimation.scrollTrigger.kill();
    }
    if (headingTrigger) {
      headingTrigger.kill();
    }
    cardsAnimation.kill();
  };
};

gsap.registerPlugin(ScrollTrigger);

export const createServiceLocationsAnimation = (headingRef, sectionRef) => {
  // Wait for DOM to be ready
  const timer = setTimeout(() => {
    if (!headingRef.current || !sectionRef.current) return;

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Get all location card images
    const images = sectionRef.current.querySelectorAll(".card-image-inner");

    // Set initial states for images
    images.forEach((image) => {
      gsap.set(image, {
        scale: 1.5,
        opacity: 1,
        transformOrigin: "center center",
      });
    });

    // Image animations
    images.forEach((image) => {
      gsap.to(image, {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: image.parentNode,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      });
    });

    // Animate location cards
    const locationCards = sectionRef.current.querySelectorAll(".location-card");
    locationCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2 + 0.3, // Staggered delay after heading animation
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, 100);

  // Return cleanup function
  return () => {
    clearTimeout(timer);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
};
