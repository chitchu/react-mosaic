import React, {Component} from 'react';
import {
  getRowColumnIterator,
  getCanvasContext,
  getImageObj,
  countColumnsAndRows,
  getAverageRGB,
  decimalToHex
} from './MosaicUtils';

class Mosaic extends Component {

  state = {
    analyseComplete: false,
    tileList: [],
    columns: 0,
    rows: 0,
    width: 0,
    height: 0
  }

  componentWillReceiveProps() {
    // if (nextSrc !== src) {
      this.setState({
        analyseComplete: false,
        tileList: []
      });
    // }
  }

  componentDidUpdate() {
    if (!this.state.analyseComplete) {
      const imageObj = getImageObj(this.props.src);
      const {width, height} = imageObj;
      const context = getCanvasContext(width, height);
      const {columns, rows} = countColumnsAndRows(width, height, this.props.tileSize, this.props.tileSize);

      context.drawImage(imageObj, 0, 0, width, height);

      let tileList = [];

      const avgColours = getAverageRGB(imageObj, this.props.tileSize, this.props.tileSize);

      const iterateRowColumns = getRowColumnIterator();

      iterateRowColumns
        .send({columns, rows})
        .on('message', ({type, index}) => {
          tileList.push(`${decimalToHex(avgColours[(index * 4)])}${decimalToHex(avgColours[(index * 4) + 1])}${decimalToHex(avgColours[(index * 4) + 2])}`);
          if (tileList.length === rows*columns) {
            this.setState({
              analyseComplete: true,
              tileList: tileList,
              columns,
              rows,
              width: width,
              height: height
            });
            iterateRowColumns.kill();
          }
        });
    }
  }
  render() {
    const { tileSize } = this.props;
    const { columns } = this.state;

    const _tiles = (this.state.analyseComplete) ? this.state.tileList.map( (hex, index) => {
      const _x = ((index >= columns) ? index%columns : index) * tileSize;
      const _y = Math.floor( index / columns ) * tileSize;
      return (<MosaicTile x={_x} y={_y} key={index} tileSize={tileSize} bgColour={`#${hex}`} />);
    }) : '';

    return (
      <svg width={this.state.width} height={this.state.height} viewBox={`0 0 ${this.state.width} ${this.state.height}`} xmlns="http://www.w3.org/2000/svg" style={this.props.style}>
         {_tiles}
      </svg>
    );
  }
}

/**
 *
 * MosaicTile component
 *
 */
const MosaicTile = ({x, y, tileSize, bgColour}) =>
  <rect x={x} y={y} width={tileSize} height={tileSize} fill={bgColour} />

export {
  Mosaic as default
}
