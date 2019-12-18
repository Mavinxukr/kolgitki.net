import React, { useState } from 'react';
import dynamic from 'next/dist/next-server/lib/dynamic';
import { data } from './data';
import Styles from './ProfileFavourite.module.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const ProfileFavourite = () => {
  const [amountSelectItems, setAmountSelectItems] = useState(0);

  const addItemSelect = (e) => {
    if (e.target.checked) {
      setAmountSelectItems(amountSelectItems + 1);
    } else {
      setAmountSelectItems(amountSelectItems - 1);
    }
  };

  return (
    <div className={Styles.ProfileFavourite}>
      <div className={Styles.ProfileFavourite__Header}>
        <h2 className={Styles.ProfileFavourite__Title}>Избранные</h2>
        {
          amountSelectItems > 0 ? (
            <div className={Styles.ProfileFavourite__SelectedBlock}>
              <button className={Styles.ProfileFavourite__SelectedBlockButtonShare} type="button">Поделиться ({amountSelectItems})</button>
              <button className={Styles.ProfileFavourite__SelectedBlockButtonDelete} type="button">Удалить ({amountSelectItems})</button>
              <button className={Styles.ProfileFavourite__SelectedBlockButtonCansel} type="button">Отменить</button>
            </div>
          )
            : (
              <>
                <button className={Styles.ProfileFavourite__HeaderButtonShare} type="button">Поделиться</button>
                <div className={Styles.ProfileFavourite__HeaderButtonDeleteWrapper}>
                  <button className={Styles.ProfileFavourite__HeaderButtonDelete} type="button">Удалить все</button>
                </div>
              </>
            )
        }
      </div>
      <div className={Styles.ProfileFavourite__Cards}>
        {
         data.map(item => (
           <div className={Styles.ProfileFavourite__Card} key={item.id}>
             <input onChange={addItemSelect} type="checkbox" id={`item${item.id}`} className={Styles.ProfileFavourite__Field} />
             <div className={Styles.ProfileFavourite__CardWrapper}>
               <DynamicComponentWithNoSSRCard item={item} />
             </div>
             <div className={Styles.ProfileFavourite__CardButtons}>
               <button className={Styles.ProfileFavourite__CardButtonDelete} type="button" />
               <button className={Styles.ProfileFavourite__CardButtonShare} type="button" />
               <label htmlFor={`item${item.id}`} className={Styles.ProfileFavourite__CardButtonSelect} type="button" />
             </div>
           </div>
         ))
       }
      </div>
    </div>
  );
};

export default ProfileFavourite;
