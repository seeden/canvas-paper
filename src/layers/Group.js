import Layer from './Layer';
import LayerType from '../constants/LayerType';
import { eachSeries } from 'async-sync';
import isPlainObject from 'lodash/lang/isPlainObject';

const defaultOptions = {
  type: LayerType.GROUP,
  layers: [],
};

export default class Group extends Layer {
  constructor(parent, options = {}) {
    super(parent, {
      ...defaultOptions,
      ...options,
    });

    this._layers = [];
    this.getOptions().layers.map((layer) => this.addLayer(layer, true));
  }

  clear(disableEmit) {
    this._layers = [];

    if (!disableEmit) {
      this.emitChange();
    }
  }

  getLayers() {
    return this._layers;
  }

  addLayer(layer, disableEmit) {
    if (isPlainObject(layer)) {
      return this.addLayer(this.parse(this, layer), disableEmit);
    }

    if (!(layer instanceof Layer) || layer.getPaper() !== this.getPaper()) {
      throw new Error('Layer is not instanceof layer or paper is not same');
    }

    layer.on('change', this.emitChange);

    this._layers.push(layer);

    if (!disableEmit) {
      this.emitChange();
    }
  }

  toJSON() {
    const data = super.toJSON();
    data.layers = this.getLayers().map((layer) => layer.toJSON());

    return data;
  }

  render(ctx, callback, continueOnError) {
    const layers = this.getLayers();

    eachSeries(layers, (layer, eachCallback) => {
      if (layer.isHidden()) {
        return eachCallback(null);
      }

      // disable overlap off styles
      ctx.save();

      // reset paths
      ctx.beginPath();

      layer.prepareContext(ctx);
      layer.render(ctx, (err) => {
        ctx.restore();

        if (continueOnError) {
          return eachCallback(null);
        }

        eachCallback(err);
      }, continueOnError);
    }, callback);
  }
}
