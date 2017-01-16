import React, { Component } from 'react';
import Style from 'styled-components';

import InputFileToDataURL from './InputFileToDataURL';
import Mosaic from '../src/Mosaic';

import debounce from 'lodash/debounce';

import settingsIcons from './ic_settings_black_24px.svg';

class App extends Component {

  state = {
    image: '',
    tileSize: 12,
    mosaicWidth: 1024,
    mosaicHeight: 768
  }

  Container = Style.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `

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
  `

  StyledMosaic = Style(Mosaic)`
    position: absolute;
    z-index: -1;
  `



  componentDidMount() {
    this.setState({
      mosaicWidth: window.innerWidth,
      mosaicHeight: window.innerHeight
    });
    // starting image
    this.fetchImage('https://drscdn.500px.org/photo/99973913/q%3D80_m%3D2000/b358f88dd9ce890b7ac34ccaefca30a4');
  }

  // wait 500ms after the user enter the url
  // before we fetch the image.
  fetchImage = debounce(url => {
    var image = new Image();
    image.crossOrigin = 'anonymous';
    // removes cors
    image.src = `https://enigmatic-river-32289.herokuapp.com/?src=${url}`;
    image.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      var dataURL = canvas.toDataURL();
      this.setState({
        image: dataURL
      });
    }
  }, 500);

  handleOnChange = ({target: {value}}) => {
    if (value) {
      this.fetchImage(value);
    } else {
      this.setState({
        image: ''
      });
    }
  }

  // Render an alternating triangle
  polygonRenderer = ({x, y, tileSize, key, ...rest}) => (
    <polygon key={key} points={key % 2 ?  `${x},${y} ${x+tileSize},${y} ${x+tileSize/2},${y+tileSize}` : `${x},${y+tileSize} ${x+tileSize/2},${y} ${x+tileSize},${y+tileSize}`} {...rest} />
  )

  circleRenderer = ({x, y, tileSize, ...rest}) => (
    <circle cx={x} cy={y} r={tileSize / 2} {...rest} />
  )

  handleOptionsChange = ({tileSize, selectedRenderer}) => {
    this.setState({
      tileSize: tileSize,
      tileRenderer: selectedRenderer
    });
  }

  emitter = {
    on(handler) {
      this.handler = handler;
    },
    fire(args) {
      if (this.handler) this.handler(args);
    }
  }

  handleProgress = ({current, total}) => {
    const progress = (current / total) * 100;
    this.emitter.fire({progress});
  }

  render () {
    return (
      <this.Container>
        <Progress emitter={this.emitter} />
        <Options onChange={this.handleOptionsChange} tileSize={this.state.tileSize} renderers={['circleRenderer', 'polygonRenderer']} />
        <this.Input type="text" placeholder="Enter image url" autoFocus onChange={this.handleOnChange} />
        <Mosaic src={this.state.image} tileSize={this.state.tileSize} width={this.state.mosaicWidth} height={this.state.mosaicHeight} tileRenderer={this[this.state.tileRenderer] || null} onProgress={this.handleProgress} style={{position:'absolute', zIndex:-1, left: 0, top: 0}}/>
      </this.Container>
    )
  }
}

class Progress extends Component {
  state = {
    progress: 0
  }

  componentDidMount() {
    this.props.emitter.on(({progress}) => {
      this.setState({
        progress: progress
      });
    });
  }
  Bar = Style.div`
    position:absolute;
    left: 0;
    top: 0;
    height: 2px;
    background-color: #337ab7;
  `
  render() {
    return (this.state.progress !== 100) ? <this.Bar style={{width: `${this.state.progress}%`}} /> : <div/>;
  }
}

class Options extends Component {

  state = {
    optionVisible: false
  }

  OptionsContainer = Style.div`
    position:absolute;
    top: 0;
    right: 0;
  `

  StyledSettingsButton = Style.button`
    background: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 1rem;
    top: 1rem;
    &:focus {
      outline: none;
    }
  `
  OptionPanel = Style.div`
    background-color: white;
    position: absolute;
    top: 4rem;
    right: 1rem;
    padding: 0.6rem;
    box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.2);
  `

  fontStyle = `font-family: "Helvetica Neue", Helvetica; font-size: 0.8rem;`;
  StyledInput = Style.input`
    ${this.fontStyle}
    padding: 0.4rem;
    color: #777;
  `

  StyledSelect = Style.select`
    ${this.fontStyle}
    display: block;
    width: 100%;
    padding: 0.4rem;
    color: #777;
  `

  StyledLabel = Style.label`
    ${this.fontStyle}
    color: #777;
    display: block;
    margin-bottom: 1rem;
  `

  StyledButton = Style.button`
    ${this.fontStyle}
    background-color: #5cb85c;
    color: #f0f0f0;
    border: none;
    padding: 0.4rem 1.2rem;
    cursor: pointer;
    &:hover {
      background-color: #61bd61;
    }
  `

  ApplyContainer = Style.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.6rem 0;
  `

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  handleOptionToggle = () => {
    this.setState({
      optionVisible: !this.state.optionVisible
    });
  }

  handleTileSizeChange = ({target: {value}}) => {
    this.setState({
      tileSize: Math.min(100, Math.max(0, value))
    });
  }

  handleOnApply = () => {
    this.props.onChange(this.state);
  }

  handleRendererChange = ({target: {value}}) => {
    this.setState({
      selectedRenderer: value
    });
  }
  render() {
    const options = this.state.optionVisible ? (
      <this.OptionPanel>
        <this.StyledLabel>
          Tile Size
          <this.StyledInput type="number" onChange={this.handleTileSizeChange} value={this.state.tileSize} />
        </this.StyledLabel>
        <this.StyledLabel>
          Renderer
          <this.StyledSelect onChange={this.handleRendererChange} value={this.state.selectedRenderer}>
            <option value='default'>Square (default)</option>
            {this.props.renderers.map( (renderer, index) => {
              return <option key={index}>{renderer}</option>
            })}
          </this.StyledSelect>
        </this.StyledLabel>
        <this.ApplyContainer>
          <this.StyledButton onClick={this.handleOnApply}>Apply</this.StyledButton>
        </this.ApplyContainer>
      </this.OptionPanel>
    ) : '';
    return (
      <this.OptionsContainer>
        <this.StyledSettingsButton onClick={this.handleOptionToggle}>
          <img src={settingsIcons} />
        </this.StyledSettingsButton>
        {options}
      </this.OptionsContainer>
    );
  }
}

export {
  App as default
}
