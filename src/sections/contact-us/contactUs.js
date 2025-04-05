import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./contactUs.css"; // Import your CSS file for styling

const ContactUsComp = () => {
  return (
    <section className="contact-us-bg" id="contact-us">
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
            <Form className="contact-form">
              <div className="contact-form-header">
                Enter your details, we’ll reach you shortly
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <Button className="btn-contact" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUsComp;
