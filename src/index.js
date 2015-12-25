import Paper from './Paper';
import Layer from './layers/Layer';
import Text from './layers/Text';
import Photo from './layers/Photo';
import Img from './layers/Img';
import RandomText from './layers/RandomText';
import CoverType from './constants/CoverType';
import LayerType from './constants/LayerType';
import ResizeType from './constants/ResizeType';
import TextAlign from './constants/TextAlign';
import TextBaseline from './constants/TextBaseline';

import parseLayers from './utils/parseLayers';

export { Layer, Text, Photo, Img, RandomText, CoverType, LayerType,
  ResizeType, parseLayers, TextAlign, TextBaseline };
export default Paper;
