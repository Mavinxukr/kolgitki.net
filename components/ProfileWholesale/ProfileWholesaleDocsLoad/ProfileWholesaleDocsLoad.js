import React from 'react';
import { data } from './data';
import Styles from './ProfileWholesaleDocsLoad.module.scss';

const ProfileWholesaleDocsLoad = () => (
  <div className={Styles.ProfileWholesaleDocsLoad}>
    <h2 className={Styles.ProfileWholesaleDocsLoad__Title}>Скачать документы</h2>
    <input className={Styles.ProfileWholesaleDocsLoad__Field} type="checkbox" id="field1" />
    <div className={Styles.ProfileWholesaleDocsLoad__ItemSelect}>
      <label htmlFor="field1" className={Styles.ProfileWholesaleDocsLoad__ItemSelectController}>Каталог новинок (колготки)</label>
      <ul className={Styles.ProfileWholesaleDocsLoad__ListProducts}>
        {
        data.map(item => (
          <li className={Styles.ProfileWholesaleDocsLoad__ItemProducts} key={item.id}>
            <p className={Styles.ProfileWholesaleDocsLoad__ItemProductsDesc}>{item.desc}</p>
            <input className={Styles.ProfileWholesaleDocsLoad__Field} type="file" id={`load${item.id}`} />
            <label className={Styles.ProfileWholesaleDocsLoad__ItemProductsLoading} htmlFor={`load${item.id}`}>Скачать {item.type}</label>
          </li>
        ))
      }
      </ul>
    </div>
    <input className={Styles.ProfileWholesaleDocsLoad__Field} type="checkbox" id="field2" />
    <div className={Styles.ProfileWholesaleDocsLoad__ItemSelect}>
      <label className={Styles.ProfileWholesaleDocsLoad__ItemSelectController} htmlFor="field2">Каталог новинок (чулки)</label>
      <ul className={Styles.ProfileWholesaleDocsLoad__ListProducts}>
        {
          data.map(item => (
            <li className={Styles.ProfileWholesaleDocsLoad__ItemProducts} key={item.id}>
              <p className={Styles.ProfileWholesaleDocsLoad__ItemProductsDesc}>{item.desc}</p>
              <input className={Styles.ProfileWholesaleDocsLoad__Field} type="file" id={`load2${item.id}`} />
              <label className={Styles.ProfileWholesaleDocsLoad__ItemProductsLoading} htmlFor={`load${item.id}`}>Скачать {item.type}</label>
            </li>
          ))
        }
      </ul>
    </div>
    <div className={Styles.ProfileWholesaleDocsLoad__License}>
      <p className={Styles.ProfileWholesaleDocsLoad__LicenseDesc}>Сертификаты, лицензия и др.</p>
      <input className={Styles.ProfileWholesaleDocsLoad__Field} type="file" id="license" />
      <label className={Styles.ProfileWholesaleDocsLoad__LicenseLoading} htmlFor="license">Скачать .pdf</label>
    </div>
    <div className={Styles.ProfileWholesaleDocsLoad__Patterns}>
      <h2 className={Styles.ProfileWholesaleDocsLoad__Title}>Шаблоны</h2>
      {
        data.map(item => (
          <div className={Styles.ProfileWholesaleDocsLoad__PatternsItem} key={item.id}>
            <p className={Styles.ProfileWholesaleDocsLoad__PatternsItemDesc}>{item.desc}</p>
            <input className={Styles.ProfileWholesaleDocsLoad__Field} type="file" id={`loadPattern${item.id}`} />
            <label className={Styles.ProfileWholesaleDocsLoad__PatternsItemLoading} htmlFor={`load${item.id}`}>Скачать .docx</label>
          </div>
        ))
      }
    </div>
  </div>
);

export default ProfileWholesaleDocsLoad;
