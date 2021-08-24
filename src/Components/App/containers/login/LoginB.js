import React, { Component,useEffect} from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  Image,
  Alert,
  Modal,
  FlatList,
  Linking
} from "react-native";

// Screen Styles
import styles from "./styles";
import klapzconfig from '../../components/services/config';
import { Colors } from "../../Themes";
import Toast from "../../components/Toast"
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryData from '../../../assets/resources/dialCode';
import DialCode from '../../../assets/resources/countries';
import Feather from 'react-native-vector-icons/Feather';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import * as RNLocalize from "react-native-localize";
import { ScrollView } from "react-native-gesture-handler";

export default class Login extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      isChecked: true,
      mobile: '',
      errorMobile: false,
      isSigninInProgress: false,
      userInfo: null,
      authToken: null,
      toast:false,
      toasttext:"Somthing went wrong",
      loadervisible:false,
      fadeAnimation: new Animated.Value(0),
      to: new Animated.Value(0),
      klapz: new Animated.Value(0),
      googlelogin: new Animated.Value(0),
      countryData: CountryData,
      searchData: CountryData,
      DialCode: DialCode,
      selectedCountry: {},
      modalVisible: false,
      countryCode: RNLocalize.getCountry()
    };
  }
  validate() {
    console.log("inside validate");    
    const mobileno = this.state.mobile;
    if(mobileno != ""){
      let phoneUtil = PhoneNumberUtil.getInstance();
      const number = phoneUtil.parseAndKeepRawInput(mobileno, this.state.countryCode);
      console.log(phoneUtil.isValidNumber(number));
      console.log(phoneUtil.format(number, PhoneNumberFormat.E164));
      if(phoneUtil.isValidNumber(number) && phoneUtil.isPossibleNumber(number)){
        this.login();
      }else{
        this.setState({errorMobile: true});
        return;
      }
    }else{
      this.setState({errorMobile: true});
      return;
    }
  }

  componentDidMount(){
    let dataMyTest = this.state.DialCode.filter((i,n) => i.isoAlpha2 === RNLocalize.getCountry() );
    let selectedCountry = this.state.countryData.filter((i,n) => i.name === dataMyTest[0].name );
    this.setState({
      selectedCountry: selectedCountry[0]
    });
    // if(Platform.OS != "ios"){
    //   RNOtpVerify.getOtp()
    //   .then(p => RNOtpVerify.addListener(this.otpHandler))
    //   .catch(p => console.log(p));

    //   SmsListener.addListener(message => {
    //     console.info(message)
    //   })

    //   RNOtpVerify.getHash()
    //     .then(hash => {
    //       console.log('Use this hash to construct otp message', hash);
    //     }).catch(error => console.log(error));
    //   }

  }



  // otpHandler = (message) => {
  //   var layout = message.toString().split(',')
  //   console.log(layout[1].split("is")[1]).replace(" ","");       
  //   var otp = layout
  //   console.log(otp.length);
  //   if(otp.length == 4){  
  //     setOne(otp)
  //   }
  // }

  login() {

    console.log("inside login");

    this.setState({ error: '', loadervisible: true });

    var url = klapzconfig.apiurl + 'auth/request_mobile_otp?apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
    console.log(url);
    var mobileno = this.state.mobile
    var mobilenoWithCountry = '+'+ this.state.selectedCountry.dialCode + mobileno;
    console.log("mobilenoWithCountry: " + mobilenoWithCountry);    
    var userMobile = {
                user : 
                {
                  mobile: mobilenoWithCountry,
                },
              };

      var headers_set = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token' : "",
      }           

    fetch(url, {
      method: 'POST',
      cache:false,
      headers: headers_set,
      body: JSON.stringify(userMobile),
    })
    .then((response) => {
      console.log("got resonse: ");    
      console.log(response);
      console.log(JSON.stringify(response));
      const statusCode = response.status;
      console.log("statusCode: " + statusCode);
      if(response.status == 400){
        response.json().then((value)=>{
          console.log(value);
          if(value.code == "z000"){
              Alert.alert(
                'Alert',
                response.message,
                [
                  {
                    text: 'OK', 
                    onPress: () => Linking.openURL(klapzconfig.bundel)
                  },
                ],
                {cancelable: false},
              );  
              return
          } 
        })

        return response.json()
      }
      //If 200 then sucess
      if(statusCode == 200) {
        this.setState({mobile: '',loadervisible: false});
        this.props.navigation.replace('Otp', {mobile: mobilenoWithCountry,country: this.state.selectedCountry.name});
      } else {        

        console.log(response.code);
        const responseJson = response.json();
        console.log(responseJson);       
        response.json().then(()=>{
          alert("Sdf")
        })
        const errorMsg = responseJson.code;
        this.setState({loadervisible: false});
        console.log("errorMsg: " + errorMsg);
        
        // this.setState({errorMobile: true});
      }
      }).then((response)=>{
        console.log("inner");
        console.log(response);
      })
    .catch(error => {
      console.log("Error: " + error);
      this.setState({errorMobile: true,loadervisible: false});
    });
  }
  setPhoto = async (photo) => {
    console.log("-------image-------------------");
    console.log(photo);
    await AsyncStorage.setItem('profilePic', photo)
  }
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <View style={styles.mainview}>
        <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent: "center",alignItems: "center",paddingVertical: 100}}>
        <View style={styles.titleView}>
                <Text style={styles.textTitle}>What's your phone</Text>
          </View>
          <View style={styles.titleView}>
                <Text style={styles.textTitle}>number?</Text>
          </View>
          <View style={styles.spaceView}/>
          <View style={styles.subTitleView}>
                <Text style={styles.textSubTitle}>You will receive a 4 digit code</Text>
          </View>

          <View style={styles.titleView}>
                <Text style={styles.textSubTitle}>on this number</Text>
          </View>

          <View style={styles.spaceView}/>

          <View style={styles.inputFieldSec}>
              
              {Platform.OS === "android" ?
                  <View style={styles.inputFieldView} removeClippedSubviews={true}> 
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true }) } style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
                        <Image source={this.state.selectedCountry.iso2} style={{height: 20,width: 30}} />
                        <Text style={styles.textLabel}>+{this.state.selectedCountry.dialCode}</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.textInput}
                      placeholderTextColor="#CCCCCC"
                      value={this.state.mobile}
                      autoFocus={true}
                      underlineColorAndroid="transparent"
                      onChangeText={mobile => this.setState({ mobile, errorMobile: false})}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      onSubmitEditing={()=>this.validate()}
                      maxLength={10}
                      contextMenuHidden={true}
                    />
                  </View>
                  :
                  <View style={styles.inputFieldView}> 
                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true }) } style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'row',}}>
                            <Image source={this.state.selectedCountry.iso2} style={{height: 20,width: 30}} />
                            <Text style={styles.textLabel}>+{this.state.selectedCountry.dialCode}</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Phone number"
                          placeholderTextColor="#CCCCCC"
                          value={this.state.mobile}
                          autoFocus={true}
                          underlineColorAndroid="transparent"
                          onChangeText={mobile => this.setState({ mobile, errorMobile: false})}
                          autoCapitalize="none"
                          keyboardType="numeric"
                          onSubmitEditing={()=>this.validate()}
                          maxLength={10}
                          contextMenuHidden={true}
                        />
                  </View>
                  }
              <View style={styles.inputFieldRow}>
                {this.state.errorMobile ? <Text style={styles.textError}>Please enter a valid mobile number</Text> : null}
              </View>
            <View style={styles.signInSec}>
              <TouchableOpacity
                style={styles.buttonSignIn}
                onPress={() =>  this.validate()}
              >
                <Text style={styles.textOrange}>Get OTP</Text>
              </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
          
             <Toast  
                visible={this.state.toast}
                onPress={()=>this.setState({toast:false})} 
                label={this.state.toasttext}        
                onClose={()=> {console.log("close"); this.setState({toast:false})}}     
                loadervisible={this.state.loadervisible}
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({
                        modalVisible: false
                    })
                }}
            >
              <View style={[styles.container,{paddingTop: 20,paddingHorizontal: 20}]}>
                  <View style={styles.contactsWrapper}>
                  <View style={{flexDirection: "row",justifyContent: "space-between"}}>
                      <TouchableOpacity onPress={() => this.setState({modalVisible: false}) } style={{justifyContent: 'center',alignItems: "center"}}>
                          <Feather color={Colors.background} name="chevron-left" size={22} style={{marginLeft: 10}} />
                      </TouchableOpacity>
                      <View style={styles.contactHeadingWrapper}>
                          <Text style={{fontSize: 16,color: Colors.background}}>Choose country</Text>
                      </View>
                      <TouchableOpacity onPress={() => {}}>
                          
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.flatListContainer,{paddingVertical: 10}]}>
                      <TextInput
                          placeholder="search your country"
                          style={{borderRadius: 7,borderWidth: 1,borderColor: "lightgrey",height: 40,paddingHorizontal: 10}}
                          onChangeText={(text) => {
                              let countryData = this.state.searchData.filter(function (i,n){
                                  return i.name.toLowerCase().includes(text.toLowerCase());
                              });
                              this.setState({
                                  countryData
                              });
                          }}
                      />
                      <FlatList
                          data={this.state.countryData}
                          renderItem={({item,index}) => {
                              return (
                                  <TouchableOpacity onPress={() => {
                                      let self = this;
                                      let dataMyTest = this.state.DialCode.filter((i,n) => i.name === item.name );
                                      this.setState({ selectedCountry: item, modalVisible: false, countryCode: dataMyTest[0].isoAlpha2 });
                                      
                                    }} style={{paddingVertical: 10,paddingHorizontal: 5,flexDirection: "row"}}>
                                      <Image source={item.iso2} style={{height: 20,width: 30}} />
                                      <Text style={{fontSize: 16,marginLeft: 10}}>{item.name}</Text>
                                  </TouchableOpacity>
                              )
                          }}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item,index) => index.toString()}
                      />
                  </View>
                  </View>
              </View>
            </Modal>
      </View>
    );
  }
}