import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Login';

describe('<Login />', () => {
  test('should render without exploding', () => {
    const props = {};
    const tree = renderer.create(<Login {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
