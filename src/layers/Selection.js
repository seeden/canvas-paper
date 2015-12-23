import Layer from './Layer';
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

    ctx.lineWidth = options.selectionWidth;
    ctx.strokeStyle = options.selectionColor;

    const position = this.getPosition();
    const canvas = ctx.canvas;

    if (typeof position.width !== 'undefined' && typeof position.height !== 'undefined') {
      ctx.strokeRect(position.x, position.y, position.width, position.height);
      return callback(null);
    }

    ctx.strokeRect(position.x, position.y, canvas.width - position.x, canvas.height - position.y);
    return callback(null);
  }

  /*

  static createByLayer(layer, callback) {
    else if (layer instanceof Img) {
      return this.getImage(layer.getUrl(), (err, img) => {
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
  }*/
}
