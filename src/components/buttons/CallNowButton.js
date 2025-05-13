import React from "react";
import { FaPhone } from "react-icons/fa";
import "./CallNowButton.css";

const CallNowButtonComp = () => {
  return (
    <div>
      <a
        href="tel:+15167651100"
        className="call-now-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaPhone size={18} className="phone-icon" />
        <span className="call-text">Call Now</span>
      </a>
    </div>
  );
};

export default CallNowButtonComp;
