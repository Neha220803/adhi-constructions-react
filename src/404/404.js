import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../404/404.css'; // Using your existing CSS file

// Import your SVG image
// Note: Adjust the import path if needed based on your actual file structure
import NotFoundImage from '../assets/images/404.svg';

const NotFound = () => {
    return (
        <Container className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">Page Is Under Construction</h1>

                <div className="not-found-image">
                    <img
                        src={NotFoundImage}
                        alt="Page Under Construction"
                        className="construction-illustration"
                    />
                </div>

                <Link to="/">
                    <Button variant="primary" className="go-back-btn">Go Back!</Button>
                </Link>
            </div>
        </Container>
    );
};

export default NotFound;