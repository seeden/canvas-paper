import Img from './Img';
import LayerType from '../constants/LayerType';
import ResizeType from '../constants/ResizeType';
import CoverType from '../constants/CoverType';

const defaultOptions = {
  type: LayerType.PHOTO,
  resizeType: ResizeType.COVER,
  coverType: CoverType.CENTER_CENTER,
  width: 200,
  height: 200,
};

export default class Photo extends Img {
  constructor(parent, options = {}) {
    super(parent, {
      ...defaultOptions,
      ...options,
    });
  }
}
