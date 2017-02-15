import React, { Component } from 'react';

class InputFileToDataURL extends Component {
  constructor() {
    super();
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange({ target: { files: [ file ] } }) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      this.props.onChange(result);
    };
    reader.readAsDataURL(file);
  }
  render() {
    return (
      <label>
        <p>Load an image</p>
        <input type="file" onChange={this.handleFileChange} accept="image/*" />
      </label>
    );
  }
}

export { InputFileToDataURL as default };
