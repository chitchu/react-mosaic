import React, {Component} from 'react';
import Style from 'styled-components';

import settingsIcons from './ic_settings_black_24px.svg';

class Options extends Component {
  state = {optionVisible: false};

  OptionsContainer = Style.div`
    position:absolute;
    top: 0;
    right: 0;
  `;

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
  `;
  OptionPanel = Style.div`
    background-color: white;
    position: absolute;
    top: 4rem;
    right: 1rem;
    padding: 0.6rem;
    box-shadow: 0px 1px 2px rgba(33, 33, 33, 0.2);
  `;

  fontStyle = `font-family: "Helvetica Neue", Helvetica; font-size: 0.8rem;`;
  StyledInput = Style.input`
    ${this.fontStyle}
    padding: 0.4rem;
    color: #777;
  `;

  StyledSelect = Style.select`
    ${this.fontStyle}
    display: block;
    width: 100%;
    padding: 0.4rem;
    color: #777;
  `;

  StyledLabel = Style.label`
    ${this.fontStyle}
    color: #777;
    display: block;
    margin-bottom: 1rem;
  `;

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
  `;

  ApplyContainer = Style.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.6rem 0;
  `;

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleOptionToggle = () => {
    this.setState({optionVisible: !this.state.optionVisible});
  };

  handleTileSizeChange = ({target: {value}}) => {
    this.setState({tileSize: Math.min(100, Math.max(0, value))});
  };

  handleOnApply = () => {
    this.props.onChange(this.state);
  };

  handleRendererChange = ({target: {value}}) => {
    this.setState({selectedRenderer: value});
  };
  render() {
    const options = this.state.optionVisible ? (
        <this.OptionPanel>
          <this.StyledLabel>
            Tile Size
            <this.StyledInput
              type="number"
              onChange={this.handleTileSizeChange}
              value={this.state.tileSize}
            />
          </this.StyledLabel>
          <this.StyledLabel>
            Renderer
            <this.StyledSelect
              onChange={this.handleRendererChange}
              value={this.state.selectedRenderer}
            >
              <option value="default">Square (default)</option>
              {this.props.renderers.map((renderer, index) => {
                  return (
                    <option key={index} value={renderer}>
                      {renderer}
                    </option>
                  );
                })}
            </this.StyledSelect>
          </this.StyledLabel>
          <this.ApplyContainer>
            <this.StyledButton onClick={this.handleOnApply}>
              Apply
            </this.StyledButton>
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

export default Options;
