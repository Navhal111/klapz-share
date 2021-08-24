import {Alert, Platform} from 'react-native';
import klapzconfig from './config';
import * as RootNavigation from './RootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryData from '../../../assets/resources/countries'

const Countries = CountryData;

const deviceStorage = {
   
  async saveUserData(data) {

    console.log("saveUserData data: " + JSON.stringify(data));
    
    try {
          var authToken = '';
          var firstName = '';
          var lastName = '';
          var balanceClaps = '';
          var email = '';
          var referralCode = '';
          var _id = '';
          var profilePic = '';
          var registrationId = '';
          if(data.authToken !== null) {
            authToken = (data.authToken).toString();
          }

          if(data.firstName !== null) {
            firstName = data.firstName;
          }

          if(data.lastName !== null) {
            lastName = data.lastName;
          }
          if(data.balanceClaps !== null) {
            balanceClaps = (data.balanceClaps).toString();
          }

          if(data.email !== null) {
            email = data.email;
          }

          if(data.registrationId != null){
            registrationId = data.registrationId
          }

          if(data.referralCode !== null) {
            referralCode = data.referralCode;
          }

          if(data._id !== null) {
            _id = data._id;
          }
          // if(data.feedTo){
          //   if(data.feedTo[0].profilePic != null){
          //     profilePic = data.feedTo[0].profilePic 
          //   }else{
          //     if(data.profilePic != null){
          //       profilePic = data.profilePic
          //     }
          //   }
          // }
/*          console.log("Printing user data: " + firstName + "," + lastName + 
                "," + balanceClaps + "," + authToken + "," + email + 
                "," + referralCode + "," +  _id);
*/  
          console.log("Asdasdasd");
          console.log(registrationId);
           await AsyncStorage.multiSet([
              ['firstName', firstName],
              ['lastName', lastName],
              ['balanceClaps', balanceClaps],
              ['klapztoken', authToken],
              ['email', email],
              ['referralCode', referralCode],
              ['_id', _id],
              ['registrationId', registrationId.toString()],
            ]);
            await AsyncStorage.setItem('userdatacore', JSON.stringify(data));
            await AsyncStorage.setItem('klapztoken', authToken)

    } catch(error) {
      console.log(error);
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //================
  async loadTokenFromSharedStorage() {
    try {
      console.log("inside load token******");
      const appGroupIdentifier = "group.com.klapz.customer";
      console.log("klapztoken : " + klapztoken);
    } catch(errorCode) {
      // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
      // errorCode 1 = there is no value for that key
      console.log(errorCode);
    }
  },
  //===========================

  async loadJWT() {
    try {
      const jsonValue = await AsyncStorage.getItem('klapztoken');
      //const token = jsonValue != null ? JSON.parse(jsonValue) : null;
      //global.authToken = token;
      global.authToken = jsonValue;
      return jsonValue;
    } 
    catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

logout() {
  Alert.alert(
    'Please Confirm',
    'Are you sure you want to logout?',
    [
      {text: 'No', style: 'cancel'},
      {text: 'Yes', onPress: () => {
      deviceStorage.logoutMain();}
      },],
    { cancelable: false }
  );
},
async logoutMain() {
    //Remove Asynstorage keys
    try {
        if(Platform.OS === 'ios') {
          const appGroupIdentifier = "group.com.klapz.customer";
        }  
          OneSignal.removeExternalUserId()      
          AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then( async () => {
              try {
                global.authToken = null;
                RootNavigation.replace("Welcome");
              } catch (error) {
                console.error(error);
                global.authToken = null;
                RootNavigation.replace("Welcome");
              }
              
            });
        } catch(error) {
          console.log(error);
    }
  },
  async storeContacts(contactToStore){
    try {
      await AsyncStorage.setItem('@klapzUserContacts', JSON.stringify(contactToStore));
      console.log("Contacts Stored!");
      return true;
    }catch(error){
      return error;
    }
  },
  async updateFeeds(feeds){
    try {
      await AsyncStorage.setItem('@klapzFeeds', JSON.stringify(feeds));
      console.log("Feed stored!");
      return true;
    }catch(error){
      console.log(error);
      return error;
    }
  },
  async countryCodeAdd(object){
    try {      
      await AsyncStorage.setItem('@klapzCountryCode', object.name.toString());
      console.log("Klapz Cuurency: ",object.isoAlpha2.toString());
      await AsyncStorage.setItem('@klapzCountryCodeISO', object.isoAlpha2.toString());
      console.log("Klapz Cuurency: ",object.currency);
      await AsyncStorage.setItem('@klapzCurrency', JSON.stringify(object.currency));
      console.log("Country code stored!");
      return true;
    }catch(error){
      console.log(error);
      return error;
    }
  },
  async updateLastFetchedFeeds(){
    try {
      await AsyncStorage.setItem('@lastFetchedFeeds', new Date().getTime().toString());
      console.log("Last fetched epoch stored!");
      return true;
    }catch(error){
      console.log(error);
      return error;
    }
  },
  async updateCurrencyConversation(currentRate){
    try {
      await AsyncStorage.setItem('@lastFetchedRate', new Date().getTime().toString());
      await AsyncStorage.setItem('@coversationRate', currentRate.toString());
      console.log("Last fetched epoch stored!");
      return true;
    }catch(error){
      console.log(error);
      return error;
    }
  },
  convertTime(dateString){
    if(dateString){
      try{
        var iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;
        var matches = dateString.match(iso8601DurationRegex);
        if(matches[5]) { matches[5] = matches[5].length === 1 ? "0"+matches[5] : matches[5]; }
        if(matches[6]) { matches[6] = matches[6].length === 1 ? "0"+matches[6] : matches[6]; }
        if(matches[7]) { matches[7] = matches[7].length === 1 ? "0"+matches[7] : matches[7]; }
        if(matches[8]) { matches[8] = matches[8].length === 1 ? "0"+matches[8] : matches[8]; }
    
        var time = matches[5] != undefined ? matches[5]+"d, " : "";
        time += matches[6] != undefined ? matches[6]+"hr, " : "";
        time += matches[7] != undefined ? matches[7]+"m, " : "";
        time += matches[8] != undefined ? matches[8]+"s" : "";
        return time;
      }catch(error){
        console.log(error);
        return ""
      }
    }else{
      return ""
    }

  }
};

export default deviceStorage;
