import React, { useState } from 'react';
import ReactSiema from 'react-siema';
import SliderNav from '../../UIComponents/SliderNav/SliderNav';
import Styles from './ProductSlider.module.scss';

const ProductSlider = () => {
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

  const goToSlider = (id) => {
    slider.goTo(id);
    setIndex(slider.currentSlide + 1);
  };

  return (
    <div className={Styles.ProductSlider}>
      <div className={Styles.ProductSlider__AddPhotos}>
        <button onClick={() => goToSlider(1)} className={Styles.ProductSlider__Button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
        </button>
        <button onClick={() => goToSlider(2)} className={Styles.ProductSlider__Button} type="button">
          <img src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
        </button>
      </div>
      <div className={Styles.ProductSlider__Slider}>
        <ReactSiema {...options} ref={siema => setSlider(siema)}>
          <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_image_1005989.png" alt="image1" />
          <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_gallery_1005989_15790.png" alt="image2" />
          <img className={Styles.ProductSlider__Image} src="/images/IMPRESSO_20_gallery_1005989_15791.png" alt="image3" />
        </ReactSiema>
        <SliderNav index={index} handleClick={handleClick} slider={slider} />
      </div>
    </div>
  );
};

export default ProductSlider;
