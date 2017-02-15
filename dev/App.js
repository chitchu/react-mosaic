import React, { Component } from 'react';
import Mosaic from '../src/Mosaic';
import InputFile from './InputFileToDataUrl';

class App extends Component {
  state = { imageSource: '', tileSize: 8 };
  handleOnChange = b64Image => {
    this.setState({ imageSource: b64Image });
  };
  render() {
    return (
      <div>
        <div>
          <InputFile onChange={this.handleOnChange} />
        </div>
        <div>
          <Mosaic
            src={this.state.imageSource}
            width={1024}
            height={768}
            tileSize={this.state.tileSize}
          />
        </div>
      </div>
    );
  }
}

export default App;
