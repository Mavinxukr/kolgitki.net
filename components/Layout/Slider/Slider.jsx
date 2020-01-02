import React, { useEffect, useRef, useState } from 'react';
import UIKit from '../../../public/uikit/uikit.js';

const Slider = ({ children, height }) => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { index, sliderLength }));

  return (
    <div
      ref={value}
      uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true"
      style={{ height, position: 'relative' }}
    >
      {childrenWithProps}
    </div>
  );
};

export default Slider;
