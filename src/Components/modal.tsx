import React,{useState} from 'react'
import { View, Text, TouchableOpacity,Modal,Dimensions,Animated } from 'react-native'
import Login from '../Components/App/containers/login/Login'
import OTP from '../Components/App/containers/login/Otp'
import GiveKlaps from '../Components/App/containers/GiveKlaps'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
import { Colors } from "../Components/App/Themes";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const modal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [visible, setvisible] = useState(props.visible)
    const [loadervisible, setloadervisible] = useState(props.loadervisible)
    const [animatedtost, setanimatedtost] = useState(new Animated.Value(-(windowHeight+150)))
    const [OtpScreen, setOtpScreen] = useState(false)
    const [Mobiledata, setMobiledata] = useState({})
    const [LoginDone, setLogin] = useState(false)


    const [tpc, settpc] = useState(
        {
            "tpc": [{
                "source": props.AppName,
                "content": {
                    "text": props.title,
                    "title": props.title,
                    "requestNote": "Thanks for klapping",
                    "thankNote": "Appreciate your Klap.",
                    "preferredKlaps": props.preferredKlaps,  
                    "creatorIdentifier": "UCOEz7lYPz-51sEk0cE0-FZA",
                    "expressionDefault": "Tell us, what you love about this Content",
                    "giveDefault": "Give: "
                }
            }],
            "balanceClaps": 0,
            "text1": "How many Klapz will you give?",
            "text2": "Can we notify your friends about this Klap?"
        }
    )


    const Openstart = ()=>{
        Animated.timing(animatedtost, {
            useNativeDriver: false,
            toValue: -(windowHeight+120),
            duration: 500
        }).start()  
    }
    const closeWall = () => {
        Animated.timing(animatedtost, {
            useNativeDriver: false,
            toValue: -120,
            duration: 500
        }).start()
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity
            onPress={()=>{
                closeWall()
            }}
            style={{ backgroundColor: Colors.background, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                <Text style={{ color: "#fff", fontSize: 25, }}>Klapz</Text>
            </TouchableOpacity>

            <Animated.View
                style={{alignItems:"center",justifyContent:"flex-end",position:"absolute",bottom:animatedtost,alignSelf:"center"}}
            >
                {/* <TouchableOpacity 
                onPress={()=>{
                    setModalVisible(!modalVisible);
                }}
                style={{backgroundColor: "#00000050",flex:1}}> */}
                <View style={{
                    height:windowHeight-50,
                    width:windowWidth,
                    backgroundColor: LoginDone?"#fff":Colors.background,
                    marginTop: 50,
                    borderRadius: 20,
                    elevation:10,
                    flex:1
                }}>
                <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignItems:"center",paddingTop: Platform.OS === "android" ? 30 : 20,width:windowWidth}}>
                    <View style={{flexDirection:"row", alignItems: "center",paddingVertical:5}}>
                      <TouchableOpacity style={{alignItems: "flex-end",marginRight:10,}} onPress={() => Openstart()}>
                          <Icon name="close" size={25} color={LoginDone?Colors.background:"#fff"} />
                      </TouchableOpacity>                       
                    </View>
                </View>  
                {
                    LoginDone?
                    <GiveKlaps tpc={tpc}/>
                    :
                    <View style={{flex:1}}>
                    {
                        OtpScreen?
                        <OTP {...props} route = {{params:Mobiledata}}
                                LoginSucess={(object)=>{
                                    console.log(object);      
                                    alert("SDf")                              
                                    setLogin(true)
                                }}
                                Back={()=>{
                                    setOtpScreen(false)
                                }}
                        />
                        :
                        <Login {...props}  OtpScreen={(object)=>{
                            setOtpScreen(true)
                            setMobiledata(object)
                        }}/>
                    }   
                 </View>  

                }  

             
                </View>
                {/* </TouchableOpacity> */}
            </Animated.View>
        </View>
    )
}

export default modal
