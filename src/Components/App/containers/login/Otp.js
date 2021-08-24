import React, {useContext,useEffect,useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar, Alert,
} from "react-native";

// Screen Styles
import styles from "./styles";
import klapzconfig from '../../components/services/config';
import deviceStorage from '../../components/services/deviceStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryData from '../../../assets/resources/countries';
// import SmsListener from 'react-native-android-sms-listener'
// import RNOtpVerify from 'react-native-otp-verify';
import Toast from "../../components/Toast"


const Otp = ({navigation, route,LoginSucess,Back}) => {
  const [one, setOne] = React.useState('');
  const [two, setTwo] = React.useState('');
  const [three, setThree] = React.useState('');
  const [four, setFour] = React.useState('');
  const [errorOtp, setErrorOtp] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(null);
  const [toast, settoast] = useState(false)
  const [toasttext, settoasttext] = useState("Somthing went wrong")
  const [loadervisible, setloadervisible] = useState(false);
  const [type , settype] = useState("");
  const [shareData, setshareData] = useState(route.params?route.params.shareData:null)
  let countryData = CountryData;

  const setPhoto = async (photo) => {
    console.log("-------image-------------------");
    console.log(photo);
    await AsyncStorage.setItem('profilePic', photo)
  }


  // const otpHandler = (message) => {
  //   try{
  //     var layout = message.toString().split(',')
  //     console.log(layout);
  //     console.log(layout[1].split("is")[1].replace(" ",""));
  //     var otp = layout[1].split("is")[1].replace(" ","")
  //     console.log(otp.length);
  //     if(otp.length == 4){
  //       setOne(otp)
  //       validateOTP('1',otp);
  //     }
  //   }catch(e){
  //     console.log(e);
  //   }

  // }

  const validateOTP = (value) => {

    //Dont go further if blank value sent
    if(value === '' || value.length < 4){
      setErrorOtp(true)
      return;
    }
    /*const one = this.state.one;
        const two = this.state.two;
        const three = this.state.three;
        const four = this.state.four;
    */
    // if(twoVal === '') {
    //   console.log("2");
    //   return;
    // }

    // if(threeVal === '') {
    //   console.log("3");

    //   return;
    // }

    // if(fourVal === '') {
    //   console.log("4");

    //   return;
    // }
    var url = klapzconfig.apiurl + 'auth/verify_mobile_otp.json?apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
    var mobilenoWithCountry = route.params.mobile;
    var otp = value;
    var userMobile = {
      user: {
        mobile: mobilenoWithCountry,
        otp: otp
      }
    };
    console.log("OTP Verify",url);
    console.log({
      user :
      {
        mobile: mobilenoWithCountry,
        otp: otp,
        country: route.params.country
      }
    });
    console.log("-----Verify OTP-------");
    fetch(url, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMobile),
    })
    .then((response) => {
      const statusCode = response.status;
      console.log("statusCode: " + statusCode);
      //If 200 then sucess
      if(statusCode !== 200) {
        console.log(response);
        setErrorOtp(true);
        return response.json();
      } else {

        if(response.headers) {
          const authToken = response.headers.get("auth-token");
          setAuthToken(authToken);
          global.authToken = authToken;
          console.log(response);
        }
        return response.json();
      }})
    .then((response) => {
        console.log(response);
        if(response.errors){
          alert(errors.message);
        }else{
          // otpResponse.user.authToken = global.authToken;
          // deviceStorage.saveUserData(otpResponse.user);
          // navigation.navigate('Home', {balanceClaps: otpResponse.user.balanceClaps});
          console.log(response.user);
          console.log("-----------user Login done----------");          
          setPhoto(response.user.photo)
          response.user.authToken = global.authToken;
          deviceStorage.saveUserData(response.user);
          console.log("-----------user Login done----------");  
          console.log(route.params.country);     
          // alert(response.user.profilePic)
          let countryData1 = countryData.filter(function (i,n){
            return i.name.toLowerCase() === route.params.country.toLowerCase();
          });                    
          deviceStorage.countryCodeAdd(countryData1[0])
          console.log("country ==============");
          LoginSucess(response.user)
          // console.log(JSON.stringify(response));
    
        }
      })
    .catch(error => {
      console.log(error);
      setErrorOtp(true);
    });
}

