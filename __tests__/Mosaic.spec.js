import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Mosaic from '../src/Mosaic';

Enzyme.configure({ adapter: new Adapter() });

// 10x10 spacer.gif
const image =
  'data:image/gif;base64,R0lGODlhCgAKAIAAAAAAAAAAACH5BAEAAAAALAAAAAAKAAoAAAIIhI+py+0PYysAOw==';

describe('Component rendering', () => {
  it('should contain the correct props', () => {
    const wrapper = shallow(
      <Mosaic src={image} tileSize={25} width={100} height={100} />
    );
    const { width, height } = wrapper.props();
    expect(wrapper.is('svg')).toBe(true);
    expect(width).toBe(100);
    expect(height).toBe(100);
  });
});
