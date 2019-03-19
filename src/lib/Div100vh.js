import React from 'react';
import convertStyle from './convertStyle';
import getWindowHeight from './getWindowHeight';

export default class Div100vh extends React.Component {
  state = {
    style: {}
  };

  // On mount and window resize converts rvh values to px (if there are any).
  // Also, adds `height: 100rvh` if height is not specified at all
  updateStyle = () => {
    if (!this.props.once) {
      const convertedStyle = convertStyle(this.props.style, getWindowHeight());
      this.setState({ style: convertedStyle });
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
    const { once, ...otherProps } = this.props;
    return <div {...otherProps} style={this.state.style} />;
  }
}
