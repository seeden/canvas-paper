import Paper from './Paper';
import * as Layers from './layers';

import CoverType from './constants/CoverType';
import LayerType from './constants/LayerType';
import ResizeType from './constants/ResizeType';
import TextAlign from './constants/TextAlign';
import TextBaseline from './constants/TextBaseline';

import parseLayers, { createLayer } from './utils/parseLayers';

export {
  Layers,
  CoverType,
  LayerType,
  ResizeType,
  TextAlign,
  TextBaseline,
  createLayer,
  parseLayers,
};

export default Paper;
