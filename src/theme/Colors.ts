const commonColor = {
  success: '#00C88C',
  warnning: '#8000C8',
  danger: '#C8001A',
};

const light = {
  primary: '#8b9dc3',
  primary_weak: '#dfe3ee',
  primary_strong: '#3b5998',
  secondary: '#E0E0E0',
  secondary_weak: '#ffffff',
  secondary_strong: '#f7f7f7',
  text: '#333333',
  active: '#1677ff',
  ...commonColor
};

const dark = {
  primary: '#242526',
  primary_weak: '#3a3b3c',
  primary_strong: '#18191a',
  secondary: '#E0E0E0',
  secondary_weak: '#e4e6eb',
  secondary_strong: '#b0b3b8',
  text: '#adaeb1',
  active: '#FFC700',
  ...commonColor
};

export default {light, dark};
