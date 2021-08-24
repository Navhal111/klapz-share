import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({

  mainview: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.25,
    width: Metrics.WIDTH,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: { 
            marginTop: Metrics.HEIGHT * 0.10,      
          },
      android: {
        marginTop: Fonts.moderateScale(25)
      }
    }),
    elevation: 0
  },
  menuIcon: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: Metrics.WIDTH * 0.02,
    marginBottom: Metrics.HEIGHT * 0.05,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: Metrics.HEIGHT * 0.05,
      },
      android: {
        marginTop: Metrics.HEIGHT * 0.05,
      },
    }),
  },
  otpTitleMainView: {
    marginTop: Metrics.HEIGHT * 0.08,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 20
  },
  spaceView: {
    marginBottom: Metrics.HEIGHT * 0.03,
  },

  textPurple: {
    color: Colors.purple,
    fontSize: Fonts.moderateScale(20),
    alignSelf: 'center',
  },

  textTitle: {
    color: Colors.primarycolor,
    fontSize: Fonts.size.h2,
    textAlign: "center"
    ,fontFamily: "Montserrat-Bold"
  },
  textSubTitle: {
    color: Colors.lessWhite,
    fontSize: Fonts.size.small,
    alignSelf: "center",fontFamily: "Montserrat-Regular"
  },
  inputFieldSec: {
    height: Metrics.HEIGHT * 0.50,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
  },
  thinLine: {
    width: Metrics.WIDTH * 0.5,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: 'grey',
    marginTop: Metrics.HEIGHT * 0.01,
    marginLeft: Metrics.WIDTH * 0.2,
  },
  inputFieldRow: {
    alignSelf: "center",
  },
  inputFieldView: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: Fonts.size.buttonWidth1,
    height: Fonts.size.buttonHeight1,
    backgroundColor: Colors.lightBackground,
    borderRadius: Metrics.WIDTH * 0.04,
    paddingLeft: Metrics.WIDTH * 0.06,
  },
  otpFieldRow: {
    marginTop:20,
    alignSelf: 'center',
    flexDirection: 'row',
    width: Fonts.size.buttonWidth1,
    height: Fonts.size.buttonHeight1,
    backgroundColor: Colors.lightBackground,
    borderRadius: 15,
    paddingLeft: Metrics.WIDTH * 0.06,
    paddingRight: Metrics.WIDTH * 0.06,
  },
  labelRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.05,
  },
  buttonRow: {
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.WIDTH * 0.06,
    flexDirection: 'row',
    marginTop: 5,
    width: Metrics.WIDTH,
  },
  verifyRow: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH * 0.6,
  },
  textLabel: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.01,
    marginRight: Metrics.WIDTH * 0.04,
    alignSelf: "center",fontFamily: "Montserrat-Regular",
    marginLeft: 10,
  },
  textInput: {
    marginTop: Metrics.HEIGHT * 0.01,
    width: "100%",
    fontSize: Fonts.moderateScale(16),fontFamily: "Montserrat-Regular",
    color: Colors.snow,

  },
  textInputAndroid: {
    marginTop: 10,
    paddingTop: 10,
    alignSelf: "center",
    fontSize: Fonts.moderateScale(16),
    color: Colors.snow,
  },
  textLabelResend: {
    color: Colors.snow,
    opacity: 0.7,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.01,
    marginRight: Metrics.WIDTH * 0.04,
    alignSelf: "center",
    fontFamily: Fonts.type.RubikLight,
  },
  textSmallWhite: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.01,
    alignSelf: "center",
    fontFamily: Fonts.type.RubikLight,
  },
  countryLabel: {
    color: Colors.purple,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.01,
    alignSelf: "center",
  },
  verifyLabel: {
    color: Colors.purple,
    fontSize: Fonts.moderateScale(18),
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
    alignSelf: "center",
  },
  verifySmallLabel: {
    color: Colors.purple,
    fontSize: Fonts.moderateScale(13),
    alignSelf: "center",
  },
  textError: {
    textAlign: "center",
    marginTop: 10,
    color: Colors.lessWhite,
    fontSize: Fonts.moderateScale(13)
    ,fontFamily: "Montserrat-Regular"
  },
  otpInput: {
    fontSize: Fonts.moderateScale(16)
    ,fontFamily: "Montserrat-Regular",
    color: Colors.snow,
    width: "100%"
  },
  signInSec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
  },
  buttonSignIn: {
    backgroundColor: Colors.primarycolor,
    borderRadius: Metrics.WIDTH * 0.04,
    alignItems: "center",
    alignSelf: "center",
    width: Fonts.size.buttonWidth1,
    height: Fonts.size.buttonHeight1,
    shadowOffset: { width: 2, height: 3 },
    shadowColor: "#116384",
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
    justifyContent: "center",
    marginTop: Metrics.HEIGHT * 0.065
  },
  buttonResend: {
    justifyContent: 'flex-end',
    alignItems: "flex-end",
    paddingHorizontal: 10
  },
  buttonBack: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center',
    width: Metrics.WIDTH * 0.15,
    height: Metrics.HEIGHT * 0.08,
    borderRadius: 15,
    backgroundColor: Colors.primarycolor,
  },
  buttonVerify: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center',
    width: Metrics.WIDTH * 0.6,
    height: Metrics.HEIGHT * 0.08,
    borderRadius: 15,
    backgroundColor: Colors.primarycolor,
  },
  buttonsOTP: {
    flexDirection: 'row',
    marginTop: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    justifyContent: 'space-around',
  },
  textWhite: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20),
  },
  textOrange: {
    color: Colors.background,
    fontSize: Fonts.moderateScale(20),
    fontFamily: Fonts.type.RubikLight,
    fontWeight: "bold"
  },
  textSmallOrange: {
    color: Colors.background,
    fontSize: Fonts.moderateScale(16)
    ,fontFamily: "Montserrat-Bold"
  },
  textSmallWhite: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16)
    ,fontFamily: "Montserrat-Bold"
  },
  textSignup: {
    color: Colors.purple,
    fontSize: Fonts.moderateScale(16),
  },
  textVersion: {
    color: '#8B8989',
    fontSize: Fonts.moderateScale(16),
  },
  textSignupDesc: {
    color: '#696969',
    fontSize: Fonts.moderateScale(16),
  },
  createAccount: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.03,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  versionView: {
    marginTop: Metrics.HEIGHT * 0.03,
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.03,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default styles;
