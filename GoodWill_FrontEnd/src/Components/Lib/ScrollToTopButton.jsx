import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // React Bootstrap Button
import { FaArrowUp } from 'react-icons/fa'; // Example using React Icons
import "../../assets/CSS/Lib_CSS/ScrollToTopButton.css"



const ScrollToTopButton = () => {


    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (

        
        <div className="position-fixed" style={{ bottom: '40px', right: '40px', zIndex: 1000 }}>
            {isVisible && (
                <Button 
                    onClick={scrollToTop} 
                    id='scrollBtn'
                   
                >
                    <FaArrowUp id='scrollIcon'  />
                </Button>
            )}
        </div>
    );
};

export default ScrollToTopButton;
