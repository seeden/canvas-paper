import LayerType from '../constants/LayerType';
import { Text, Img, Photo, RandomText, Layer } from '../layers';

export default function parseLayers(layers) {
  return layers.map((options) => {
    switch(options.type) {
    case LayerType.TEXT:
      return new Text(options);
      break;
    case LayerType.RANDOM_TEXT:
      return new RandomText(options);
      break;
    case LayerType.IMAGE:
      return new Img(options);
      break;
    case LayerType.PHOTO:
      return new Photo(options);
      break;
    default:
      return new Layer(options);
      break;
    }
  });
}
