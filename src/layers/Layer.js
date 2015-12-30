import { EventEmitter } from 'events';
import isPlainObject from 'lodash/lang/isPlainObject';

const defaultOptions = {
  x: 0,
  y: 0,
  width: void 0,
  height: void 0,
  alpha: 1,
};

export default class Layer extends EventEmitter {
  constructor(options = {}) {
    super();

    if (!options.type) {
      throw new Error('You need to specifiy layer type');
    }

    this._options = {
      ...defaultOptions,
      ...options,
    };
  }

  getOptions() {
    return this._options;
  }

  getType() {
    return this.getOptions().type;
  }

  getWidth() {
    return this.getOptions().width;
  }

  setWidth(value, disableEmit) {
    return this.set('width', value, disableEmit);
  }

  getHeight() {
    return this.getOptions().height;
  }

  setHeight(value, disableEmit) {
    return this.set('height', value, disableEmit);
  }

  getX() {
    return this.getOptions().x;
  }

  setX(value, disableEmit) {
    return this.set('x', value, disableEmit);
  }

  getY() {
    return this.getOptions().y;
  }

  setY(value, disableEmit) {
    return this.set('y', value, disableEmit);
  }

  getAlpha() {
    return this.getOptions().alpha;
  }

  setAlpha(value, disableEmit) {
    return this.set('alpha', value, disableEmit);
  }

  getPosition() {
    return {
      x: this.getX(),
      y: this.getY(),
      width: this.getWidth(),
      height: this.getHeight(),
    };
  }

  isHidden() {
    return this.getOptions().hide;
  }

  hide(disableEmit) {
    return this.set('hide', true, disableEmit);
  }

  show(disableEmit) {
    return this.set('hide', false, disableEmit);
  }

  toggle(disableEmit) {
    return this.set('hide', !this.isHidden(), disableEmit);
  }

  set(key, value, disableEmit) {
    if (isPlainObject(key)) {
      Object.keys(key).forEach((keyName) => {
        this.set(keyName, key[keyName], true);
      });

      if (!disableEmit) {
        this.emitChange();
      }

      return this;
    };

    this._options[key] = value;

    if (!disableEmit) {
      this.emitChange();
    }

    return this;
  }

  emitChange = () => {
    this.emit('change');
    return this;
  }

  toJSON() {
    return {
      ...this._options,
    };
  }

  prepareContext(ctx) {
    ctx.globalAlpha = this.getAlpha();
  }

  render(ctx, paper, callback) {
    throw new Error('You need to override render method');
  }
}
