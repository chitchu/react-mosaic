import React, {Component} from 'react';
import Style from 'styled-components';

class Progress extends Component {
  state = {progress: 0};

  componentDidMount() {
    this.props.emitter.on(({progress}) => {
      if (this.state.progress !== progress) {
        this.setState({progress: progress});
      }
    });
  }
  Bar = Style.div`
    position:absolute;
    left: 0;
    top: 0;
    height: 2px;
    background-color: #337ab7;
  `;
  render() {
    return <this.Bar style={{width: `${this.state.progress}%`}} />;
  }
}

export default Progress;
