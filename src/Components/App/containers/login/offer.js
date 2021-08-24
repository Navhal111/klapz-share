import React, {useContext,useEffect,useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  StatusBar, Alert,
  Dimensions,
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
import { ScrollView } from "react-native-gesture-handler";


const offer = (props) => {
    const [shareData, setshareData] = useState(props.route.params?props.route.params.shareData:null)
    const [offerdata, setofferdata] = useState(props.route.params?props.route.params.offer:{})
    
    const nrescreen = () =>{
        if(offerdata.proceedAction =="how-to-klap"){
            props.navigation.replace('HowTo', {balanceClaps:props.balanceClaps,shareData:shareData});
        }else{
            props.navigation.replace('Home', {balanceClaps:props.balanceClaps,shareData:shareData});
        }
        
    }

    useEffect(() => {
      console.log(offerdata);
    }, [])

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{paddingVertical:30,alignItems:"center",flexGrow:1,justifyContent:"center"}}>           
                 <View style={styles.titleView}>
                        <Text style={{fontSize:24,color:"#000",fontFamily: "Montserrat-Bold"}}>Congratulations</Text>
                </View>
                <Image source={require("./../../Images/offerrs.png")} style={{height: 226,width: windowWidth-40,marginVertical:40,resizeMode:"contain"}} />

                <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:30,fontFamily: "Montserrat-Regular"}}>{offerdata?.text1}</Text>            

                <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:30,marginTop:40,fontFamily: "Montserrat-Regular"}}>{offerdata?.text2}</Text>

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
                                    nrescreen()
                                }}
                            >
                                <Text style={{ fontSize: 18, color: "#fff",fontFamily: "Montserrat-Regular" }}>{offerdata?.proceedButton}</Text>
                    </TouchableOpacity>  
                    {/* <View style={styles.titleView}>
                        <Text style={{fontSize:24,color:"#000",fontFamily: "Montserrat-Bold"}}>Congratulations</Text>
                </View>
                <Image source={require("./../../Images/offerrs.png")} style={{height: 226,width: windowWidth-40,marginVertical:40,resizeMode:"contain"}} />

                <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:30,fontFamily: "Montserrat-Regular"}}>{offerdata?.text1}</Text>            

                <Text style={{fontSize:15,textAlign:"center",color:"#525252",paddingHorizontal:30,marginTop:40,fontFamily: "Montserrat-Regular"}}>{offerdata?.text2}</Text>

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
                                    nrescreen()
                                }}
                            >
                                <Text style={{ fontSize: 18, color: "#fff",fontFamily: "Montserrat-Regular" }}>{offerdata?.proceedButton} Done</Text>
                    </TouchableOpacity>              */}
        </ScrollView>
    )
}

export default offer
