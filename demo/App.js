import React, { Component } from 'react';
import InputFileToDataURL from './InputFileToDataURL';
import Mosaic from '../src/Mosaic';

class App extends Component {

  state = {
    image: '',
    tileSize: 16
  }

  handleFileChange = image => {
    this.setState({
      image
    });
  }

  handleApply = () => {
    this.setState({tileSize: this.tileSize.value});
  }

  componentDidMount() {
    this.tileSize.value = this.state.tileSize;
  }

  handleTileRenderer = ({x, y, ...rest}) => {
    return <circle cx={x} cy={y} r={this.state.tileSize / 2} {...rest} />
  }

  render () {
    return (
      <div>
        <InputFileToDataURL onChange={this.handleFileChange} />
        <input type='text' ref={input => this.tileSize = input} />
        <button onClick={this.handleApply}>Apply</button>
        <Mosaic src={this.state.image} tileSize={this.state.tileSize} width={1024} height={768} tileRenderer={this.handleTileRenderer}/>
      </div>
    )
  }
}

export {
  App as default
}
