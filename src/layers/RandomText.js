import Text from './Text';
import LayerType from '../constants/LayerType';

const defaultOptions = {
  type: LayerType.RANDOM_TEXT,
  variants: ['Sample Random Text'],
};

export default class RandomText extends Text {
  constructor(parent, options = {}) {
    super(parent, {
      ...defaultOptions,
      ...options,
    });
  }

  getVariants() {
    return this.getOptions().variants || [];
  }

  addVariant(value, disableEmit) {
    const variants = this.getVariants();

    return this.set('variants', [...variants, value], disableEmit);
  }

  removeVariant(index, disableEmit) {
    const variants = this.getVariants();

    return this.set('variants', [
      ...variants.slice(0, index),
      ...variants.slice(index + 1, variants.length),
    ], disableEmit);
  }

  getText() {
    const variants = this.getVariants();
    const position = Math.floor(Math.random() * variants.length);

    return variants[position];
  }
}
