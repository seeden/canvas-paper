import { setImmediate } from 'async';
import getImage from './utils/getImage';
import { Layer } from './layers';
import { EventEmitter } from 'events';

const defaultOptions = {
  backgroundColor: 'white',
  patternQuality: 'best',
  antialias: 'subpixel',
  getImage,
  cacheImages: false,
};

function eachSeriesSync(items, fn, callback, current = 0) {
  if (items.length <= current) {
    return callback(null);
  }

  // try to do everything sync
  for (let index = current; index < items.length; index++) {
    const item = items[index];

    let hasResult = false;
    let isAsync = false;

    fn(item, (err) => {
      if (err) {
        return callback(err);
      }

      hasResult = true;

      // if sync then next itteration is by for
      if (!isAsync) {
        return void 0;
      }

      // call async function because it was async already
      setImmediate(() => eachSeriesSync(items, fn, callback, current + 1));
    });

    isAsync = true;

    // waiting for async operation
    if (!hasResult) {
      return void 0;
    }
  }

  // everything sync finished
  callback(null);
}

export default class Paper extends EventEmitter {
  constructor(options = {}) {
    super();

    this._options = {
      ...defaultOptions,
      ...options,
    };

    this._layers = [];
    this._images = {};
  }

  clearCache() {
    this._images = {};
  }

  getOptions() {
    return this._options;
  }

  getLayers() {
    return [...this._layers];
  }

  clear(disableEmit) {
    this._layers.forEach((layer) => {
      layer.removeListener('change', this.emitChange);
    });

    this._layers = [];

    if (!disableEmit) {
      this.emitChange();
    }
  }

  getImage(url, callback) {
    const cacheImages = this.getOptions().cacheImages;

    if (this._images[url]) {
      return callback(null, this._images[url]);
    }

    this.getOptions().getImage(url, (err, img) => {
      if (err) {
        return callback(err);
      }

      if (cacheImages) {
        this._images[url] = img;
      }

      callback(null, img);
    });
  }

  up(layer, disableEmit) {
    const layers = this._layers;

    if (!(layer instanceof Layer)) {
      return this.up(layers[layer], disableEmit);
    }

    const index = layers.indexOf(layer);
    if (index <= 0 || index >= layers.length) {
      return false;
    }

    layers[index] = layers[index - 1];
    layers[index - 1] = layer;

    if (!disableEmit) {
      this.emitChange();
    }

    return true;
  }

  addLayer(layer, disableEmit) {
    if (!(layer instanceof Layer)) {
      throw new Error('Layer is not instanceof layer');
    }

    this._layers.push(layer);

    layer.on('change', this.emitChange);

    if (!disableEmit) {
      this.emitChange();
    }
  }

  emitChange = () => {
    this.emit('change');
  }

  useLayers(layers, disableEmit) {
    this.clear(disableEmit);

    layers.forEach((layer) => this.addLayer(layer, disableEmit));
  }

  toJSON() {
    return this._layers.map((layer) => layer.toJSON());
  }

  forEach(fn) {
    return this._layers.forEach(fn);
  }

  map(fn) {
    return this._layers.map(fn);
  }

  render(canvas, continueOnError, callback) {
    if (typeof continueOnError === 'function') {
      return this.render(canvas, false, false, continueOnError);
    }

    const options = this.getOptions();
    const ctx = canvas.getContext('2d');

    // setup basic
    ctx.patternQuality = options.patternQuality;
    ctx.antialias = options.antialias;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // fill background color
    if (options.backgroundColor) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // render layers
    const layers = this.getLayers();

    eachSeriesSync(layers, (layer, eachCallback) => {
      if (layer.isHidden()) {
        return eachCallback(null);
      }

      // disable overlap off styles
      ctx.save();

      layer.prepareContext(ctx);
      layer.render(ctx, this, (err) => {
        ctx.restore();

        if (continueOnError) {
          return eachCallback(null);
        }

        eachCallback(err);
      });
    }, callback);
  }
}
