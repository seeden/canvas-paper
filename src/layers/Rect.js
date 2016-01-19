import Layer from './Layer';
import LayerType from '../constants/LayerType';

const defaultOptions = {
  type: LayerType.RECT,
  width: 200,
  height: 100,
  fillStyle: 'red',
  strokeStyle: null,
  lineWidth: 1,
};

export default class Rect extends Layer {
  constructor(options = {}) {
    super({
      ...defaultOptions,
      ...options,
    });
  }

  getFillStyle() {
    return this.getOptions().fillStyle;
  }

  setFillStyle(value, disableEmit) {
    return this.set('fillStyle', value, disableEmit);
  }

  getLineWidth() {
    return this.getOptions().lineWidth;
  }

  setLineWidth(value, disableEmit) {
    return this.set('lineWidth', value, disableEmit);
  }

  getStrokeStyle() {
    return this.getOptions().strokeStyle;
  }

  setStrokeStyle(value, disableEmit) {
    return this.set('strokeStyle', value, disableEmit);
  }

  render(ctx, paper, callback) {
    const position = this.getPosition();

    ctx.rect(position.x, position.y, position.width, position.height);

    const fillStyle = this.getFillStyle();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    const lineWidth = this.getLineWidth();
    if (lineWidth) {
      ctx.lineWidth = lineWidth;
    }

    const strokeStyle = this.getStrokeStyle();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.stroke();
    }

    callback(null);
    return this;
  }
}
