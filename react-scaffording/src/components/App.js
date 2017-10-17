import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './counter/Counter';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Counter />
    );
  }
}


App.propTypes = {

}
App.defaultProps = {

}