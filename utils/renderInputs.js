import React from 'react';
import InputFormWrapper from '../components/InputFormWrapper/InputFormWrapper';
import Checkbox from '../components/Checkbox/Checkbox';
import SelectCustom from '../components/Select/Select';

export const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

export const renderCheckbox = props => (data) => {
  return (
  <Checkbox {...props} {...data.input} />
)};

export const renderSelect = props => ({ input, meta, ...rest }) => (
  <SelectCustom {...props} {...input} meta={meta} {...rest} />
);
