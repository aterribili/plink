import React, { Component, PropTypes } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

function generatePosition() {
  const top = getRandomArbitrary(0, HEIGHT)-40;
  const left = getRandomArbitrary(0, WIDTH)-40;

  return {
    position: 'absolute',
    top: top >= 0 ? top : 0,
    left: left >= 0 ? left : 0,
    right: 0,
    bottom: 0,
  };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let timeouts = [];

export default class Plink extends Component {
  state = {
    currentPosition: generatePosition(),
    score: 0,
    error: 0,
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

  render() {
    const { currentPosition, score, error } = this.state;
    return (
      <View style={ { flex: 1 } }>
        <Text style={ styles.text }>Score: {score}</Text>
        <Text style={ styles.errors }>Error: {error}</Text>
        <TouchableHighlight onPress={ this.onPress.bind(this) }>
          <View>
            {currentPosition &&
              <Ball position={ currentPosition }/>
            }
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class Ball extends Component {
  render() {
    const { position } = this.props;
    const style = StyleSheet.flatten([ styles.ball, position ]);
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  text: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 0,
    bottom: 0,
  },
  errors: {
    position: 'absolute',
    top: 70,
    left: 10,
    right: 0,
    bottom: 0,
  }
});

