import React, {Component, PropTypes} from 'react';
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
  };

  static propTypes = {
    src: PropTypes.string.isRequired,
    tileSize: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onProgress: PropTypes.func,
    tileRenderer: PropTypes.func
  };

  componentWillReceiveProps() {
    this.setState({analyseComplete: false, tileList: []});
  }

  componentDidUpdate() {
    if (!this.state.analyseComplete) {
      getImageObj(this.props.src || '').then(imageObj => {
        const {width, height} = imageObj;
        const context = getCanvasContext(width, height);
        const {columns, rows} = countColumnsAndRows(
          width,
          height,
          this.props.tileSize,
          this.props.tileSize
        );

        context.drawImage(imageObj, 0, 0, width, height);

        let tileList = [];

        const avgColours = getAverageRGB(
          imageObj,
          this.props.tileSize,
          this.props.tileSize
        );

        const {tileSize} = this.props;

        const iterateRowColumns = getRowColumnIterator();

        // See: Threads
        iterateRowColumns
          .send({columns, rows})
          .on('message', ({type, index}) => {
            const x = (index >= columns ? index % columns : index) * tileSize;
            const y = Math.floor(index / columns) * tileSize;
            const hex = `${decimalToHex(avgColours[index * 4])}${decimalToHex(
              avgColours[index * 4 + 1]
            )}${decimalToHex(avgColours[index * 4 + 2])}`;
            const fill = `#${hex}`;
            const tile = this.props.tileRenderer &&
              typeof this.props.tileRenderer === 'function'
              ? this.props.tileRenderer({
                x,
                y,
                tileSize,
                fill,
                color: hex,
                key: index
              })
              : <rect
                x={x}
                y={y}
                key={index}
                width={tileSize}
                height={tileSize}
                fill={fill}
              />;

            tileList.push(tile);

            if (typeof this.props.onProgress === 'function') {
              this.props.onProgress({
                total: rows * columns,
                current: tileList.length
              });
            }
            if (tileList.length === rows * columns) {
              this.setState(
                {analyseComplete: true, tileList, columns, rows, width, height},
                this.props.onComplete
              );
              iterateRowColumns.kill();
            }
          });
      });
    }
  }

  render() {
    const {width, height} = this.props;
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        style={this.props.style}
      >
        {this.state.tileList}
      </svg>
    );
  }
}

export {Mosaic as default};
