import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const SCREEN_HEIGHT = dimensions.height;
const SCREEN_WIDTH  = dimensions.width;

export function generateRandomPosition(width: number, height: number): {top: number, left: number} {
  const top = getRandomArbitrary(0, SCREEN_HEIGHT - height);
  const left = getRandomArbitrary(0, SCREEN_WIDTH - width);
  return {top: top, left: left};
}

function getRandomArbitrary(min, max): number {
  return Math.random() * (max - min) + min;
}

