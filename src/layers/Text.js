import Layer from './Layer';
import LayerType from '../constants/LayerType';
import TextAlign from '../constants/TextAlign';
import TextBaseline from '../constants/TextBaseline';

const defaultOptions = {
  width: 280,
  height: 35,
  type: LayerType.TEXT,
  text: 'Sample Text',
  color: 'black',
  align: TextAlign.LEFT,
  baseline: TextBaseline.ALPHABETIC,
  size: 35,
  fontWeight: 'normal',
  font: 'Arial',
};

export default class Text extends Layer {
  constructor(options = {}) {
    super({
      ...defaultOptions,
      ...options,
    });
  }

  getColor() {
    return this.getOptions().color;
  }

  setColor(value, disableEmit) {
    return this.set('color', value, disableEmit);
  }

  getAlign() {
    return this.getOptions().align;
  }

  setAlign(value, disableEmit) {
    return this.set('align', value, disableEmit);
  }

  getBaseline() {
    return this.getOptions().baseline;
  }

  setBaseline(value, disableEmit) {
    return this.set('baseline', value, disableEmit);
  }

  getText() {
    return this.getOptions().text;
  }

  setText(value, disableEmit) {
    return this.set('text', value, disableEmit);
  }

  getSize() {
    return this.getOptions().size;
  }

  setSize(value, disableEmit) {
    return this.set('size', value, disableEmit);
  }

  getFontWeight() {
    return this.getOptions().fontWeight;
  }

  setFontWeight(value, disableEmit) {
    return this.set('fontWeight', value, disableEmit);
  }

  getFont() {
    return this.getOptions().font;
  }

  setFont(value, disableEmit) {
    return this.set('font', value, disableEmit);
  }

  getTextPosition() {
    const align = this.getAlign();
    const position = this.getPosition();

    if (align === TextAlign.CENTER) {
      return {
        x: Math.floor(position.x + position.width / 2),
        y: position.y,
      };
    } else if (align === TextAlign.RIGHT) {
      return {
        x: position.x + position.width,
        y: position.y,
      };
    }

    return {
      x: position.x,
      y: position.y,
    };
  }

  render(ctx, paper, callback) {
    const text = this.getText();
    const alignPosition = this.getTextPosition();

    ctx.textAlign = this.getAlign();
    ctx.fillStyle = this.getColor();
    ctx.textBaseline = this.getBaseline();

    ctx.font = `${this.getFontWeight()} ${this.getSize()}px ${this.getFont()}`;
    ctx.fillText(text, alignPosition.x, alignPosition.y);

    callback(null);
    return this;
  }
}
