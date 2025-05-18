import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

// Online sound effect URLs
import SUCCESS_SOUND_URL from "../../assets/sounds/success.wav";
import ERROR_SOUND_URL from "../../assets/sounds/danger.wav"; // Error notification sound

const ToastMessage = ({ showToast, onClose, toastVariant, status }) => {
  useEffect(() => {
    if (showToast) {
      const sound = new Audio(
        toastVariant === "success" ? SUCCESS_SOUND_URL : ERROR_SOUND_URL
      );
      sound.play().catch((error) => {
        // Handle potential errors with audio playback (e.g., autoplay restrictions)
        console.warn("Audio play failed:", error);
      });
    }
  }, [showToast, toastVariant]);

  return (
    <Toast
      show={showToast}
      onClose={onClose}
      autohide
      delay={2000}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        minWidth: "300px",
      }}
    >
      <Toast.Header closeButton className={`bg-${toastVariant} text-white`}>
        <strong className="me-auto">🔔 Notification</strong>
      </Toast.Header>
      <Toast.Body>{status}</Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
