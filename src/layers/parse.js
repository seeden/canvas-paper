import LayerType from '../constants/LayerType';
import { Text, Img, Photo, RandomText, Selection, Rect, Group, Layer } from './index';

export default function parse(parent, options = {}, customParse) {
  if (!customParse) {
    throw new Error('You need to set reference to createLayer as second argument');
  }

  const layer = customParse(parent, options);
  if (layer) {
    return layer;
  }

  switch (options.type) {
  case LayerType.TEXT:
    return new Text(parent, options);
  case LayerType.RANDOM_TEXT:
    return new RandomText(parent, options);
  case LayerType.IMAGE:
    return new Img(parent, options);
  case LayerType.PHOTO:
    return new Photo(parent, options);
  case LayerType.SELECTION:
    return new Selection(parent, options);
  case LayerType.RECT:
    return new Rect(parent, options);
  case LayerType.GROUP:
    return new Group(parent, options);
  default:
    return new Layer(parent, options);
  }
}
