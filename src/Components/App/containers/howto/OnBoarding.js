import * as React from 'react';
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Alert
} from 'react-native';
import klapzconfig from '../../components/services/config';
// constants
import {Colors,Fonts,Metrics} from '../../Themes';
import { images, theme } from "./Constance";
const { onboarding1, onboarding2, onboarding3 } = images;
// theme
const { COLORS, FONTS, SIZES } = theme;
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Headr from "../../components/headers"

const onBoardings = [
    {
        title: "",
        title2: "Didn't we tell you? It's everything",
        title3:"you already know on your phone.",
        img: onboarding1,
        top:"80%",
        width:227,
    }
];

const OnBoarding = (props) => {
    const [completed, setCompleted] = React.useState(false);
    const [total, setTotal] = React.useState(2);
    const [index, setIndex] = React.useState(0);
    const [offset, setOffset] = React.useState(windowWidth * index);
    const [width, setWidth] = React.useState(windowWidth);
    const [height, setHeight] = React.useState(windowHeight);
    const [indexmain, setindexmain] = React.useState(0)
    const [shareData, setshareData] = React.useState(props.route.params?props.route.params.shareData:null)
    const [offerdata, setofferdata] = React.useState(props.route.params?props.route.params.offer:{})
    const [lastref, setlastref] = React.useState(null)
    const [selected, setselected] = React.useState(0)
    const [show, setshow] = React.useState(false)
    const [shochnageimage, setshochnageimage] = React.useState(false)
    const viewref = []
    var viewref3 = null
    var internals = {
        isScrolling: false,
        offset
    };
    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true);
            }
        });
        setTimeout(()=>{
            setshow(true)
        },12000)
        return () => scrollX.removeListener();
    }, []);

    // Render
    function nextscreen() {
        AsyncStorage.setItem(
            'First',
            "done"
        );
        swipe();
        // props.navigation.replace("LeftDrawer");
    }

    const onScrollBegin = e => {
        // Update internal isScrolling state
        internals.isScrolling = true;
    };

    /**
         * Scroll end handler
         * @param {object} e native event
         */
    const onScrollEnd = e => {
        // Update internal isScrolling state
        internals.isScrolling = false;

        // Update index
        updateIndex(
            e.nativeEvent.contentOffset
                ? e.nativeEvent.contentOffset.x
                : // When scrolled with .scrollTo() on Android there is no contentOffset
                e.nativeEvent.position * width
        );
        
    };

    /*
         * Drag end handler
         * @param {object} e native event
         */
        const onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = props,
            { offset } = internals;        
        // Update internal isScrolling state
        // if swiped right on the last slide
        // or left on the first one
        if(children){
            if (
                offset === newOffset &&
                (index === 0 || index === children.length - 1)
            ) {
                internals.isScrolling = false;
            }
        }
        
    };

    /**
         * Update index after scroll
         * @param {object} offset content offset
         */
        const updateIndex = offset => {
        const diff = offset - internals.offset,
            step = width;
        let indexU = index;
        // Do nothing if offset didn't change
        if (!diff) {
            return;
        }
        // Make sure index is always an integer
        // indexU = parseInt(index + Math.round(diff / step), 10);
        if (index === total - 1) {
            indexU = index - 1;
        }
        else {
            indexU = index + 1;                       
        }       
        // Update internal offset
        internals.offset = offset;
        console.log( parseInt(width*2) == parseInt(offset));
        if(parseInt(width*2) == parseInt(offset)){
            setindexmain(2)
        }else{
            setindexmain(0)
        }
        // alert(indexU)
        // alert(viewref.length)

        if(viewref.length==2 ){
            
            if(lastref){

            }else{
                viewref3 =  viewref[2]
                setlastref(viewref3)
                console.log('====entry======');
                console.log(viewref3);     
            }
           
        }
        console.log('=== open ======');
        console.log(indexU);
        console.log(viewref3);
        if(viewref[indexU] && setselected<2){
            setTimeout(() => {                
                setselected(selected+1)
            }, 500);
        }
        console.log(offset);
        // Update index in the state
        setIndex(indexU);        
    };


    const  swipe = () => {
        if (index == total - 1) {
            // props.navigation.replace("Welcome");
            props.navigation.replace('Home', {balanceClaps:props.balanceClaps,shareData:shareData});
        }
        else {
            // Ignore if already scrolling or if there is less than 2 slides
            if (internals.isScrolling || total < 2) {
                return;
            }

            const diff = index + 1,
                x = diff * width,
                y = 0;

            // Call scrollTo on scrollView component to perform the swipe
            // alert(index+1)
            let propsmain = {
                order: 12,
                title: onBoardings[0].title,
                description: '',
                outerCircleColor: Colors.background,
                cancelable: false
              }           
             var main  = 0
            if (index === total - 1) {
                main = index - 1;
            }
            else {
                main = index + 1;                       
            }  
            // alert(viewref.length)
            if(viewref.length==2){                
                viewref3 =  viewref[1]
                console.log('====entry======');
                console.log(viewref3);                
            }
            console.log('=== open ======');
            console.log(main);
            console.log(viewref3);
            console.log(viewref[main]);            

            scrollView && scrollView.scrollTo({ x, y, animated: true });
            // Update internal scroll state
            internals.isScrolling = true;

            // Trigger onScrollEnd manually on android
            if (Platform.OS === "android") {
                setImmediate(() => {
                    onScrollEnd({
                        nativeEvent: {
                            position: diff
                        }
                    });
                });
            }
        }
    };


    // function renderContent() {


    //     return (

    //     );
    // }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    });

                    
                    const dotSizeh = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [5, 15, 5],
                        extrapolate: "clamp"
                    });
                    const bgcolor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: ["gray",Colors.background, "gray"],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSizeh, height: 5,  backgroundColor: bgcolor,}]}
                        />
                    );
                })}
            </View>
        );
    }
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    return (
        <View style={styles.container}>    
        <Headr icon={true} title={"How do you Klap?"} backbutton={props.route.params?false:true} navigation={props.navigation} />     
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    // decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    // ref={component => {
                    //     scrollView = component;
                    // }}
    
                    style={{ backgroundColor:"white" }}
                >

                    {onBoardings.map((item, index) => (
                        <View
                            //center
                            //bottom
                            key={`img-${index}`}
                            style={styles.imageAndTextContainer}
                        >

                            
                            <View style={{
                                flex: 1, 
                                alignItems: 'center',
                                marginTop:20
                            }}>

                            {/* <Text style={{fontSize:14,textAlign:"center",fontFamily: "Montserrat-Bold",color:"#000",marginLeft:5}}>How do you Klap?</Text> */}
                                <Image
                                    source={shochnageimage?item.img:require("../../../assets/share1.gif")}
                                    resizeMode="contain"
                                    style={{
                                        marginTop:0,
                                        width: "70%",
                                        height:"60%",
                                    }}
                                />    
                                {
                                        show?
                                        <TouchableOpacity style={{justifyContent:"center",lexDirection:"row",width:200,marginTop:10,alignSelf:"center",borderRadius:8,alignSelf:"center",overflow:"hidden"}}
                                            onPress={()=>{

                                                setshochnageimage(!shochnageimage)
                                               
                                            }}
                                        >                                               
                                            <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:5,width:"100%",}}>
                                                <FontAwesome size={15} color={"#000"} name="repeat" />
                                                <Text style={{fontSize:14,textAlign:"center",fontFamily: "Montserrat-Regular",color:"#000",marginLeft:5}}>Play Again</Text>
                                            </View>
                                        </TouchableOpacity>                                        
                                        :
                                        null
                                } 
                            </View>

                            <TouchableOpacity style={{flexDirection:"row",width:225,alignSelf:"center",borderRadius:8,bottom:180,alignSelf:"center",overflow:"hidden",position:"absolute"}}
                                onPress={()=>{                                                
                                    if(props.route.params){                                                    
                                        props.navigation.replace('Home', {balanceClaps:props.balanceClaps,shareData:shareData});
                                    }else{                 
                                        props.navigation.goBack()                                   
                                    }                                               
                                }}
                            >                                               
                                <View style={{alignItems:"center",backgroundColor:Colors.background,paddingHorizontal:10,paddingVertical:10,width:"100%",}}>
                                    <Text style={{fontSize:14,textAlign:"center",fontFamily: "Montserrat-Bold",color:"#fff"}}>Got it</Text>
                                </View>
                            </TouchableOpacity>                                        

                            <View
                                style={{
                                    top: index==2?-70:-200
                                }}
                            >

                                <Text style={{
                                    fontSize: 16,
                                    alignSelf: "center",                                    
                                    marginTop: 30,
                                    width: width - 40,
                                    color: "#000",fontFamily: "Montserrat-Bold",
                                    textAlign: 'center'
                                }}
                                >
                                    {item.title}
                                </Text>

                                <Text style={{
                                    fontSize: 15,
                                    alignSelf: "center",                                
                                    marginTop:20,
                                    width: width - 40,
                                    color: "#868686",
                                    textAlign: 'center',fontFamily: "Montserrat-Regular"
                                }}
                                >
                                    {item.title2}
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    alignSelf: "center",
                                    width: width - 40,
                                    color: "#868686",
                                    textAlign: 'center',fontFamily: "Montserrat-Regular"
                                }}
                                >
                                    {item.title3}
                                </Text>

                                <Text style={{
                                    fontSize: 25,
                                    alignSelf: "center",
                                    
                                    marginTop: SIZES.base,
                                    width: width - 40,
                                    color: "#000",
                                    textAlign: 'center',fontFamily: "Montserrat-Regular"
                                    
                                }}
                                >
                                    {item.title4}
                                </Text>

                                <Text style={{
                                    fontSize:15,
                                    alignSelf: "center",
                                    marginTop: SIZES.base,
                                    width: width - 40,
                                    color: "#000",fontFamily: "Montserrat-Regular"
                                }}
                                >
                                    {item.description}
                                </Text>

                            </View>

                            {/* Button */}
                        </View>
                    ))}
                </Animated.ScrollView>    
                {/* <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                width: windowWidth / 3,
                                height: 40,
                                justifyContent: 'center',
                                alignSelf: "center",
                                borderRadius: 10,
                                bottom:50,
                                backgroundColor: Colors.background
                            }}
                            onPress={() => { 
                                // alert(indexmain)
                                nextscreen() 
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "#fff" }}>Next</Text>
                </TouchableOpacity>             */}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"white"
    },
    imageAndTextContainer: {
        width: SIZES.width,     
        flex:1   
        // marginVertical: 50
    },
    dotsRootContainer: {        
        width: '100%',
        // flex:1,
        // position: 'absolute',
        // bottom: SIZES.height > 700 ? '20%' : '16%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding / 2,
        marginBottom: SIZES.padding * 3,
        height: SIZES.padding,
        bottom:20,
        // right:windowWidth/2.9,
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: Colors.background,
        marginHorizontal: SIZES.radius / 2
    }
});

export default OnBoarding;