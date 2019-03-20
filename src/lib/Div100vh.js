import React from 'react';
import convertStyle from './convertStyle';
import getWindowHeight from './getWindowHeight';

export default class Div100vh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      style: {}
    };
  }

  // On mount and window resize converts rvh values to px (if there are any).
  // Also, adds `height: 100rvh` if height is not specified at all
  updateStyle = () => {
    if (!this.props.once || this.state.done) {
      const convertedStyle = convertStyle(this.props.style, getWindowHeight());
      this.setState({ style: convertedStyle, done: true });
    }
  };

  componentDidMount() {
    this.updateStyle();
    window.addEventListener('resize', this.updateStyle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateStyle);
  }

  render() {
    const { once, component, ...otherProps } = this.props;
    let Component =
      typeof component === 'string' && component.length > 1 ? component : 'div';
    return React.createElement(Component, {
      ...otherProps,
      style: this.state.style
    });
  }
}
