import React from 'react';
import { saleData } from './saleData';
import Styles from './SaleConfirm.module.scss';

const SaleConfirm = () => (
  <>
    <input type="checkbox" id="openConfirm" className={Styles.SaleConfirm__Field} />
    <div className={Styles.SaleConfirm}>
      <div className={Styles.SaleConfirm__Content}>
        <div className={Styles.SaleConfirm__ChooseProducts}>
          <div>
            {
              saleData.map(item => (
                <div key={item.id} className={Styles.SaleConfirm__ChooseProduct}>
                  <img src={item.src} alt={item.name} />
                  <div className={Styles.SaleConfirm__MainInfo}>
                    <p className={Styles.SaleConfirm__Model}>{item.name}</p>
                    <p className={Styles.SaleConfirm__Series}>KT-1005989</p>
                    <div className={Styles.SaleConfirm__MainInfoDetails}>
                      <p className={Styles.SaleConfirm__Size}>Размер: <span className={Styles.SaleConfirm__SizeValue}>{item.size}</span></p>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '6px', background: `${item.color}`, display: 'inline-block', marginRight: '10px', marginLeft: '22px',
                      }}
                      />
                      <p className={Styles.SaleConfirm__ColorName}>{item.nameColor}</p>
                      <p className={Styles.SaleConfirm__CountProductIndicator}>x{item.count}</p>
                    </div>
                  </div>
                  <p className={Styles.SaleConfirm__Price}>{item.price} ₴</p>
                </div>
              ))
            }
          </div>
          <hr className={Styles.SaleConfirm__Line} />
          <h2 className={Styles.SaleConfirm__OrderTitle}>Комментарий к заказу</h2>
          <input type="text" placeholder="Ваши пожелания" className={Styles.SaleConfirm__OrderField} />
        </div>
        <div className={Styles.SaleConfirm__TotalPriceBlock}>
          <div className={Styles.SaleConfirm__TotalPriceItem}>
            <p className={Styles.SaleConfirm__TotalPriceDesc}>без скидки:</p>
            <p className={Styles.SaleConfirm__TotalPriceValue}>278,00 ₴</p>
          </div>
          <div className={Styles.SaleConfirm__TotalPriceItem}>
            <p className={Styles.SaleConfirm__TotalPriceDesc}>Скидка:</p>
            <p className={Styles.SaleConfirm__TotalPriceValue}>278,00 ₴</p>
          </div>
          <div className={Styles.SaleConfirm__TotalPriceItem}>
            <p className={Styles.SaleConfirm__TotalPriceDesc}>Доставка:</p>
            <p className={Styles.SaleConfirm__TotalPriceValue}>36,00 ₴</p>
          </div>
          <hr className={Styles.SaleConfirm__TotalPriceLine} />
          <div className={Styles.SaleConfirm__TotalPriceItem}>
            <p className={Styles.SaleConfirm__TotalPriceDesc}>Итого:</p>
            <p className={Styles.SaleConfirm__TotalPriceValue}>570,00 ₴</p>
          </div>
          <button className={Styles.SaleConfirm__TotalPriceButton} type="button">Оформить заказ</button>
          <input type="checkbox" className={Styles.SaleConfirm__Field} id="call" />
          <label className={Styles.SaleConfirm__TotalPriceController} htmlFor="call"><span className={Styles.SaleConfirm__TotalPriceCotrollerBlock} /> Не звонить для подтверждения заказа</label>
        </div>
      </div>
    </div>
  </>
);

export default SaleConfirm;
