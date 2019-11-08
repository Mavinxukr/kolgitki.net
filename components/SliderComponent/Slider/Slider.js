import React, { useEffect, useState } from 'react';
import ReactSiema from 'react-siema';
import Slide from '../Slide/Slide';
import Styles from './Slider.module.scss';
import IconArrow from '../../../assets/svg/right-arrow.svg';

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

  useEffect(() => {
    if (slider !== null) {
      setInterval(() => handleClick(slider.next), 5000);
    }
  }, [slider]);

  return (
    <div className={Styles.Slider}>
      <ReactSiema {...options} ref={siema => setSlider(siema)}>
        <Slide />
        <Slide />
        <Slide />
      </ReactSiema>
      <div className={Styles.Slider__Nav}>
        <button className={Styles.Slider__Button} type="button" onClick={() => handleClick(slider.prev)}>
          <IconArrow className={`${Styles.Slider__Icon} ${Styles.Slider__IconPrev}`} />
        </button>
        {
          slider !== null
            ? <p className={Styles.Slider__Indicator}>{index}/{slider.innerElements.length}</p>
            : null
        }
        <button className={Styles.Slider__Button} type="button" onClick={() => handleClick(slider.next)}>
          <IconArrow className={Styles.Slider__Icon} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
