import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const customStyles = {
  option: provided => ({
    ...provided,
    color: '#0e0e0e',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
    width: '100%',
    backgroundColor: 'white',
    border: 'none',
  }),

  control: () => ({
    borderRadius: '0',
    border: '1px solid #b6b6b6',
    display: 'flex',
    padding: '8px 1px 8px 6px',
    width: '100%',
  }),

  indicatorsContainer: () => ({
    border: 'none',
    position: 'relative',
    width: '20px',
    height: '20px',
  }),

  dropdownIndicator: () => ({
    color: '#b6b6b6',
    position: 'absolute',
    left: '-9px',
    top: '6px',
  }),

  placeholder: () => ({
    color: '#b6b6b6',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
  }),

  singleValue: () => ({
    color: '#0e0e0e',
    fontSize: '20px',
    fontFamily: '"InterRegular"',
  }),
};

const SelectCustom = ({
  value,
  onChange,
  options,
  classNameWrapper,
  placeholder,
  onFocusCustom,
}) => (
  <Select
    value={value}
    onChange={onChange}
    onFocus={() => {
      if (onFocusCustom) {
        onFocusCustom();
      }
    }}
    options={options}
    styles={customStyles}
    placeholder={placeholder}
    className={classNameWrapper}
  />
);

SelectCustom.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
  placeholder: PropTypes.string,
  onFocusCustom: PropTypes.func,
};

export default SelectCustom;
