let images = {};

export default function getImage(url, callback) {
  if (!url) {
    return callback(new Error('Image url is undefined'));
  }

  const img = new Image();
  img.onload = () => callback(null, img);
  img.onerror = () => callback(new Error('There is a problem with image ' + url));

  img.src = url;
}

export function getImageCached(url, callback) {
  if (!url) {
    return callback(new Error('Image url is undefined'));
  }

  if (images[url]) {
    return callback(null, images[url]);
  }

  getImage(url, (err, img) => {
    if (err) {
      return callback(err);
    }

    images[url] = img;
    callback(null, img);
  });
}

export function clearCache() {
  images = {};
}

