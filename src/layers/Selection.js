import Layer from './Layer';
import Img from './Img';
import LayerType from '../constants/LayerType';

const defaultOptions = {
  selectionWidth: 2,
  selectionColor: '#B1D7FE',
};

export default class Selection extends Layer {
  constructor(options = {}) {
    super({
      ...defaultOptions,
      ...options,
    });
  }

  render(ctx, paper, callback) {
    const options = this.getOptions();
    const layer = options.layer;
    if (!(layer instanceof Layer)) {
      return callback(new Error('Layer is not instance of layer'));
    }

    ctx.lineWidth = options.selectionWidth;
    ctx.strokeStyle = options.selectionColor;

    const canvas = ctx.canvas;
    const position = layer.getPosition();

    if (typeof position.width !== 'undefined' && typeof position.height !== 'undefined') {
      ctx.strokeRect(position.x, position.y, position.width, position.height);
      return callback(null);
    } else if (layer instanceof Img) {
      return paper.getImage(layer.getUrl(), (err, img) => {
        if (err) {
          return callback(err);
        }

        if (!img) {
          ctx.strokeRect(position.x, position.y, canvas.width - position.x, canvas.height - position.y);
          return callback(null);
        }

        ctx.strokeRect(position.x, position.y, img.width, img.height);
        callback(null);
      });
    }

    ctx.strokeRect(position.x, position.y, canvas.width - position.x, canvas.height - position.y);
    return callback(null);
  }
}
