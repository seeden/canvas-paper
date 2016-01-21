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
  constructor(parent, options = {}) {
    super();

    if (!parent) {
      throw new Error('Parent is undefined');
    }

    if (!options.type) {
      throw new Error('You need to specifiy layer type');
    }

    this._parent = parent;

    this._options = {
      ...defaultOptions,
      ...options,
    };
  }

  getParent() {
    return this._parent;
  }

  getPaper() {
    return this.getParent().getPaper();
  }

  getImage(url, callback) {
    return this.getParent().getImage(url, callback);
  }

  parse(layer) {
    return this.getParent().parse(layer);
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

  getOffset() {
    const position = this.getPosition();
    const parentOffset = this.getParent().getOffset();

    return {
      x: position.x + parentOffset.x,
      y: position.y + parentOffset.y,
      width: position.width,
      height: position.height,
    };
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
    }

    this._options[key] = value;

    if (!disableEmit) {
      this.emitChange();
    }

    return this;
  }

  emitChange = () => {
    this.emit('change');
    return this;
  };

  toJSON() {
    return {
      ...this._options,
    };
  }

  prepareContext(ctx) {
    ctx.globalAlpha = this.getAlpha();
  }

  render(/* ctx, callback */) {
    throw new Error('You need to override render method');
  }
}
