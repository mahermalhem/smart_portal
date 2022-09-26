import { Dimensions, Platform, PixelRatio} 
  from 'react-native';
  
  export const {
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;
  

  export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) 
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
  
  //export const FONT_FAMILY='Cairo_700Bold';

  // export const FONT_FAMILY='Cairo-SemiBold';


  //Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const screenSize = Math.sqrt(SCREEN_WIDTH * SCREEN_HEIGHT) / 100;


const newScale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
size + (newScale(size) - size) * factor;


export { newScale, verticalScale, moderateScale, screenSize };