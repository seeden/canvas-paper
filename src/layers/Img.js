import Layer from './Layer';
import LayerType from '../constants/LayerType';
import ResizeType from '../constants/ResizeType';
import CoverType from '../constants/CoverType';

const defaultOptions = {
  type: LayerType.IMAGE,
  url: null,
  resizeType: ResizeType.NONE,
  coverType: CoverType.LEFT_TOP,
  imageSmoothingEnabled: true,
};

export default class Img extends Layer {
  constructor(parent, options = {}) {
    super(parent, {
      ...defaultOptions,
      ...options,
    });
  }

  getImageSmoothingEnabled() {
    return this.getOptions().imageSmoothingEnabled;
  }

  getUrl() {
    return this.getOptions().url;
  }

  setUrl(value) {
    return this.set('url', value);
  }

  getResizeType() {
    return this.getOptions().resizeType;
  }

  setResizeType(value) {
    return this.set('resizeType', value);
  }

  getCoverType() {
    return this.getOptions().coverType;
  }

  setCoverType(value) {
    return this.set('coverType', value);
  }

  resizeFit(ctx, img) {
    const position = this.getOffset();

    if (typeof position.width === 'undefined' || typeof position.height === 'undefined') {
      ctx.drawImage(img, position.x, position.y);
    } else {
      ctx.drawImage(img, position.x, position.y, position.width, position.height);
    }
  }

  getCoverSize(img) {
    const position = this.getOffset();

    // thumb size
    const width = position.width || img.width;
    const height = position.height || img.height;

    const ratioDesc = width / height;
    const ratioSource = img.width / img.height;

    let sourceWidth = img.width;
    let sourceHeight = img.height;

    if (ratioDesc > ratioSource) {
      sourceHeight = Math.floor(sourceWidth / ratioDesc);
    } else {
      sourceWidth = Math.floor(sourceHeight * ratioDesc);
    }

    return {
      width: sourceWidth,
      height: sourceHeight,
    };
  }

  getCoverPosition(img) {
    const coverSize = this.getCoverSize(img);

    const position = {
      x: 0,
      y: 0,
      width: coverSize.width,
      height: coverSize.height,
    };

    const diffRight = {
      width: img.width - coverSize.width,
      height: img.height - coverSize.height,
    };

    const diffCenter = {
      width: Math.floor(diffRight.width / 2),
      height: Math.floor(diffRight.height / 2),
    };

    const coverType = this.getCoverType();
    if (coverType === CoverType.CENTER_TOP || coverType === CoverType.CENTER_CENTER || coverType === CoverType.CENTER_BOTTOM) {
      position.x += diffCenter.width;
    } else if (coverType === CoverType.RIGHT_TOP || coverType === CoverType.RIGHT_CENTER || coverType === CoverType.RIGHT_BOTTOM) {
      position.x += diffRight.width;
    }

    if (coverType === CoverType.LEFT_CENTER || coverType === CoverType.CENTER_CENTER || coverType === CoverType.RIGHT_CENTER) {
      position.y += diffCenter.height;
    } else if (coverType === CoverType.LEFT_BOTTOM || coverType === CoverType.CENTER_BOTTOM || coverType === CoverType.RIGHT_BOTTOM) {
      position.y += diffRight.height;
    }

    return position;
  }

  resizeCover(ctx, img) {
    const destPosition = this.getOffset();
    const sourcePosition = this.getCoverPosition(img);

    ctx.drawImage(img,
      sourcePosition.x, sourcePosition.y, sourcePosition.width, sourcePosition.height,
      destPosition.x, destPosition.y, destPosition.width, destPosition.height);

    return this;
  }

  getImage(callback) {
    return super.getImage(this.getUrl(), callback);
  }

  render(ctx, parent, callback) {
    this.getImage((err, img) => {
      if (err) {
        return callback(err);
      }

      if (!img) {
        return callback(new Error('Image is undefined'));
      }

      ctx.imageSmoothingEnabled = this.getImageSmoothingEnabled();

      const resizeType = this.getResizeType();

      if (resizeType === ResizeType.CANVAS) {
        const canvas = ctx.canvas;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else if (resizeType === ResizeType.FIT) {
        this.resizeFit(ctx, img);
      } else if (resizeType === ResizeType.COVER) {
        this.resizeCover(ctx, img);
      } else {
        ctx.drawImage(img, this.getX(), this.getY());
      }

      callback(null);
    });

    return this;
  }
}
