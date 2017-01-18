import React from 'react';

const polygonRenderer = ({x, y, tileSize, key, color, ...rest}) => (
  <polygon
    key={key}
    points={
      key % 2
        ? `${x},${y} ${x + tileSize},${y} ${x + tileSize / 2},${y + tileSize}`
        : `${x},${y + tileSize} ${x + tileSize / 2},${y} ${x + tileSize},${y +
          tileSize}`
    }
    {...rest}
  />
);

const circleRenderer = ({x, y, tileSize, color, ...rest}) => (
  <circle cx={x} cy={y} r={tileSize / 2} {...rest} />
);

const halfToneRenderer = ({x, y, tileSize, color, ...rest}) => {
  const size = (16777215 - Number(`0x${color}`)) / 16777215 * tileSize;
  return <circle cx={x} cy={y} r={size / 1.5} {...rest} />;
};

export {polygonRenderer,circleRenderer,halfToneRenderer};
