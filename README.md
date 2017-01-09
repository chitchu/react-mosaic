# react-mosaic

Generate mosaic images in react.

[![Build Status](https://travis-ci.org/chitchu/react-mosaic.svg?branch=master)](https://travis-ci.org/chitchu/react-mosaic)

## Getting started

```bash
$ npm install react-mosaic
```

```jsx
import React from 'react';
import Mosaic from 'react-mosaic';

const imageSource = 'data:image/png;base64, ...'; //requires base64 encoded image

const App = () => (
  <Mosaic src={imageSource} tileSize="12" width="800" height="450" />
);

export default App;
```