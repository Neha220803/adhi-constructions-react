import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import ToastMessage from "../../components/toast/toastMssg"; // Import the ToastMessage component
import "./contactUs.css";

const ContactUsComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    loading: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "" });

  // Basic sanitization (prevent XSS payloads or junk input)
  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9@.\s\-+]/g, "").trim();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", phone: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedPhone = sanitizeInput(formData.phone);

    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(sanitizedEmail)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!sanitizedPhone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(sanitizedPhone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormData({ ...formData, loading: true });

    try {
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
      };

      // Prepare the template parameters for EmailJS
      const templateParams = {
        from_name: sanitizedData.email,
        phone_number: sanitizedData.phone,
        to_name: "Your Name", // You can change this
        to_email: "ajin@adhiconstruction.us",
      };

      // Send the email using EmailJS
      await emailjs.send(
        "service_vz98zz", // Your service ID
        "template_kcfh7n2", // Your template ID
        templateParams,
        "bql19IHSmzPWHoJiX" // Your public key
      );

      setFormData({
        ...formData,
        email: "",
        phone: "",
        loading: false,
      });

      // Show success toast
      setToastVariant("success");
      setToastMessage(
        "SUCCESS! Thank you for contacting us. We'll reach out soon."
      );
      setShowToast(true);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormData({
        ...formData,
        loading: false,
      });

      // Show error toast
      setToastVariant("danger");
      setToastMessage(
        `Failed to send! ${error.text || "Please try again later."}`
      );
      setShowToast(true);
    }
  };

  const handleCloseToast = () => setShowToast(false);

  return (
    <section className="contact-us-bg" id="contact">
      <Container>
        <Row>
          <Col md={6} className="text-white">
            <h2 className="contact-heading">Contact Us</h2>
            <p className="contact-description">
              Get in touch with us for any queries or assistance. We're here to
              help you.
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-header">
                Enter your details, we'll reach you shortly
              </div>
              <div className="form-inputs-container">
                <Form.Group className="mb-3 w-100">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={50}
                    isInvalid={!!errors.email}
                    disabled={formData.loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 w-100">
                  <Form.Control
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    isInvalid={!!errors.phone}
                    disabled={formData.loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-center w-100">
                  <Button
                    className="btn-contact"
                    type="submit"
                    disabled={formData.loading}
                  >
                    {formData.loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Toast Message Component */}
      <ToastMessage
        showToast={showToast}
        onClose={handleCloseToast}
        toastVariant={toastVariant}
        status={toastMessage}
      />
    </section>
  );
};

export default ContactUsComp;
