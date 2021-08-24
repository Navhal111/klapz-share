import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar, Image,
  RefreshControl,
  Linking,
  Alert,
  Dimensions,
  FlatList,
  TextInput,
  Modal,
  Switch
} from "react-native";
import {requestMultiple, PERMISSIONS, checkMultiple} from 'react-native-permissions';
import { Colors, Metrics, Fonts } from "../Themes";
import deviceStorage from "../components/services/deviceStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageLoad from 'react-native-image-placeholder';
import { navigate } from "../components/services/RootNavigation";

const Feed = (props) => {
    const item = props.item
    return (
        <View style={[{backgroundColor:"white"}]}> 
                          
                        {
                          false?
                            <View style={{backgroundColor:"#f5faf6",padding:10,marginBottom:15,borderRadius:5}}>
                                  <TouchableOpacity onPress={()=> { }} style={{justifyContent:"space-between",marginVertical: 5,padding: 10,borderColor: "lightgrey",borderRadius: 7,alignItems: "center",flexDirection: "row"}}>
                                      <View style={{flexDirection:"row",justifyContent: "center",alignItems: "center"}}>
                                        <Image style={{width:27,height:32,resizeMode:"contain"}} source={require("../../Images/twitter.png")} />
                                        <Text style={{fontSize: 16,marginLeft:10,fontFamily: "Montserrat-Bold"}}>Twitter</Text>
                                      </View>
                                      <Switch
                                          trackColor={{ false: "#767577", true: "#fabca6" }}
                                          thumbColor={this.state.Twitter?Colors.background: "#f4f3f4"}
                                          ios_backgroundColor="#3e3e3e"
                                          onValueChange={(value)=>{
                                            this.setState({ Twitter:!this.state.Twitter })
                                          }}
                                          value={this.state.Twitter}
                                    />
                                    </TouchableOpacity>

                                    <Text style={{alignSelf:"center",fontSize:14,color:"#2E2E2E",fontFamily: "Montserrat-Regular"}}>Certe, inquam, pertinax non quo pertin non emo aliquo, seconsequuntu. Pertinax non quo pertin seconsequuntu</Text>
                                </View>
                              :
                                null
                          }
                        {/* <Text style={[styles.feedTitle,{marginBottom:10,color:"#000",fontWeight:"bold",fontSize:14}]}>{item.from}<Text style={{color:"#8A8A8A"}}> has comment on this</Text></Text>   */}
                        <View style={[{backgroundColor:"white",marginBottom:15,flexDirection:"row",justifyContent:"space-between"}]}>                        
                          <TouchableOpacity onPress={() => {                            
                            console.log(this.state.contactsUploaded);
                            console.log(this.state.twitterConnected);
                            navigate("PlayVideo",{item:item,flagReasons:this.state.flagReasons,nocomment:true})
                          }} 
                          style={styles.feedCardBox2}>
                            <View style={styles.imageContainer}>
                              <ImageLoad
                                style={styles.feedImage}                                
                                loadingStyle={{ size: 'large', color: Colors.background }}
                                source={{ uri: `https://img.youtube.com/vi/${item.identifier}/hqdefault.jpg` }}
                                resizeMode={`cover`}
                              />
                                <View style={{padding: 10,backgroundColor: "#FFFFFF90",position: "absolute",borderRadius: 108,height: 28,width: 28,justifyContent: "center",alignItems: "center"}}>
                                  <FontAwesome color={"#FFFFFF"} size={10} name="play" style={{alignSelf:"center"}} />
                                </View>
                                <TouchableOpacity activeOpacity={item.source=="Twitter"?0.5:1} style={{position: "absolute",bottom:0,left:3,flexDirection:"row"}} 
                                  onPress={()=> {
                                    console.log(item);
                                    this.props.navigation.navigate("Profile",{registrationId:item.registrationId,title: item.from})
                                  }} >
                                  {
                                    item.source=="Twitter"?                        
                                      <FontAwesome5 color={"#1DA1F2"} name="twitter" size={18} />
                                    :
                                      null
                                  }
                                  {
                                    item.source=="email"?                        
                                      <Image style={{width:20,height:20,resizeMode:"contain"}} source={require("../../Images/gmail.png")} />
                                    :
                                      null
                                  }
                                  {
                                  item.source=="phone"?                        
                                    <Image style={{width:20,height:20,resizeMode:"contain"}} source={require("../../Images/smartphone.png")} />
                                    :
                                    null
                                  }
                                  {/* <Image
                                    style={{width:18,height:18,resizeMode:"contain",marginRight:10}}                            
                                    source={require("../../../assets/youtube.png")}
                                  /> */}
                                {/* <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,0.2)']} style={{width:162,paddingVertical:5,flexDirection:"row",alignItems:"center"}}>                                
                                  <Image
                                    style={{width:15,height:15,resizeMode:"cover",borderRadius:64}}                            
                                    source={require("../../Images/logom.png")}
                                  />
                                  <Text numberOfLines={1} style={[styles.sourceTitle,{marginLeft:3,color:"white",fontSize:10}]}> Klapped & 6 others</Text>
                                </LinearGradient> */}
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                          <View style={{flex:1}}>
                                  <TouchableOpacity onPress={() => navigate("PlayVideo",{item:item,flagReasons:this.state.flagReasons,flatTitle:this.state.flatTitle,nocomment:true}) } style={[styles.feedCardBox1,{flexDirection:"row",marginLeft:10,minHeight: 60}]}>
                                    {/* <View style={{justifyContent: "flex-end",flexDirection: "row"}}>
                                          <Image
                                            style={{width:28,height:28,resizeMode:"cover",borderRadius:64,borderWidth:0.7}}                            
                                            source={{uri:"https://cdn.dribbble.com/users/2479028/screenshots/13914601/media/5e04961d9e68a2d8dcb5710c15c1cd01.jpg?compress=1&resize=400x300"}}
                                          />
                                    </View> */}
                                    <Text numberOfLines={3} style={[styles.feedTitle,{marginLeft:5,color:"#000000",fontFamily: "Montserrat-Medium",fontSize:12}]}>{item.object.title}</Text>                                                 
                                  </TouchableOpacity>
                                  <View style={{paddingVertical:5,flexDirection:"row",justifyContent:"space-between"}}> 

                              <TouchableOpacity style={{flexDirection:"row",alignItems:"center",marginLeft:15,}}
                                  
                                  onPress={()=>{
                                    // Linking.openURL(`https://www.youtube.com/channel/${this.props.route.params.item.object.channelId}`)
                                        console.log({item:{
                                          source: "Youtube",
                                            identifier: item.object.youtubeChannelId?item.object.youtubeChannelId:item.object.channelId,
                                            title:item.object.channelName,
                                            url:`https://www.youtube.com/channel/${item.object.youtubeChannelId?item.object.youtubeChannelId:item.object.channelId}`
                                        }});
                  
                                        this.props.navigation.navigate("ProfileYoutubers",{item:{
                                          source: "Youtube",
                                            identifier: item.object.youtubeChannelId?item.object.youtubeChannelId:item.object.channelId,
                                            title:item.object.channelName,
                                            url:`https://www.youtube.com/channel/${item.object.youtubeChannelId?item.object.youtubeChannelId:item.object.channelId}`,
                                            channelImage:item.object.channelImage
                                        }})
                                      }}
                                  >            
                                    <Image
                                      style={{width:15,height:15,borderRadius:30}}                            
                                      source={{uri:item.object.channelImage}}
                                    />             
                                      <Text numberOfLines={1} style={[styles.feedTitle,{color:"#8A8A8A",fontFamily: "Montserrat-Regular",fontSize:12,width:"70%",marginLeft:5}]}>{item.object.channelName} </Text>
                                      
                                  </TouchableOpacity>
                                  {/* <Text style={[styles.feedTitle,{marginLeft:15,color:"#8A8A8A",fontWeight:"bold",fontSize:12}]}>{item.object.channelName} </Text> */}
                                  <View style={{marginLeft:15,paddingVertical:5,flexDirection:"row",justifyContent:"space-between"}}>
                                    {/* <TouchableOpacity style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}
                                      onPress={()=> {
                                        console.log(item);
                                        this.props.navigation.navigate("Profile",{registrationId:item.registrationId,title: item.from})
                                      }}
                                    >
                                        <Image
                                          style={{width:15,height:15,resizeMode:"cover",borderRadius:64}}                            
                                          source={require("../../Images/logom.png")}
                                        />  
                                      <Text style={[styles.feedTitle,{marginLeft:5,color:Colors.background,fontFamily: "Montserrat-Bold",fontSize:12}]}>{item.klapzCount}</Text>
                                    </TouchableOpacity> */}
                                    <View style={{flexDirection:"row",right:15}}>
                                        {/* <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginRight:5}}>                                
                                            <Feather color={"#8A8A8A"} name="eye" size={15} style={{}} />    
                                            <Text style={[styles.feedTitle,{marginLeft:5,color:"#8A8A8A",fontFamily: "Montserrat-Bold",fontSize:12}]}>{item.viewsCount}</Text>
                                        </View> */}
                                      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>                                
                                          <Feather color={"#8A8A8A"} name="message-square" size={15} style={{}} />
                                          <Text style={[styles.feedTitle,{marginLeft:5,color:"#8A8A8A",fontFamily: "Montserrat-Bold",fontSize:12}]}>{item.commentsCount?0:0}</Text>
                                      </View>
                                    </View>         
                                </View>

                                </View>
                          </View>           

                        </View>
                        </View>
    )
}

export default Feed
