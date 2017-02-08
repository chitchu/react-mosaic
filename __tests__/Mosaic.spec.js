import React from 'react';
import {shallow, mount} from 'enzyme';
import Mosaic from '../src/Mosaic';

// 10x10 spacer.gif
const image = 'data:image/gif;base64,R0lGODlhCgAKAIAAAAAAAAAAACH5BAEAAAAALAAAAAAKAAoAAAIIhI+py+0PYysAOw==';

describe('Component rendering', () => {
  it('should contain the correct props', () => {
    const wrapper = shallow(
      <Mosaic src={image} tileSize={25} width={100} height={100} />
    );
    const {width, height} = wrapper.props();
    expect(wrapper.is('svg')).toBe(true);
    expect(width).toBe(100);
    expect(height).toBe(100);
  });
});