import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

export const BALL_WIDTH = 40;
export const BALL_HEIGHT = 40;

export default class Ball extends Component {
  render() {
    const style = StyleSheet.flatten([ styles.ball, this.props.position ]);

    return (<View style={ style }/>);
  }
}

Ball.propTypes = {
  position: PropTypes.shape({
    position: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
  }),
};

const styles = StyleSheet.create({
  ball: {
    width: BALL_WIDTH,
    height: BALL_HEIGHT,
    borderRadius: BALL_WIDTH / 2,
    backgroundColor: 'blue',
  },
});