const login = () =>{

  console.log("inside login");

//  this.setState({ error: '', loading: true });

  var url = klapzconfig.apiurl + 'auth/request_mobile_otp';
  var mobilenoWithCountry = route.params.mobile;

  console.log("mobilenoWithCountry: " + mobilenoWithCountry);

  var userMobile = {
    user: {
      mobile: mobilenoWithCountry,
    }
  };
  setloadervisible(true)
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userMobile),
  })
  .then((response) => {
    console.log("got resonse: " + response);
    const statusCode = response.status;
    console.log("statusCode: " + statusCode);
    setloadervisible(false)
    //If 200 then sucess
    if(statusCode == 200) {
      return response.json()
//      this.setState({mobile: ''});
    } else {
//      const responseJson = response.json();
//      const errorMsg = responseJson.error;
        console.log("errorMsg: " + errorMsg);
//      this.setState({errorMobile: true});
    }
  }).then((response) => {
    settype("sucess");
    settoasttext(response.message)
    settoast(true);
  })
  .catch(error => {
    setloadervisible(false)
    console.log("Error: " + error);
  });
}

  return (

    <View style={styles.mainview}>

    <View style={styles.otpTitleMainView}>

      <View style={styles.titleView}>
            <Text style={styles.textTitle}>Enter the 4 digit code</Text>
      </View>
      {/* <View style={styles.titleView}>
            <Text style={styles.textTitle}>to {route.params.mobile}</Text>
      </View> */}
    </View>
    <View style={styles.inputFieldSec}>

        <View style={styles.otpFieldRow}>
            <TextInput
                  style={styles.otpInput}
                  placeholderTextColor="#fff"
                  placeholder={"Enter Code"}
                  value={one}
                  onSubmitEditing={() => {
                    validateOTP(one);
                  }}
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  onChangeText={one => {
                    setOne(one);
                  }}
                  onChange={(e) => {
                    if(e.nativeEvent.text.length === 4){
                      console.log(e.nativeEvent.text);
                      validateOTP(e.nativeEvent.text);
                    }
                  }}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  returnKeyType = {(Platform.OS === 'ios') ? 'done' : 'next' }
                  blurOnSubmit={false}
                  secureTextEntry={true}
            />
              {/* <TextInput
                    ref={(input) => { this.twoInput = input; }}
                    returnKeyType = {(Platform.OS === 'ios') ? 'done' : 'next' }
                    onSubmitEditing={() => { this.threeInput.focus(); validateOTP('2',two);}}
                    blurOnSubmit={false}
                    style={styles.otpInput}
                    placeholderTextColor="#b7b7b7"
                    value={two}
                    underlineColorAndroid="transparent"
                    onChangeText={two => {validateOTP('2',two); if(two !== '') {this.threeInput.focus();}}}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    maxLength={1}
                    secureTextEntry={true}
                    />

                  <TextInput
                    ref={(input) => { this.threeInput = input; }}
                    returnKeyType = {(Platform.OS === 'ios') ? 'done' : 'next' }
                    onSubmitEditing={() => { this.fourInput.focus(); validateOTP('3',three);}}
                    blurOnSubmit={false}
                    style={styles.otpInput}
                    placeholderTextColor="#b7b7b7"
                    value={three}
                    underlineColorAndroid="transparent"
                    onChangeText={three => {validateOTP('3',three); if(three !== '') {this.fourInput.focus();}}}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    maxLength={1}
                    secureTextEntry={true}
                    />

                  <TextInput
                    ref={(input) => { this.fourInput = input; }}
                    returnKeyType = {(Platform.OS === 'ios') ? 'done' : 'next' }
                    onSubmitEditing={() =>  validateOTP('4',four) }
                    blurOnSubmit={false}
                    style={styles.otpInput}
                    placeholderTextColor="#b7b7b7"
                    value={four}
                    underlineColorAndroid="transparent"
                    onChangeText={four => {validateOTP('4',four); if(four !== '') {validateOTP('4', four);}}}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    maxLength={1}
                    secureTextEntry={true}
                  /> */}
        </View>

        <View style={styles.inputFieldRow}>
            {errorOtp ? <Text style={styles.textError}>Please enter a valid Code.</Text> : null}
        </View>

        <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.buttonResend}
                onPress={() => login()}
              >
                <Text style={styles.textSmallWhite}>Resend Code</Text>
              </TouchableOpacity>
      </View>

      <View style={styles.buttonsOTP}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() =>  Back()}
              >
              <FontAwesome name="angle-left" size={30} color="#ff7f57" />
        </TouchableOpacity>

        <TouchableOpacity
                style={styles.buttonVerify}
                onPress={() =>  validateOTP(one)}
              >
                <Text style={styles.textSmallOrange}>Verify</Text>
        </TouchableOpacity>

      </View>

      </View>
      <Toast
          visible={toast}
          onPress={()=>settoast(false)}
          label={toasttext}
          type={type}
          onClose={()=> {console.log("close"); settoast(false)} }
          loadervisible={loadervisible}
      />
</View>

    );
  }

  export default Otp;
