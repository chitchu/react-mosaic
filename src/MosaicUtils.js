import { spawn } from 'threads';

const getRowColumnIterator = () => spawn(({ columns, rows }, done) => {
  let rowIndex = -1, colIndex = -1, index = 0;
  while (rowIndex++ !== rows - 1) {
    colIndex = -1;
    while (colIndex++ !== columns - 1) {
      done({ type: 'column', index: index++ });
    }
  }
});

const decimalToHex = decimal => {
  var _d = decimal.toString(16);
  _d = _d.length === 1 ? `0${_d}` : _d;
  return _d;
};

const getAverageRGB = (image, tileWidth, tileHeight) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = Math.ceil(image.width / tileWidth);
  canvas.height = Math.ceil(image.height / tileHeight);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
};

const getCanvasContext = (viewportWidth, viewportHeight) => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', viewportWidth);
  canvas.setAttribute('height', viewportHeight);
  const context = canvas.getContext('2d');
  return context;
};

const getImageObj = (image, callback) => {
  return new Promise((resolve, reject) => {
    const imageObj = new Image();
    imageObj.onload = evt => {
      resolve(imageObj);
    };
    imageObj.src = image;
  });
};

const countColumnsAndRows = (
  viewportWidth,
  viewportHeight,
  tileWidth,
  tileHeight
) =>
  {
    const columns = Math.ceil(viewportWidth / tileWidth),
      rows = Math.ceil(viewportHeight / tileHeight);
    return { columns, rows };
  };

const getColoursFromPixel = (x, y, w, h, context) => {
  return context.getImageData(x, y, w, h).data;
};

export {
  getRowColumnIterator,
  getCanvasContext,
  getImageObj,
  countColumnsAndRows,
  getColoursFromPixel,
  getAverageRGB,
  decimalToHex
};
