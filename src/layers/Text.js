import Layer from './Layer';
import LayerType from '../constants/LayerType';
import TextAlign from '../constants/TextAlign';
import TextBaseline from '../constants/TextBaseline';

const defaultOptions = {
  width: 280,
  height: 35,
  type: LayerType.TEXT,
  text: 'Sample Text',
  fillStyle: 'black',
  textAlign: TextAlign.LEFT,
  textBaseline: TextBaseline.ALPHABETIC,
  size: 35,
  fontWeight: 'normal',
  font: 'Arial',
};

export default class Text extends Layer {
  constructor(parent, options = {}) {
    super(parent, {
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

  getTextAlign() {
    return this.getOptions().textAlign;
  }

  setTextAlign(value, disableEmit) {
    return this.set('textAlign', value, disableEmit);
  }

  getTextBaseline() {
    return this.getOptions().textBaseline;
  }

  setTextBaseline(value, disableEmit) {
    return this.set('textBaseline', value, disableEmit);
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
    const textAlign = this.getTextAlign();
    const position = this.getOffset();

    if (textAlign === TextAlign.CENTER) {
      return {
        x: Math.floor(position.x + position.width / 2),
        y: position.y,
      };
    } else if (textAlign === TextAlign.RIGHT) {
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

  render(ctx, callback) {
    const text = this.getText();
    const alignPosition = this.getTextPosition();

    ctx.textAlign = this.getTextAlign();
    ctx.textBaseline = this.getTextBaseline();

    ctx.fillStyle = this.getFillStyle();

    ctx.font = `${this.getFontWeight()} ${this.getSize()}px ${this.getFont()}`;
    ctx.fillText(text, alignPosition.x, alignPosition.y);

    callback(null);
    return this;
  }
}
