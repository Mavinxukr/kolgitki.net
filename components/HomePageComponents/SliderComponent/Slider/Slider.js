import React, { useEffect, useState } from 'react';
import ReactSiema from 'react-siema';
import SliderNav from '../../../UIComponents/SliderNav/SliderNav';
import Slide from '../Slide/Slide';
import Styles from './Slider.module.scss';

const Slider = () => {
  const [slider, setSlider] = useState(null);
  const [index, setIndex] = useState(1);

  const options = {
    resizeDebounce: 250,
    duration: 1000,
    perPage: 1,
    draggable: true,
    loop: true,
  };

  const handleClick = (fn) => {
    fn.call(slider);
    setIndex(slider.currentSlide + 1);
  };

  // useEffect(() => {
  //   if (slider !== null) {
  //     setInterval(() => handleClick(slider.next), 5000);
  //   }
  // }, [slider]);

  return (
    <div className={Styles.Slider}>
      <ReactSiema {...options} ref={siema => setSlider(siema)}>
        <Slide />
        <Slide />
        <Slide />
      </ReactSiema>
      <SliderNav handleClick={handleClick} index={index} slider={slider} />
    </div>
  );
};

export default Slider;
