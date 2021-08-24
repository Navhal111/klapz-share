import React from 'react'
import { View, Text ,TouchableOpacity, Platform,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Colors, Metrics, Fonts } from "../Themes/";
import General from './GeneralStatusBar'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const headers = (props) => {
    return (
        <View>
        <General/>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:20,alignItems:"center",paddingTop: Platform.OS === "android" ? 40 : 20,width:windowWidth}}>
            <View style={{flexDirection:"row", alignItems: "center",paddingVertical:5}}>
            {
                props.backbutton?
                <TouchableOpacity style={{alignItems: "flex-end",marginRight:10,}} onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color={props.icncolor?props.icncolor:"#515151"} />
                </TouchableOpacity> 
                :
                null
            }
            <Text style={{fontSize:24,color:props.titlecolor?props.titlecolor:"#515151",fontFamily: "Montserrat-Bold",marginTop:Platform.OS=="android"?0:0}}>{props.title}</Text>
            </View>
            {
                props.icon?
                    null
                :
                <View style={{alignItems: "flex-end",marginLeft:10}}>
                    {
                        props.iconleft?
                        props.iconleft
                        :
                        <Icon name="plus-circle" size={25} color={"#515151"} />
                    }                    
                </View> 
            }
        </View>
        </View>
    )
}

export default headers
