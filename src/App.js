import React, { Component } from 'react';
import InputFileToDataURL from './InputFileToDataURL';
import Mosaic from './Mosaic';

class App extends Component {

  state = {
    image: '',
    tileSize: 30,
    previewTileSize: 30
  }

  handleFileChange = image => {
    this.setState({
      image
    });
  }

  handleTileSizeChange = ({target: {value}}) => {
    this.setState({
      previewTileSize: value
    })
  }

  handleApply = () => {
    this.setState({
      tileSize: this.state.previewTileSize
    });
  }

  render () {
    return (
      <div>
        <InputFileToDataURL onChange={this.handleFileChange} />
        <input type='text' value={this.state.previewTileSize} onChange={this.handleTileSizeChange} />
        <button onClick={this.handleApply}>Apply</button>
        <Mosaic src={this.state.image} tileSize={this.state.tileSize}/>
      </div>
    )
  }
}

export {
  App as default
}