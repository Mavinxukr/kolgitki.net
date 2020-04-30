import React from 'react';
import InputFormWrapper from '../components/InputFormWrapper/InputFormWrapper';
import Checkbox from '../components/Checkbox/Checkbox';
import SelectCustom from '../components/Select/Select';

export const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

export const renderCheckbox = props => ({ input }) => (
  <Checkbox {...props} {...input} />
);

export const renderSelect = props => ({ input, ...rest }) => (
  <SelectCustom {...props} {...input} {...rest} />
);
