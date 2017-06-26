import React, { Component, PropTypes } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Pause from './Pause';
import Ball, { BALL_WIDTH, BALL_HEIGHT } from './ball';
import { generateRandomPosition } from './position';

function generatePosition() {
  const position = generateRandomPosition(BALL_WIDTH, BALL_HEIGHT - 30);

  return {
    position: 'absolute',
    top: position.top >= 0 ? position.top : 0,
    left: position.left >= 0 ? position.left : 0,
    right: 0,
    bottom: 0,
  };
}

let timeouts = [];

export default class Plink extends Component {
  state = {
    currentPosition: generatePosition(),
    score: 0,
    error: 0,
    pause: false,
  };

  invalidate() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({ currentPosition: undefined }, this.random.bind(this));
  }

  onError() {
    const { error } = this.state;
    this.setState({ error: error + 1});
    this.invalidate();
  }

  onPress() {
    const { score } = this.state;
    this.setState({ score: score + 1 }, this.invalidate.bind(this));
  }

  random() {
    timeouts.push(setTimeout(() => {
      this.setState({ currentPosition: generatePosition() }, () => {
        timeouts.push(setTimeout(this.onError.bind(this), 1000));
      })
    }, 1000));
  }

  onPause() {
    const { pause } = this.state;
    if (pause) {
      this.setState({ pause: false, }, this.random.bind(this));
    } else {
      timeouts.forEach(timeout => clearTimeout(timeout));
      this.setState({ pause: true, currentPosition: undefined });
    }
  }

  renderContainer(isPaused, currentPosition) {
    if (isPaused) {
      return (
        <Pause/>
      );
    }

    return (
      <TouchableHighlight onPress={ this.onPress.bind(this) }>
      <View>
      {currentPosition &&
        <Ball position={ currentPosition }/>
      }
      </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { pause, currentPosition, score, error } = this.state;
    return (
      <View style={ { flex: 1 } }>
        <View style={ styles.header }>
        <Text style={ styles.errors }>Error: {error}</Text>
        <Text style={ styles.text }>Score: {score}</Text>
        <TouchableHighlight onPress={ this.onPause.bind(this) } style={ styles.pause }>
          <Text>Pause</Text>
        </TouchableHighlight>
        </View>
        <View style={{ flex: 0.9 }}>
          {this.renderContainer(pause, currentPosition)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 20,
  },
  errors: {
    color: 'red',
    fontSize: 16,
  }
});

