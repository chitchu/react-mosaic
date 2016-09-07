import React, { Component } from 'react';
import InputFileToDataURL from './InputFileToDataURL';
import Mosaic from './Mosaic';
// import BlockingTest from './BlockingTest';

class App extends Component {

  state = {
    image: '',
    tileSize: 30,
    width: 633,
    height: 412
  }

  handleFileChange = image => {
    this.setState({
      image
    });
  }

  handleWidthChange = ({target: {value}}) => {
    this.setState({
      width: value
    });
  };

  handleHeightChange = ({target: {value}}) => {
    this.setState({
      height: value
    });
  };

  handleTileSizeChange = ({target: {value}}) => {
    this.setState({
      tileSize: value
    });
  }

  render () {
    return (
      <div>
        <InputFileToDataURL onChange={this.handleFileChange} />
        <input type='text' value={this.state.tileSize} onChange={this.handleTileSizeChange} />
        <Mosaic src={this.state.image} width={this.state.width} height={this.state.height}
          tileSize={this.state.tileSize} style={{display:'block'}}/>
      </div>
    )
  }
}

export {
  App as default
}