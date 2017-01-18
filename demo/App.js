import React, {Component} from 'react';
import Style from 'styled-components';

import Mosaic from '../src/Mosaic';
import Progress from './Progress';
import Options from './Options';
import StockPhoto from './stock-photo-134210163.jpg';

import debounce from 'lodash/debounce';

class App extends Component {
  state = {
    image: StockPhoto,
    tileSize: 12,
    mosaicWidth: 1024,
    mosaicHeight: 768,
    tileRenderer: 'circleRenderer'
  };

  Container = Style.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  Input = Style.input`
    padding: 1rem;
    width: 50%;
    font-family: 'Courgette', cursive;
    color: #777;
    border: none;
    box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.2);

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: pink;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: pink;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: pink;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: pink;
    }
  `;

  StyledMosaic = Style(Mosaic)`
    position: absolute;
    z-index: -1;
  `;

  componentDidMount() {
    this.setState({
      mosaicWidth: window.innerWidth,
      mosaicHeight: window.innerHeight
    });
  }

  // wait 500ms after the user enter the url
  // before we fetch the image.
  fetchImage = debounce(
    url => {
      var image = new Image();
      image.crossOrigin = 'anonymous';
      // removes cors
      image.src = `https://enigmatic-river-32289.herokuapp.com/?src=${url}`;
      image.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        var dataURL = canvas.toDataURL();
        this.setState({image: dataURL});
      };
    },
    500
  );

  handleOnChange = ({target: {value}}) => {
    if (value) {
      this.fetchImage(value);
    } else {
      this.setState({image: ''});
    }
  };

  // Render an alternating triangle
  polygonRenderer = ({x, y, tileSize, key, ...rest}) => (
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

  circleRenderer = ({x, y, tileSize, ...rest}) => (
    <circle cx={x} cy={y} r={tileSize / 2} {...rest} />
  );

  handleOptionsChange = ({tileSize, selectedRenderer}) => {
    this.setState({tileSize: tileSize, tileRenderer: selectedRenderer});
  };

  emitter = {
    on(handler) {
      this.handler = handler;
    },
    fire(args) {
      if (this.handler)
        this.handler(args);
    }
  };

  handleProgress = ({current, total}) => {
    const progress = current / total * 100;
    this.emitter.fire({progress});
  };

  render() {
    return (
      <this.Container>
        <Progress emitter={this.emitter} />
        <Options
          onChange={this.handleOptionsChange}
          tileSize={this.state.tileSize}
          renderers={['circleRenderer', 'polygonRenderer']}
        />
        <this.Input
          type="text"
          placeholder="Enter image url"
          autoFocus
          onChange={this.handleOnChange}
        />
        <Mosaic
          src={this.state.image}
          tileSize={this.state.tileSize}
          width={this.state.mosaicWidth}
          height={this.state.mosaicHeight}
          tileRenderer={this[this.state.tileRenderer] || null}
          onProgress={this.handleProgress}
          style={{position: 'absolute', zIndex: -1, left: 0, top: 0}}
        />
      </this.Container>
    );
  }
}

export {App as default};
