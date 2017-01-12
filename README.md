# react-mosaic

Generate mosaic images in react.

[![Build Status](https://travis-ci.org/chitchu/react-mosaic.svg?branch=master)](https://travis-ci.org/chitchu/react-mosaic)
[![npm version](https://badge.fury.io/js/react-mosaic.svg)](https://www.npmjs.com/package/react-mosaic)

## Getting started

```bash
$ npm install react-mosaic
```

```jsx
import React from 'react';
import Mosaic from 'react-mosaic';

const imageSource = 'data:image/png;base64, ...'; //requires base64 encoded image

// If you don't pass a `tileRenderer` function the
// component will render each tile with a boring box.
const tileRenderer = props => (
  <circle cx={props.x} cy={props.y} r={6} fill={props.fill} key={props.key} />
);

const App = () => (
  <Mosaic src={imageSource} tileSize="12" width="800" height="450" tileRenderer={tileRenderer} />
);

export default App;
```
