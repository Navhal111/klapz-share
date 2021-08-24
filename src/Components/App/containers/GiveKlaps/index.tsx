import React,{useState,useEffect, useRef} from 'react'
import { View, Platform,Text, Image, TouchableOpacity , Linking ,Modal, Alert ,ScrollView, TextInput,Switch,Dimensions,CheckBox} from 'react-native';
import klapzconfig from '../../components/services/config';
import {Colors,Fonts,Metrics} from '../../Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageLoad from 'react-native-image-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "../../components/Toast";
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const GiveKlaps = (props) => {
  
  let [count, setCount] = useState(1);
  let [preferredCount, setPreferredCount] = useState(0);
  const [actionTitle, setActionTitle] = useState("You are Klapping")
  let [sharedSuccess, setSuccess] = useState(false);
  let [sharedError, setError] = useState(false);
  let [videodetail, setVideoDetail] = useState(props.tpc);
  let [publicAttr, setpublicAttr] = useState(true);
  let [activetextInput, setActiveTextInput] = useState(true);
  const [totalclaps, settotalclaps] = useState(0)

  const [toast, settoast] = useState(false)
  const [toasttext, settoasttext] = useState("Somthing went wrong")
  const [loadervisible, setloadervisible] = useState(true);
  const [screenLoad, setScreenLoad] = useState(false);
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
  const [expression, setexpression] = useState("");
  const [timer, setTimer] = useState(null);
  const [text1, settext1] = useState("")
  const [totalContentsClapped, settotalContentsClapped] = useState("")
  const [firsttimemodel, setfirsttimemodel] = useState(false)
  useEffect(() => {
    getBalanceClaps();
    // getVideoDetails();
  }, []);

  // const getVideoDetails = () => {
  //   var url = klapzconfig.apiurl + 'tpc/query?apiVersion=2&withSource=true&apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
  //   console.log("new url : " + url);
  //   console.log({
  //     actualURL: props.route.params.shareData
  //   });
  //   setloadervisible(true)
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'auth-token' : global.authToken,
  //     },
  //     body: JSON.stringify({
  //       actualURL: props.route.params.shareData
  //     })
  //   })
  //   .then((response) => {
  //     const statusCode = response.status;
  //     setloadervisible(false)
  //     console.log("statusCode: " + statusCode);
  //     //If 200 then sucess
  //     if(statusCode !== 200) {
  //        //Error
  //       return response.json();
  //     } else {
  //         console.log(response);
  //         return response.json();
  //     }})
  //   .then((balResponse) => {
  //       console.log("Video details",JSON.stringify(balResponse));
  //       if(balResponse.errors){
  //         if(balResponse.errors.code === "ERR_INVALID_URL"){
  //           setloadervisible(false)
  //           settoast(true)
  //           settoasttext("ERR_INVALID_URL: please select valid url your input is "+balResponse.errors.input);
  //           // setTimeout(() => {
  //           //   props.navigation.goBack()
  //           // }, 1000);
  //         }else if(balResponse.errors.errorCode === "z7009"){
  //           setloadervisible(false)
  //           settoast(true)
  //           settoasttext(balResponse.errors.errorMessage);
  //           // setTimeout(() => {
  //           //   props.navigation.goBack()
  //           // }, 1000);
  //         }else{
  //           settoast(true)
  //           settoasttext("We not found any source of sharing.");
  //           // setTimeout(() => {
  //           //   props.navigation.goBack()
  //           // }, 1000);
  //         }
  //       }else{
  //         setScreenLoad(false)
  //         setloadervisible(false)
  //         setVideoDetail(balResponse);
  //         setCount(balResponse.tpc.customKlaps ? balResponse.tpc.customKlaps : 2);
  //         let showTags = false;
  //         for (const key in balResponse.tpc.tags) {
  //           if(key != "" && balResponse.tpc.tags[key].show){
  //             showTags = true;
  //           }
  //         }
  //         setShowTagsBtn(showTags)
  //       }
  //     })
  //   .catch(error => {
  //     setloadervisible(false)
  //     console.log("Error: " + error);
  //   });
  // }

  const getBalanceClaps = () => {
    var url = klapzconfig.apiurl +
    'user/profile?props=balanceClaps,totalContentsClapped,numCreatorsSupported,purchasedClaps,globalCreators';
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
          settotalContentsClapped(userDetails.totalContentsClapped)
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

  const checkgetBalanceClaps = () => {
    let mycount = activetextInput ? count : preferredCount;
    if(mycount == 0){
      settoast(true)
      settoasttext("You have no Klapz for share")
      return
    }
    var url = klapzconfig.apiurl +
    'user/profile?props=setpreferredTags,totalContentsClapped,balanceClaps,numCreatorsSupported,purchasedClaps,globalCreators&apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
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
      console.log("statusCode: " + statusCode);

      if(statusCode !== 200) {
        setloadervisible(false)
        return response.json();
      } else {
          console.log(response);
          return response.json();
      }})
    .then((balResponse) => {
      console.log("======================");
      
        console.log(balResponse);

        const userDetails = balResponse.user;
        if(balResponse.code == "z000"){
          Alert.alert(
            'Alert',
            balResponse.message,
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
        if(userDetails) {
            settotalclaps(userDetails.balanceClaps)
            setpreferredTags(userDetails.setpreferredTags)


            if( mycount <= userDetails.balanceClaps){
                shareData({
                    claps: {
                      count : mycount,
                      contentURL: props.route.params.shareData,
                      public: publicAttr,
                      fromWhere: props.route.params.from
                    }
                })
            }else{
                setloadervisible(false)
                settoast(true)
                settoasttext("Klapz Limit exceeded!")
                setCount(userDetails.balanceClaps)
            }
         }
      })
    .catch(error => {
      setloadervisible(false)
      console.log("Error: " + error);
    });
  }
  const filterVideos = async () => {
    let feeds = await AsyncStorage.getItem('@klapzFeeds');
    feeds = JSON.parse(feeds)
    var tag  =  preferredTags.toString().split(",")
    var feeds_focus = []
    try{
      tag.map((item)=>{
        console.log(item);
        feeds.map((feeditem)=>{
          console.log(feeditem.object.tags);
          if(feeditem.object.tags.includes(item)){
            feeds_focus.push(feeditem)
          }
        })
      })
    }catch(e){
      console.log(e);
    }
    AsyncStorage.setItem('@klapzFeedsFocus',JSON.stringify(feeds_focus))
    props.navigation.goBack()
  }
  const shareData = (dataToBeShared) => {

      var url = klapzconfig.apiurl + 'claps/expend?apiVersion=2&apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
      console.log("Token: " + global.authToken);
      console.log("url : " + url);
      console.log(dataToBeShared);

      // dataToBeShared["expression"] = expression
      dataToBeShared["claps"]["expression"] = expression
      if(global.authToken === null) {
        return;
      }
      setloadervisible(true);
      console.log(dataToBeShared);
      fetch(url, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token' : global.authToken,
        },
        body: JSON.stringify(dataToBeShared),
      })
      .then((response) => {
        const statusCode = response.status;
        setloadervisible(false)
        if(statusCode != 200){
          setError(true);
        }
        return response.json();
      })
      .then((shareResponse) => {
          console.log(shareResponse);
          setloadervisible(false);
          if(shareResponse.errors){
            settoast(true)
            settoasttext(shareResponse.errors.errorMessage);
            setTimeout(() => {
              props.navigation.goBack()
            }, 1200);
          }else{
            if(shareResponse.code == "z000"){
              Alert.alert(
                'Alert',
                shareResponse.message,
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
            setloadervisible(false);
            setSuccess(true);
            settype("sucess");
            settoasttext(shareResponse.message);
            settoast(true);
            // setActionTitle("You have Klapped")
            if(totalContentsClapped==0){
              setfirsttimemodel(true)
            }
            setFacebookMessage(shareResponse.social.facebook);
            setTwitterMessage(shareResponse.social.twitter);
            setWhatsappMessage(shareResponse.social.whatsapp);
          }
        //   if(shareResponse.errorCode!=200){
        //     console.log("asdsad");
        //     setloadervisible(false)
        //     setTimeout(()=>{
        //         settoasttext(shareResponse.errorMessage)
        //         settoast(true)
        //     },900)

        //     return
        // }
        // setTimeout(() => {
        //       settype("sucess");
        //       settoast(true)
        //       settoasttext("klapped successfully")
        // }, 900);
      })
      .catch(error => {
        setError(true);
        setloadervisible(false)
        setTimeout(() => {
          props.navigation.goBack()
        }, 1000);
        console.log("Error: " + error);
      });
  }

  const incrimentClaaps = () => {
      if(count ==0){
        settoast(true)
        settoasttext("You have no Klapz for share")
        return
      }
      if((count+1)<=totalclaps){
          setCount(count+1);
      } else{
        settoast(true)
        settoasttext("Klapz Limit exceeded!")
      }
  }

  const updateTopics = () => {
    let preferredTags = [];
    for (const key in videodetail.tpc[0].content.tags) {
      if(videodetail.tpc[0].content.tags[key].selected){
        preferredTags.push(key);
      }
    }
    console.log(preferredTags);
    var url = klapzconfig.apiurl +
    'user/profile?apiFrom='+klapzconfig.apiFrom+'&buildNumber='+klapzconfig.buildNumber;
    console.log("new url : " + url);
    setloadervisible(true)
    fetch(url, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'auth-token' : global.authToken,
      },
      body: JSON.stringify({
        "user" : {
          "preferredTags": preferredTags
        }
      })
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
      setloadervisible(false);
      console.log("update user topics," ,balResponse);
      if(balResponse.code == "z000"){
        Alert.alert(
          'Alert',
          balResponse.message,
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
      // filterVideos()
      setSuccess(true);
      settype("sucess");
      settoasttext(balResponse.user.message);
      settoast(true);
      setTimeout(() => {
        props.navigation.goBack();
      }, 2000);
    })
    .catch(error => {
      setloadervisible(false)
      console.log("Error: " + error);
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: "#fff",paddingVertical: 0,paddingTop:Platform.OS =="ios"?30:0}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {
          screenLoad === false ? <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                {
                  (sharedError === true || sharedSuccess === true) ? <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                      <View>
                        {
                          videodetail && sharedSuccess && showTags === false ? <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{textAlign: "center",fontSize: 18,paddingVertical: 0,paddingHorizontal: 40,marginBottom:50,fontFamily: "Montserrat-Regular"}}>{ videodetail.tpc[0].content.thankNote ? videodetail.tpc[0].content.thankNote : "Thanks for Klapping."}</Text>
                            <Text style={{textAlign: "center",fontSize: 18,paddingVertical: 10,paddingHorizontal: 40,fontFamily: "Montserrat-Regular",marginBottom:20}}>{totalContentsClapped==0?"Let the world know you started a new culture":"Tell the world that you have rewarded the creator"}</Text>
                            <View style={{justifyContent: 'space-between',flexDirection: "row",marginTop: 20,}}>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  // const shareOptions = {
                                  //   title: 'Share via Whatsapp',
                                  //   message: whatsappMessage,
                                  //   social: Share.Social.WHATSAPP,
                                  //   url: klapzconfig.apiurl
                                  // };
                                  // Share.shareSingle(shareOptions)
                                  // .then((res) => {
                                  //   console.log(res)
                                  // })
                                  // .catch((err) => {
                                  //   console.log(err);
                                  //   // alert("Can't found source to open!")
                                  // });
                                  Linking.openURL('whatsapp://send?text='+whatsappMessage);

                                }} style={{flexDirection: "row",backgroundColor: "#25D366",padding: 15,height: 50,width: 50,borderRadius: 50,marginHorizontal: 10,justifyContent: 'center',alignItems: "center"}}>
                                  <FontAwesome size={20} color={Colors.lessWhite} name="whatsapp" />
                                </TouchableOpacity>
                              </View>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  const shareOptions = {      
                                    title: 'Share via Facebook',
                                    message: facebookMessage,
                                    social: Share.Social.FACEBOOK,
                                    url: facebookMessage,
                                    type: "quote",
                                    quote: facebookMessage,
                                  };
                                  Share.shareSingle(shareOptions)
                                  .then((res) => {
                                    console.log(res)
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    // alert("Can't found source to open!")
                                  });
                                }} style={{flexDirection: "row",backgroundColor: "#4267B2",padding: 15,borderRadius: 50,height: 50,width: 50,marginHorizontal: 10,justifyContent: 'center',alignItems: "center"}}>
                                  <FontAwesome size={20} color={Colors.lessWhite} name="facebook-square" />
                                </TouchableOpacity>
                              </View>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  const shareOptions = {
                                    title: 'Share via Twitter',
                                    message: twitterMessage,
                                    social: Share.Social.TWITTER,
                                    url: klapzconfig.apiurl
                                  };
                                  Share.shareSingle(shareOptions)
                                  .then((res) => {
                                    console.log(res)
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    // alert("Can't found source to open!")
                                  });

                                }} style={{flexDirection: "row",backgroundColor: "#1DA1F2",padding: 15,height: 50,width: 50,borderRadius: 50,marginHorizontal: 10,justifyContent: 'center',alignItems: "center"}}>
                                  <FontAwesome size={20} color={Colors.lessWhite} name="twitter-square" />
                                </TouchableOpacity>
                              </View>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  const shareOptions = {
                                    title: 'Share via',
                                    message: twitterMessage,
                                    url: klapzconfig.apiurl
                                  };
                                  Share.open(shareOptions)
                                  .then((res) => {
                                    console.log(res)
                                  })
                                  .catch((err) => {
                                    alert("Can't found source to open!")
                                  });

                                }} style={{flexDirection: "row",backgroundColor: "#000",padding: 15,height: 50,width: 50,borderRadius: 50,marginHorizontal: 10,justifyContent: 'center',alignItems: "center"}}>
                                  <FontAwesome size={20} color={Colors.lessWhite} name="share-alt" />
                                </TouchableOpacity>
                              </View>                              
                            </View>
                            {/* {
                              showTagsBtn ? <TouchableOpacity onPress={() => {
                                let showTags = false;
                                for (const key in videodetail.tpc[0].content.tags) {
                                  if(key != "" && videodetail.tpc[0].content.tags[key].show){
                                    showTags = true;
                                  }
                                }
                                if(showTags){
                                  setShowTags(true);
                                  setActionTitle("Update interests")
                                }else{
                                  setTimeout(() => {
                                    props.navigation.goBack()
                                  }, 1000);
                                }
                              }} style={{backgroundColor: Colors.background,justifyContent: "center",flexDirection: "row",alignItems: "center",padding: 12,borderRadius: 7,marginTop: 20,}}>
                                <AntDesign name="filter" size={20} color={Colors.lessWhite} /> 
                                <Text style={{fontSize: 16,fontFamily: "Montserrat-Regular",color: Colors.lessWhite,marginLeft: 8}}>Add to your interests</Text>
                              </TouchableOpacity> : null
                            } */}
                          </View> : null
                        }
                        {
                          showTags && videodetail ? <View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: "center",alignItems: "center",paddingHorizontal: 10,marginTop: 20}}>
                              {
                                Object.keys(videodetail.tpc[0].content.tags).map((key, index) => {
                                  if(videodetail.tpc[0].content.tags[key].show){
                                    return (
                                      <TouchableOpacity onPress={() => {
                                        let copyVideodetails = { ...videodetail };
                                        copyVideodetails.tpc.tags[key].selected = !copyVideodetails.tpc.tags[key].selected;
                                        setVideoDetail(copyVideodetails);
                                        console.log(JSON.stringify(copyVideodetails));
                                      }} style={{marginHorizontal: 2,backgroundColor: videodetail.tpc[0].content.tags[key].selected ? Colors.background : Colors.lessWhite,borderWidth: 1, borderColor: Colors.background,borderRadius: 20,marginVertical: 5,paddingHorizontal: 10,paddingVertical: 5}}>
                                        <Text style={{fontSize: 12,color: videodetail.tpc[0].content.tags[key].selected ? Colors.lessWhite : "#000000",fontFamily: "Montserrat-Regular" }}>{key}</Text>
                                      </TouchableOpacity>
                                    )
                                  }else{
                                    return(null)
                                  }

                                })
                              }
                            </View>
                            <View style={{justifyContent: "space-between",paddingHorizontal: 50,paddingTop: 20}}>
                              <TouchableOpacity onPress={updateTopics} style={{backgroundColor: Colors.background,justifyContent: "center",alignItems: "center",padding: 12,borderRadius: 7}}>
                                <Text style={{fontSize: 16,fontFamily: "Montserrat-Regular",color: Colors.lessWhite}}>Save</Text>
                              </TouchableOpacity>
                            </View>
                          </View> : null
                        }
                      </View>
                  </View>
                  : <View>
                    <Text numberOfLines={2} style={{textAlign: "center",fontSize: 16,paddingVertical: 10,paddingHorizontal: 40,color:Colors.background,fontFamily: "Montserrat-Regular"}}>{ videodetail ? videodetail.tpc[0].content.requestNote: ""}</Text>
                    <View style={{justifyContent: "center",alignItems: "center",paddingVertical: 10}}>
                        {/* {
                          videodetail ? 
                          <ImageLoad
                            style={{
                              width: 150,
                              height: 120,
                            }}
                            loadingStyle={{ size: 'large', color: Colors.background }}
                            source={{ uri: videodetail.tpc[0].content.thumbnail }}
                            resizeMode={`cover`}
                          /> : null
                        } */}
                        {
                           videodetail ?
                           <View style={{
                            borderWidth:1,
                            paddingHorizontal:5,
                            borderColor:Colors.background,
                            borderRadius:8,
                            marginVertical:10,
                            width:windowWidth-70,
                            height:100,
                           }}>
                           <TextInput 
                            placeholder={videodetail?videodetail.tpc[0].content.expressionDefault:""}
                            placeholderTextColor="gray"
                            onChangeText={(text)=>{
                              setexpression(text)
                            }}
                            multiline
                            style={{
                              fontFamily: "Montserrat-Regular"
                            }}
                           /> 
                           </View>
                           :
                           null
                        }
                    </View>
                    <View>
                      
                      {
                        videodetail ? <View>                              
                            {
                              videodetail.tpc[0].content.preferredKlaps.length > 0 ? <View>                                
                                {
                                  count > totalclaps ? <Text style={{textAlign: "center",color: Colors.error,marginTop: 15,fontFamily: "Montserrat-Regular"}}>You have only {totalclaps} klapz in your wallet.</Text> : null
                                }
                                {
                                  count === "" ? <Text style={{textAlign: "center",color: Colors.error,marginTop: 15,fontFamily: "Montserrat-Regular"}}>You should give atleast one Klap.</Text> : null
                                }
                                {
                                  count === 0 ? <Text style={{textAlign: "center",color: Colors.error,marginTop: 15,fontFamily: "Montserrat-Regular"}}>Thats funny. Be generous.</Text> : null
                                }


                                <View style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                  justifyContent: 'space-around',
                                  marginTop: 15
                                }}>
                                  <Image source={require("./../../Images/logom.png")} style={{height: 50,width: 50,marginHorizontal: 5}} />
                                  <View style={{justifyContent: 'center',alignItems: 'center',marginHorizontal: 5}}>
                                    <Text style={{
                                      color: Colors.background,
                                      fontSize: Fonts.moderateScale(22),fontFamily: "Montserrat-Bold",
                                      fontFamily: Fonts.type.RubikLight,
                                      marginBottom: 10
                                    }}>X</Text>
                                  </View>
                                  {
                                      videodetail.tpc[0].content.preferredKlaps.split(",").map((item,index) => {
                                          return (
                                              <View style={{borderBottomWidth: preferredCount === parseInt(item) ? 3 : 0,borderBottomColor: Colors.background}}>
                                                <TouchableOpacity
                                                  onPress={() => {setPreferredCount(parseInt(item)); setActiveTextInput(false);} } style={{
                                                    backgroundColor: Colors.background,
                                                    height: 50,width: 50,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 40,
                                                    marginHorizontal: 5,
                                                    marginBottom: 10
                                                  }}
                                                  onLongPress={() => {
                                                    console.log("Long Press");
                                                    count = 0;
                                                    setActiveTextInput(true);
                                                    setPreferredCount(0);
                                                    let timer1 = setInterval(() => {
                                                      count = count + parseInt(item);
                                                      setCount(count);
                                                    }, 1000);
                                                    setTimer(timer1);
                                                  }}
                                                  onPressOut={() => {
                                                    console.log("Press out");
                                                    clearInterval(timer);
                                                  }}
                                                >
                                                    <Text style={{
                                                      color: "#fff",
                                                      fontSize: Fonts.moderateScale(18),fontFamily: "Montserrat-Bold",fontWeight:"bold"
                                                    }}>{item}</Text>
                                                </TouchableOpacity>
                                              </View>
                                          )
                                      })
                                  }
                                  <View style={{marginHorizontal: 5,borderBottomWidth: activetextInput ? 3 : 0,borderBottomColor: Colors.background}}>
                                      <TextInput
                                        style={{borderColor: Colors.black+50,borderWidth: 1,borderRadius: 11,textAlign: "center",fontSize: 22,marginBottom: 10,height: 50,width: 50,fontFamily: "Montserrat-Regular"}}
                                        placeholder="        "
                                        keyboardType="numeric"
                                        onFocus={() => {
                                          setPreferredCount(0);
                                          setActiveTextInput(true);
                                        }}
                                        value={count.toString()}
                                        onChangeText={(text) => {
                                          console.log("Balance",totalclaps);
                                          if(isNaN(parseInt(text)) && text!= ""){
                                            return
                                          }
                                          if(text){
                                            setCount(parseInt(text))
                                          }else{
                                            setCount("")
                                          }
                                        }}
                                      />
                                  </View>
                                </View>
                                <Text numberOfLines={3} style={{textAlign: "center",fontSize: 16,paddingHorizontal: 40,marginTop: 20}}>{ totalclaps === 0 ? "Your wallet has no Klapz left." : null }</Text>
                              </View> : <View>
                                <Text numberOfLines={3} style={{textAlign: "center",fontSize: 16,paddingHorizontal: 40,marginTop: 20,fontFamily: "Montserrat-Regular"}}>{ totalclaps === 0 ? "Your wallet has no Klapz left." : null }</Text>
                              </View>
                            }
                          </View> : null
                        }
                        {
                          totalclaps === 0 ? <View>
                              <TouchableOpacity style={{
                                  flexDirection:"row",
                                  backgroundColor: Colors.background,
                                  borderRadius: 15,
                                  alignItems: "center",
                                  alignSelf: "center",
                                  paddingHorizontal:20,
                                  shadowOffset: { width: 2, height: 3 },
                                  shadowColor: "#116384",
                                  shadowOpacity: 0.7,
                                  shadowRadius: 5,
                                  elevation: 10,
                                  justifyContent: "center",
                                  marginTop: Metrics.HEIGHT * 0.015,
                                  height:40,
                                  marginBottom:10
                                }} onPress={() => {

                                    props.navigation.navigate("BuyKlapz");

                                }}>
                                  <Text style={{
                                    color: Colors.lessWhite,fontFamily: "Montserrat-Regular"
                                  }}>Add Klapz to your wallet</Text>
                                  <Image source={require("./../../Images/logom.png")} style={{height: 30,width: 30,marginLeft:10,marginRight:10}} />
                              </TouchableOpacity>
                            </View> : <View>
                            {
                              videodetail ? <View>
                                  {
                                    count > totalclaps && videodetail.tpc[0].content.preferredKlaps.length === 0 ? <Text style={{textAlign: "center",color: Colors.error,marginBottom: 15,fontFamily: "Montserrat-Regular"}}>You have only {totalclaps} klapz in your wallet.</Text> : null
                                  }
                                  {
                                    count === "" && videodetail.tpc[0].content.preferredKlaps.length === 0 ? <Text style={{textAlign: "center",color: Colors.error,marginBottom: 15,fontFamily: "Montserrat-Regular"}}>Klapz has to be a number.</Text> : null
                                  }
                                  {
                                    count === 0 && videodetail.tpc[0].content.preferredKlaps.length === 0 ? <Text style={{textAlign: "center",color: Colors.error,marginBottom: 15,fontFamily: "Montserrat-Regular"}}>Thats funny. Be generous.</Text> : null
                                  }
                                   
                                  {
                                  videodetail.tpc[0].content.preferredKlaps.length > 0 ? null : <View style={{
                                      width: Metrics.WIDTH * 0.5,
                                      flexDirection: 'row',
                                      alignSelf: 'center',
                                      justifyContent: 'space-around',
                                      marginTop: 0,
                                      marginBottom: 20
                                    }}>
                                      <Image source={require("./../../Images/logom.png")} style={{height: 50,width: 50,marginLeft:5}} />
                                      <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                        <Text style={{
                                          color: Colors.background,
                                          fontSize: Fonts.moderateScale(18),fontFamily: "Montserrat-Bold",
                                          fontFamily: Fonts.type.RubikLight
                                        }}>X</Text>
                                      </View>
                                      <View>
                                          <TextInput
                                            style={{height:50,width: 50,fontFamily: "Montserrat-Regular",borderColor: Colors.black+50,borderWidth: 1,borderRadius: 11,textAlign: "center",fontSize: 22}}
                                            keyboardType="numeric"
                                            value={count.toString()}
                                            placeholder="        "
                                            onChangeText={(text) => {
                                              if(isNaN(parseInt(text)) && text!= ""){
                                                return
                                              }
                                              console.log("Balance",totalclaps);
                                              if(text){
                                                setCount(parseInt(text))
                                              }else{
                                                setCount("")
                                              }
                                            }}
                                          />
                                      </View>
                                    </View>
                                  }
                                </View>  : null
                              }
                            </View>
                        }
                      {
                        count != 0 ? <View style={{justifyContent: "space-between",paddingHorizontal: 30}}>
                            <View style={{justifyContent: "center",alignItems: "center",flexDirection: "row",padding: 10}}>
                            {/* <Switch
                                trackColor={{ false: "gray", true: Colors.background }}
                                thumbColor={publicAttr ? Colors.background : Colors.background}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>{ setpublicAttr(!publicAttr) }}
                                value={publicAttr}
                              /> */}
                            {/* <CheckBox
                              value={publicAttr}
                              onValueChange={()=>{ setpublicAttr(!publicAttr) }}
                              style={{}}
                              tintColors={{ true: Colors.background, false: 'black' }}
                            /> */}
                            <TouchableOpacity style={{
                                    backgroundColor: publicAttr ? Colors.background : "#fff",
                                    height: 25,
                                    width: 25,
                                    borderRadius: 5,
                                    borderWidth: publicAttr ? 5 : 1,
                                    borderColor: Colors.background
                                }}
                                onPress={()=>{
                                  setpublicAttr(!publicAttr)
                                }}
                                >
                                   <Icon name="check-bold" size={14} color={"#fff"} style={{}} />
                            </TouchableOpacity>
                            <Text onPress={() => setpublicAttr(!publicAttr) } style={{marginLeft: 10,fontSize: 14,fontFamily: "Montserrat-Regular"}}>{videodetail?videodetail.text2:""}</Text>
                          </View>
                          <TouchableOpacity onPress={() => {
                            checkgetBalanceClaps()
                          }} style={{backgroundColor: Colors.background,justifyContent: "center",alignItems: "center",padding: 12,borderRadius: 7}}>
                            <Text style={{fontSize: 18,fontFamily: "Montserrat-Regular",fontWeight:"bold",color: "#fff"}}>{videodetail?videodetail.tpc[0].content.giveDefault:""} {activetextInput ? count : preferredCount} Klapz </Text>
                          </TouchableOpacity>
                        </View> : null
                      }
                  </View>
                  </View>
                }
            </View>
          </View> : <View>
            {
              global.authToken != null ? null : <View style={{justifyContent: 'center',alignItems: "center",flex: 1}}>
                <Image source={require("./../../Images/logom.png")} style={{height: 80,width: 80}} />
                <Text style={{fontSize: 18,marginVertical: 20,paddingHorizontal: 30,textAlign: "center",fontFamily: "Montserrat-Regular"}}>You need to login to Klap the YouTube Video</Text>
                <TouchableOpacity onPress={() => {
                    props.setAppLogin();
                  }} style={{backgroundColor: Colors.background,justifyContent: "center",alignItems: "center",padding: 12,borderRadius: 7,marginTop: 20,paddingHorizontal: 50}}>
                  <Text style={{fontSize: 16,fontFamily: "Montserrat-Regular",color: Colors.lessWhite}}>Login</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        }
      </ScrollView>


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

export default GiveKlaps
