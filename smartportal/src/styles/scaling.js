import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

export const guidelineBaseWidth = 414;
export const guidelineBaseHeight = 896;

const widthRatio = width / guidelineBaseWidth;
const heightRatio = height / guidelineBaseHeight;

export const scale = (size) => widthRatio * size;
export const verticalScale = (size) => heightRatio * size;

const defaultModerateFactor = width > guidelineBaseWidth ? 0.5 : 1.25;

export const moderateScale = (size, factor = defaultModerateFactor) =>
  size + (scale(size) - size) * factor;
