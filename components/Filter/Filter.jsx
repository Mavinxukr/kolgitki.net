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
  selected,
  classNameAdditional
}) => {
  // const [filters, setFilters] = React.useState([]);
  // const [value, setValue] = React.useState('');

  // React.useEffect(() => {
  //   setFilters(arrSelects);
  // }, []);

  // React.useEffect(() => {
  //   const next = filters.filter(item => {
  //     console.log(item);
  //     console.log(value);
  //     return item.name.startsWith(value) || item.value.startsWith(value);
  //   });
  // }, [value]);
  const isChecked = (item, selected) => {
    return selected.some(i => i.id === item.id);
  };
  return (
    <ul
      className={cx(cx(styles.dropDownList, classNameAdditional), {
        [styles.dropDownListMobile]: !isDesktopScreen && isGifts
      })}
    >
      {/* <input onChange={ev => setValue(ev.target.value)} value={value} /> */}
      {arrSelects &&
        arrSelects.map((item, index) => {
          const value =
            parseText(cookies, item.name, item.name_ua) ||
            parseText(cookies, item.value, item.value_uk);
          return (
            <li className={styles.dropDownItem} key={item.id || index}>
              <input
                type="checkbox"
                id={categoryName + item.id}
                className={styles.field}
                checked={isChecked(item, selected)}
                name={categoryName}
                onChange={ev => {
                  changeHandle(ev, item);
                }}
              />
              <label
                htmlFor={categoryName + item.id}
                className={cx(styles.dropDownController, {
                  [styles.dropDownControllerForGift]:
                    isGifts && !isDesktopScreen
                })}
              >
                {item.img_link ? (
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
                ) : null}
                <p>{value}</p>
              </label>
            </li>
          );
        })}
    </ul>
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
          <div className={styles.dropDownListWrapper}>
            <SubFilters
              changeHandle={changeHandle}
              selected={selected}
              categoryName={categoryName}
              arrSelects={arrSelects}
            />
          </div>
        </div>
      )) || (
        <ul className={styles.accordion} uk-accordion="multiple: true">
          <Accordion
            title={title}
            filters={selected}
            isFooterNav
            isFilter
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
