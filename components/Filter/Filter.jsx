import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withResponse } from '../hoc/withResponse';
import styles from './Filter.scss';
import Accordion from '../Accordion/Accordion';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';

const SubFilters = ({
  changeHandle,
  arrSelects,
  categoryName,
  isDesktopScreen,
  isGifts,
  selected
}) => {
  const [subfilterList, setSubfilterList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    setSubfilterList(arrSelects);
  }, [arrSelects]);

  React.useEffect(() => {
    setSubfilterList(
      arrSelects.filter(item => {
        const value =
          parseText(cookies, item.name, item.name_ua) ||
          parseText(cookies, item.value, item.value_uk);

        return value.toLowerCase().startsWith(inputValue.toLowerCase())
          ? true
          : false;
      })
    );
  }, [inputValue]);

  const inputChangeHandle = value => {
    setInputValue(value);
  };

  const isChecked = (item, selected) => {
    return selected.some(i => i === item);
  };
  return (
    <div
      className={cx(styles.dropDownBlock, {
        [styles.dropDownBlockMobile]: !isDesktopScreen
      })}
    >
      <div
        className={cx(styles.dropDownWrapper, {
          [styles.dropDownWrapperMobile]: !isDesktopScreen
        })}
      >
        <input
          className={styles.dropDownFilter}
          onChange={ev => inputChangeHandle(ev.target.value)}
          value={inputValue}
        ></input>
        {!subfilterList.length && (
          <p
            style={{
              fontSize: 12,
              color: '#9c9c9c',
              textAlign: 'center',
              paddingTop: '5px'
            }}
          >
            {parseText(
              cookies,
              'К сожалению, фильтров нет',
              'Нажаль, фільтри відсутні'
            )}
          </p>
        )}
        <ul
          className={cx(styles.dropDownList, {
            [styles.dropDownListMobile]: !isDesktopScreen && isGifts
          })}
        >
          {subfilterList.map((item, index) => {
            const value =
              parseText(cookies, item.name, item.name_ua) ||
              parseText(cookies, item.value, item.value_uk);
            const v = item.name || item.value;
            return (
              <li className={styles.dropDownItem} key={item.id || index}>
                <input
                  type="checkbox"
                  id={categoryName + item.id}
                  className={styles.field}
                  checked={isChecked(v, selected)}
                  name={categoryName}
                  onChange={ev => {
                    console.log(v, selected);
                    changeHandle(ev.target.checked, categoryName, v);
                  }}
                />
                <label
                  htmlFor={categoryName + item.id}
                  className={cx(styles.dropDownController, {
                    [styles.dropDownControllerForGift]:
                      isGifts && !isDesktopScreen
                  })}
                >
                  {item.img_link && (
                    <span
                      className={cx(styles.colorBlock, {
                        [styles.withBorder]: item.name === 'White'
                      })}
                      style={{
                        background: item.hex
                          ? `${item.hex}`
                          : `url(${item.img_link})`
                      }}
                    />
                  )}
                  <p title={value}>{value}</p>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const Filter = ({
  title,
  arrSelects,
  id,
  classNameWrapper,
  changeHandle,
  categoryName,
  isDesktopScreen,
  isGifts,
  selected
}) => {
  return (
    <>
      {(isDesktopScreen && (
        <div
          className={cx(styles.filter, classNameWrapper, {
            [styles.filterGift]: isGifts
          })}
        >
          <input className={styles.field} type="checkbox" id={id} />
          <label className={styles.paramController} htmlFor={id}>
            {title}
          </label>
          <SubFilters
            changeHandle={changeHandle}
            selected={selected}
            categoryName={categoryName}
            arrSelects={arrSelects}
            isDesktopScreen={isDesktopScreen}
          />
        </div>
      )) || (
        <ul
          className={cx(styles.accordion, classNameWrapper)}
          uk-accordion="multiple: true"
        >
          <Accordion
            title={title}
            filters={selected}
            isFooterNav
            isFilter
            isGifts
            categoryName={categoryName}
          >
            <SubFilters
              changeHandle={changeHandle}
              selected={selected}
              categoryName={categoryName}
              arrSelects={arrSelects}
              isDesktopScreen={isDesktopScreen}
            />
          </Accordion>
        </ul>
      )}
    </>
  );
};
SubFilters.propTypes = {
  arrSelects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      value_uk: PropTypes.string,
      name_ua: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.string,
      img_link: PropTypes.string
    })
  ),
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
  selected: PropTypes.array
};
Filter.propTypes = {
  title: PropTypes.string,
  arrSelects: PropTypes.array,
  id: PropTypes.string,
  classNameWrapper: PropTypes.string,
  changeHandle: PropTypes.func,
  categoryName: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
  isGifts: PropTypes.bool,
  selected: PropTypes.array
};
export default withResponse(Filter);
