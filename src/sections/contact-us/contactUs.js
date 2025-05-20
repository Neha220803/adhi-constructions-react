import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import ToastMessage from "../../components/toast/toastMssg";
import "./contactUs.css";

const ContactUsComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    loading: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    message: "",
    recaptcha: "",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Create a ref for the reCAPTCHA
  const recaptchaRef = useRef(null);

  // Basic sanitization (prevent XSS payloads or junk input)
  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9@.\s\-+]/g, "").trim();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", phone: "", message: "", recaptcha: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedPhone = sanitizeInput(formData.phone);
    const sanitizedMessage = sanitizeInput(formData.message);

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

    if (!sanitizedMessage) {
      newErrors.message = "Please describe how we can help you";
      isValid = false;
    } else if (sanitizedMessage.length < 3) {
      newErrors.message = "Message must be at least 3 characters";
      isValid = false;
    }

    // Validate reCAPTCHA
    if (!captchaVerified) {
      newErrors.recaptcha = "Please verify that you are not a robot";
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

  const handleRecaptchaChange = (value) => {
    // value will be null if expired or a string token when verified
    setCaptchaVerified(!!value);
    setErrors((prev) => ({ ...prev, recaptcha: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormData({ ...formData, loading: true });

    try {
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        message: sanitizeInput(formData.message),
      };

      // Prepare the template parameters for EmailJS
      const templateParams = {
        from_name: sanitizedData.email,
        phone_number: sanitizedData.phone,
        message: sanitizedData.message, // Added message to template params
        to_name: "Your Name", // You can change this
        to_email: "ajin@adhiconstruction.us",
      };

      // Send the email using EmailJS
      await emailjs.send(
        "service_vz98zzo", // Your service ID
        "template_kcfh7n2", // Your template ID
        templateParams,
        "bql19IHSmzPWHoJiX" // Your public key
      );

      setFormData({
        ...formData,
        email: "",
        phone: "",
        message: "",
        loading: false,
      });

      // Reset the reCAPTCHA
      setCaptchaVerified(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      // Show success toast
      setToastVariant("success");
      setToastMessage("Thank you for contacting us. We'll reach out soon.");
      setShowToast(true);
    } catch (error) {
      console.error("Error sending email:", error);
      setFormData({
        ...formData,
        loading: false,
      });

      // Show error toast
      setToastVariant("danger");
      setToastMessage("Failed to send! Please try again later.");
      setShowToast(true);
    }
  };

  const handleCloseToast = () => setShowToast(false);

  return (
    <section className="contact-us-bg py-2" id="contact">
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
                <Form.Group className="w-100 mb-2">
                  <Form.Control
                    as="textarea"
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={100}
                    isInvalid={!!errors.message}
                    disabled={formData.loading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Google reCAPTCHA */}
                <div className="mb-3 w-100">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfLBT8rAAAAAEC3Fy4SY5IuxyDyK5OaYxggAJ5u" // Replace with your actual site key
                    onChange={handleRecaptchaChange}
                  />
                  {errors.recaptcha && (
                    <div className="text-danger small mt-1">
                      {errors.recaptcha}
                    </div>
                  )}
                </div>

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
