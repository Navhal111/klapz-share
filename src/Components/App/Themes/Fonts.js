import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const type = {
  RubikBlack: "Rubik-Black",
  RubikBlackItalic: "Rubik-BlackItalic",
  RubikBold: "Rubik-Bold",
  RubikBoldItalic: "Rubik-BoldItalic",
  RubikExtraBold: "Rubik-ExtraBold",
  RubikExtraBoldItalic: "Rubik-ExtraBoldItalic",
  RubikItalic: "Rubik-Italic",
  RubikLight: "Rubik-Light",
  RubikLightItalic: "Rubik-LightItalic",
  RubikMedium: "Rubik-Medium",
  RubikMediumItalic: "Rubik-MediumItalic",
  RubikRegular: "Rubik-Regular",
  RubikSemiBold: "Rubik-SemiBold",
  RubikSemiBoldItalic: "Rubik-SemiBoldItalic"
};

const size = {
  h1: 38,
  h2: height * 0.04,
  h3: height * 0.025,
  lineSpace: height * 0.00001,
  buttonHeight1: height * 0.09,
  buttonWidth1: width * 0.85,
  input: 18,
  regular: 17,
  medium: 14,
  small: height * 0.02,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: "bold",
    fontSize: size.h2
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style,
  scale,
  verticalScale,
  moderateScale
};
