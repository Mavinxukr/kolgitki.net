import React from 'react';
import Styles from './SliderNav.modulle.scss';
import IconArrow from '../../../assets/svg/right-arrow.svg';

const SliderNav = ({ slider, index, handleClick }) => (
  <div className={Styles.SliderNav}>
    <button className={Styles.SliderNav__Button} type="button" onClick={() => handleClick(slider.prev)}>
      <IconArrow className={`${Styles.SliderNav__Icon} ${Styles.SliderNav__IconPrev}`} />
    </button>
    {
        slider !== null
          ? <p className={Styles.SliderNav__Indicator}>{index}/{slider.innerElements.length}</p>
          : null
      }
    <button className={Styles.SliderNav__Button} type="button" onClick={() => handleClick(slider.next)}>
      <IconArrow className={Styles.SliderNav__Icon} />
    </button>
  </div>
);

export default SliderNav;
