import LayerType from '../constants/LayerType';
import { Text, Img, Photo, RandomText, Layer } from '../layers';

export function createLayer(options) {
  switch(options.type) {
  case LayerType.TEXT:
    return new Text(options);
  case LayerType.RANDOM_TEXT:
    return new RandomText(options);
  case LayerType.IMAGE:
    return new Img(options);
  case LayerType.PHOTO:
    return new Photo(options);
  default:
    return new Layer(options);
  }
}

export default function parseLayers(layers) {
  return layers.map((options) => createLayer(options));
}
