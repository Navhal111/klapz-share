import React, {useState,useEffect} from 'react'
import { View, Text ,Modal ,Dimensions ,Image,Animated} from 'react-native'
const { width, height } = Dimensions.get("window");
import IconFo from 'react-native-vector-icons/MaterialIcons';
const Toast = (props) => {

    const [visible, setvisible] = useState(props.visible)
    const [loadervisible, setloadervisible] = useState(props.loadervisible)
    const [animatedtost, setanimatedtost] = useState(new Animated.Value(-120))

    useEffect(() => {
        console.log("Chnage");
        if(props.visible){
            Animated.timing(animatedtost, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500
            }).start()
            setTimeout(()=>{
                Animated.timing(animatedtost, {
                    useNativeDriver: false,
                    toValue: -120,
                    duration: 500
                }).start(()=>{
                    props.onClose()
                })
            }, 3000);
        }else{
            Animated.timing(animatedtost, {
                useNativeDriver: false,
                toValue: -120,
                duration: 500
            }).start()                    
        }

    }, [props.visible])
   

    return (        
        <View>
        {
            props.visible?
            <Animated.View
            style={{alignItems:"center",justifyContent:"flex-end",opacity:1,position:"absolute",bottom:animatedtost,alignSelf:"center"}}
            onRequestClose={() => {
               setvisible(false)
           }}
           >
                   <View style={{alignItems:"center",justifyContent:"flex-end"}}>
                       <View style={{width:width-40,borderRadius:20,overflow:"hidden",padding:20,marginBottom:20,backgroundColor:"#fff",borderColor:"gray",borderWidth:0.3}}>
                       {/* <Text style={{color:props.type=="sucess"?"green":"red",fontSize:18,fontWeight:"bold"}}> 
                            {props.type=="sucess"?"Sucess":"Error"}
                        </Text> */}
                        <View style={{flexDirection:"row",alignItems:"center"}}>   
                        {
                            props.shared?
                            null
                            :
                            <IconFo name={props.type=="sucess"?'check-circle':"error"} style={[{width:30,color:props.type=="sucess"?"green":"red",marginTop:0,fontSize:25}]}> </IconFo>  
                        } 
                        
                        <Text style={{color:props.type=="sucess"?"green":"red",fontSize:16,fontFamily: "Montserrat-Bold",width:width-150}}> 
                               {props.label}
                        </Text>
                        </View>
                       </View>
                 </View>
   
           </Animated.View>
            :
            null
        }
        <Modal 
         animationType="fade"
         transparent={true}
         visible={props.loadervisible}
         style={{alignItems:"center",justifyContent:"flex-end"}}
         onRequestClose={() => {
            setloadervisible(false)
        }}
        >
                <View style={{alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:"#00000060"}}>
                    <View style={{backgroundColor:"#fff",borderRadius:70,overflow:"hidden",padding:20,marginBottom:20}}>
                            <Image style={{width:70,height:70}} source={require("../../assets/loading.gif")} ></Image>
                    </View>
              </View>

        </Modal>        

        </View>
    )
}



export default Toast
