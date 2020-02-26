import React, { useRef, useState } from 'react';
import cx from 'classnames';
import styles from './Search.scss';
import IconExit from '../../public/svg/Group5032.svg';
import IconSearch from '../../public/svg/search1.svg';

const Search = ({ setSearchActive }) => {
  const button = useRef(null);
  const icon = useRef(null);

  const [text, setText] = useState('Поиск...');
  const [inputValue, setInputValue] = useState('');

  const classNameForText = cx(styles.textField, {
    [styles.textFieldBlack]: text !== 'Поиск...',
  });

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      setText(e.target.value);
    } else {
      setText('Поиск...');
    }
  };

  return (
    <div className={styles.search}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          button.current.classList.add(styles.block);
          setSearchActive(false);
        }}
      >
        <span ref={icon}>
          <IconSearch className={styles.iconSearch} />
        </span>
        <div>
          <input
            type="text"
            className={styles.field}
            value={inputValue}
            placeholder="Поиск..."
            onFocus={() => {
              setSearchActive(true);
              icon.current.classList.add(styles.noBlock);
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 32) {
                setText(`${text}\u00A0`);
                setInputValue(`${inputValue}\u00A0`);
              }
            }}
            onChange={handleChange}
            maxLength="50"
          />
          <p className={classNameForText}>
            {text}
          </p>
        </div>
      </form>
      <button
        onClick={() => {
          setText('Поиск...');
          setInputValue('');
          icon.current.classList.remove(styles.noBlock);
          button.current.classList.remove(styles.block);
        }}
        ref={button}
        className={styles.buttonClear}
        type="button"
      >
        <IconExit className={styles.icon} />
      </button>
    </div>
  );
};

export default Search;
