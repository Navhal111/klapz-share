import React, {useContext,useEffect,useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar, Alert,
  Dimensions
} from "react-native";

// Screen Styles
import styles from "./styles";
import klapzconfig from '../../components/services/config';
import deviceStorage from '../../components/services/deviceStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryData from '../../../assets/resources/countries';
import Toast from "../../components/Toast"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {Colors,Fonts,Metrics} from '../../Themes';
import ImageLoad from 'react-native-image-placeholder';

const offer = (props) => {

    let [count, setCount] = useState(1);
    let [preferredCount, setPreferredCount] = useState(0);
    const [actionTitle, setActionTitle] = useState("You are Klapping")
    let [sharedSuccess, setSuccess] = useState(false);
    let [sharedError, setError] = useState(false);
    let [videodetail, setVideoDetail] = useState(null);
    let [publicAttr, setpublicAttr] = useState(true);
    let [activetextInput, setActiveTextInput] = useState(true);
    const [totalclaps, settotalclaps] = useState(0)
  
    const [toast, settoast] = useState(false)
    const [toasttext, settoasttext] = useState("Somthing went wrong")
    const [loadervisible, setloadervisible] = useState(true);
    const [screenLoad, setScreenLoad] = useState(true);
    const [showTags, setShowTags] = useState(false);
    const [showTagsBtn, setShowTagsBtn] = useState(false)
    const [type , settype] = useState("");
  
    const [currencyCode, setCurrencyCode] = useState("");
    const [purchaseCode, setPurchaseCode] = useState("");
    const [perKlapPrice, setPerKlapPrice] = useState(2);
    const [preferredTags, setpreferredTags] = useState("");
  
    const [facebookMessage, setFacebookMessage] = useState("");
    const [twitterMessage, setTwitterMessage] = useState("");
    const [whatsappMessage, setWhatsappMessage] = useState("");    
    const [timer, setTimer] = useState(null);

    const [shareData, setshareData] = useState(props.route.params.shareData!=""?props.route.params.shareData:global.videoURL)

    useEffect(() => {
        // props.navigation.addListener('focus', () => {
        // //   getBalanceClaps();
          
        // });
        getVideoDetails();
      }, []);
    
      const getVideoDetails = () => {
        var url = klapzconfig.apiurl + 'tpc/query?apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
        console.log("new url : " + url);
        console.log({
          actualURL: "https://youtube.com/watch?v="+shareData
        });
        console.log(global.authToken);
        setloadervisible(true)
        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk2ODc3NjI4YWY2YTA3ZWVjYmM4ZDMiLCJhc2stcmF0aW5nIjpmYWxzZSwiaWF0IjoxNjI0NTEwNjU5fQ.OTvlPanaH7z-dO60rJYrTcH0if4VfbL4eSa7HC1NNa0',
          },
          body: JSON.stringify({
            actualURL: "https://youtube.com/watch?v="+shareData
          })
        })
        .then((response) => {
          const statusCode = response.status;
          setloadervisible(false)
          console.log("statusCode: " + statusCode);
          //If 200 then sucess
          if(statusCode !== 200) {
             //Error
            return response.json();
          } else {
              console.log(response);
              return response.json();
          }})
        .then((balResponse) => {
            console.log("Video details",JSON.stringify(balResponse));
            if(balResponse.errors){
              if(balResponse.errors.code === "ERR_INVALID_URL"){
                setloadervisible(false)
                settoast(true)
                settoasttext("ERR_INVALID_URL: please select valid url your input is "+balResponse.errors.input);

              }else if(balResponse.errors.errorCode === "z7009"){
                setloadervisible(false)
                settoast(true)
                settoasttext(balResponse.errors.errorMessage);

              }else{
                settoast(true)
                settoasttext("We not found any source of sharing.");
              }
            }else{
              setScreenLoad(false)
              setloadervisible(false)
              setVideoDetail(balResponse);
              setCount(balResponse.tpc.customKlaps ? balResponse.tpc.customKlaps : 2);
              let showTags = false;
              for (const key in balResponse.tpc.tags) {
                if(key != "" && balResponse.tpc.tags[key].show){
                  showTags = true;
                }
              }
              setShowTagsBtn(showTags)
            }
          })
        .catch(error => {
          setloadervisible(false)
          console.log("Error: " + error);
        });
      }
    
      const getBalanceClaps = () => {
        var url = klapzconfig.apiurl +
        'user/profile?props=balanceClaps,numCreatorsSupported,purchasedClaps,globalCreators';
        console.log("new url : " + url);
        setloadervisible(true)
        fetch(url, {
          method: 'GET',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'auth-token' : global.authToken,
          },
        })
        .then((response) => {
          const statusCode = response.status;
          setloadervisible(false)
          console.log("statusCode: " + statusCode);
          //If 200 then sucess
          if(statusCode !== 200) {
             //Error
            return;
          } else {
              console.log(response);
              return response.json();
          }})
        .then((balResponse) => {
            console.log(balResponse);
            setloadervisible(false)
            const userDetails = balResponse.user;
    
            if(userDetails) {
                settotalclaps(userDetails.balanceClaps)
                if(userDetails.balanceClaps == 0){
                    setCount(0)
                }
            }
          })
        .catch(error => {
          setloadervisible(false)
          console.log("Error: " + error);
        });
      }
    
    return (
        !loadervisible?
        <View style={{flex:1,backgroundColor:"#fff",alignItems:"center",paddingTop:windowWidth/5}}>
             <View style={styles.titleView}>
                    <Image source={require("./../../Images/logom.png")} style={{height: 86,width: 86,marginVertical:10}} />
                    <Text style={{fontSize:24,color:"#000",fontFamily: "Montserrat-Bold"}}><Text style={{color:"#FF7F57",fontFamily: "Montserrat-Regular"}}>Klapz Club</Text></Text>
            </View>

            <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:20,fontFamily: "Montserrat-Regular"}}>Affordable way to patronage your favorite content and its creators</Text>                        

             <View style={{width:(windowWidth/2)+150 , alignSelf:"center",borderWidth:0.7,borderColor:"#f4f4f4",marginVertical:30}}></View>

            <View style={{justifyContent: "center",alignItems: "center",}}>
                {
                    videodetail ? <Image
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius:120,
                    }}
                    source={{ uri: videodetail.tpc.channelImage }}
                    resizeMode={`cover`}
                    /> : null
                }
            </View>           
            <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:20,marginTop:20,fontFamily: "Montserrat-Regular"}}>Awesome! Great to see you Klapping to <Text style={{color:"#FF7F57",fontFamily: "Montserrat-Bold"}}>{videodetail ? videodetail.tpc.channelName:""}</Text>’s Video</Text>   
            <View style={{backgroundColor:"#fef7f4",width:windowWidth,marginTop:20}}>
                <Text numberOfLines={3} style={{textAlign: "center",fontSize: 16,paddingVertical: 10,paddingHorizontal: 40,color:"#FF7F57",fontFamily: "Montserrat-Bold"}}>{ videodetail ? videodetail.tpc.title : ""}</Text>
            </View>            
            <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                width: windowWidth / 1.5,
                                height: 40,
                                marginTop:50,
                                justifyContent: 'center',
                                alignSelf: "center",
                                borderRadius: 10,
                                backgroundColor: Colors.background
                            }}
                            onPress={() => { 

                              if(global.authToken) {
                                  props.navigation.replace('KlapsGives', {shareData:"https://youtube.com/watch?v="+shareData});
                              } else{
                                props.navigation.replace('Login', {shareData:"https://youtube.com/watch?v="+shareData});
                              }               
                                            
                            }}
                        >
                <Text style={{ fontSize: 18, color: "#fff" ,fontFamily: "Montserrat-Regular"}}>Proceed</Text>
                </TouchableOpacity>  
                <Toast
                    visible={toast}
                    onPress={()=>settoast(false)}
                    label={toasttext}
                    type={type}
                    onClose={()=> {console.log("close"); settoast(false)} }
                    loadervisible={loadervisible}
                />
        </View>: <View style={{flex:1,backgroundColor:"#fff",alignItems:"center",paddingTop:windowWidth/5}}/>
    )
}

export default offer
