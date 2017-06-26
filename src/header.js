import React, { Component, PropTypes } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Pause from './Pause';

export default class Header extends Component {
  render() {
    const { errorCount, scoreCount, onPressPause, style } = this.props;
    const containerStyle = StyleSheet.flatten([ style, styles.container ]);

    return (
      <View style={ containerStyle }>
        <Text style={ styles.errorCount }>Errors: {errorCount}</Text>
        <Text style={ styles.scoreCount }>Score: {scoreCount}</Text>
        <TouchableHighlight
          onPress={ onPressPause.bind() }
          style={ styles.pause }
          underlayColor={ 'rgba(100,100,100,0)' }
        >
          <Text>Pause</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  errorCount: PropTypes.number.isRequired,
  scoreCount: PropTypes.number.isRequired,
  onPressPause: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  scoreCount: {
    fontSize: 20,
  },
  errorCount: {
    color: 'red',
    fontSize: 16,
  }
});
