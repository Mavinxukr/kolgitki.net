export const required = (value) => {
  if (!value || value.length === 0) {
    return 'field is required';
  }
  return undefined;
};
