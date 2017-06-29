import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Header from './header';
import Pause from './Pause';
import Ball, { BALL_WIDTH, BALL_HEIGHT } from './ball';
import { generateRandomPosition } from './position';

const STATUSBAR_HEIGHT = 20;
const HEADER_HEIGHT = 50;

function generatePosition() {
  const position = generateRandomPosition(BALL_WIDTH, BALL_HEIGHT);
  const top = position.top - (HEADER_HEIGHT + STATUSBAR_HEIGHT);
  const left = position.left;

  return {
    position: 'absolute',
    top: top >= 0 ? top : 0,
    left: left >= 0 ? left : 0,
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
    const { error, score } = this.state;

    if (error > score) {
      this.setState({ score: 0, error: 0, currentPosition: generatePosition()}, () => {
        alert('Você perdeu, seu número de erros foi maior que acertos!');
      });
    } else {
      this.setState({ error: error + 1});
      this.invalidate();
    }
  }

  onPress() {
    const { score } = this.state;

    this.setState({ score: score + 1 }, this.invalidate.bind(this));
  }

  random() {
    const { score } = this.state;
    const currentInterval = 1000 - (score * 10);

    timeouts.push(setTimeout(() => {
      this.setState({ currentPosition: generatePosition() }, () => {
        timeouts.push(setTimeout(this.onError.bind(this), currentInterval));
      })
    }, currentInterval));
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
        <Header
          style={ styles.header }
          errorCount={ error }
          scoreCount={ score }
          onPressPause={ this.onPause.bind(this) }
        />
        <View style={{ flex: 0.9 }}>
          {this.renderContainer(pause, currentPosition)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

