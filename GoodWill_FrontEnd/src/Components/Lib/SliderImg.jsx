import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const SliderImg = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      fluid
      style={{
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
      }}
    />
  );
};

SliderImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default SliderImg;
