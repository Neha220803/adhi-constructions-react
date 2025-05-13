import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./contactUs.css";

const ContactUsComp = () => {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    setSubmitting(true);

    try {
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
      };

      // You can send this to a secure backend (Node, Firebase, etc.)
      console.log("Sanitized Form Data:", sanitizedData);

      // Simulate success
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
        setFormData({ email: "", phone: "" });
      }, 1000);
    } catch (error) {
      console.error("Error submitting form", error);
      setSubmitting(false);
    }
  };

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
                    disabled={submitting}
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
                    disabled={submitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-center w-100">
                  <Button
                    className="btn-contact"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
                {submitted && (
                  <p className="mt-3 text-success text-center">
                    ✅ Thank you! We'll contact you soon.
                  </p>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsComp;
