import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./contactUs.css"; // Import your CSS file for styling

const ContactUsComp = () => {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", phone: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process form submission here
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <section className="contact-us-bg" id="contact">
      <Container>
        <Row>
          <Col md={6} className="text-white">
            <h2 className="contact-heading">Contact Us</h2>
            <p className="contact-description">
              Get in touch with us for any queries or assistance. We're here to
              help you with your construction needs.
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
              <div className="form-inputs-container bg-primar">
                <Form.Group className="mb-3 w-75 bg-dange">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-100"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={50}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 w-75">
                  <Form.Control
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="w-100"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="text-center w-100">
                  <Button className="btn-contact" type="submit">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsComp;
