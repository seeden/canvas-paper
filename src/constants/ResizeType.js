import keymirror from 'keymirror';

const ResizeType = keymirror({
  NONE: null,
  FIT: null,
  COVER: null,
});

export default ResizeType;

export const Options = {
  [ResizeType.NONE]: 'no resize',
  [ResizeType.FIT]: 'fit size',
  [ResizeType.COVER]: 'crop for best fit',
};
