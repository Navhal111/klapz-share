import React, { Component } from "react";
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,        
    Dimensions
} = ReactNative ;

import {PickerIOS} from '@react-native-community/picker'


var PickerItemIOS = PickerIOS.Item;

var SCREEN_WIDTH = Dimensions.get('window').width;

// var Component = React.createClass({
//     show: function(){
//         this.setState({modalVisible: true});
//     },
//     getInitialState: function(){
//         return {
//             options: this.props.options,
//             labels: this.props.labels || this.props.options,
//             color: this.props.color || '#007AFF',
//             modalVisible: false,
//             selectedOption: this.props.options[0]
//         };
//     },
//     render: function() {
//         return (
//             <Modal
//                 animationType={'slide'}
//                 transparent={true}
//                 visible={this.state.modalVisible}>
//                 <View style={styles.basicContainer}>
//                     <View style={styles.modalContainer}>
//                         <View style={styles.buttonView}>
//                             <TouchableOpacity onPress={() => {
//                                     this.setState({modalVisible: false});
//                                 }}>
//                                 <Text style={{color:this.state.color}}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => {
//                                     if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption);
//                                     this.setState({modalVisible: false});
//                                 }}>
//                                 <Text style={{color:this.state.color}}>Confirm</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={styles.mainBox}>
//                             {/*Model body*/}
//                             <PickerIOS
//                                 ref={'picker'}
//                                 style={styles.bottomPicker}
//                                 selectedValue={this.state.selectedOption}
//                                 onValueChange={(option) => this.setState({selectedOption: option})}
//                                 >
//                                 {this.props.options.map((option, i) => {
//                                     var label = this.props.labels[i] || option;
//                                     return (
//                                         <PickerItemIOS
//                                             key={option}
//                                             value={option}
//                                             label={label}
//                                             />
//                                     )
//                                 })}
//                             </PickerIOS>
//                         </View>

//                     </View>
//                 </View>
//             </Modal>
//         );
//     }
// });


export default class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false
        };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
      }
      show(){
          this.setState({
            modalVisible:true
          })
      }

      hide(){
        this.setState({
            modalVisible:false
          })
      }
  
      render() {

          return(
                     <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={styles.basicContainer}>
                            <View style={styles.modalContainer}>
                                <View style={styles.buttonView}>
                                    <TouchableOpacity onPress={() => {
                                            this.hide();
                                        }}>
                                        <Text style={{color:this.state.color,fontFamily: "Montserrat-Regular"}}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                            if(this.props.onSubmit) this.props.onSubmit(this.state.selectedOption);
                                                this.hide();
                                        }}>
                                        <Text style={{color:this.state.color,fontFamily: "Montserrat-Regular"}}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mainBox}>
                                    {/*Model body*/}
                                    <PickerIOS
                                        style={styles.bottomPicker}
                                        selectedValue={this.state.selectedOption}
                                        onValueChange={(option) => this.setState({selectedOption: option})}
                                        >
                                        {this.props.options.map((option, i) => {
                                            var label = this.props.labels[i] || option;
                                            return (
                                                <PickerItemIOS
                                                    key={option}
                                                    value={option}
                                                    label={label}
                                                    />
                                            )
                                        })}
                                    </PickerIOS>
                                </View>

                            </View>
                        </View>
                    </Modal>
          )
      }
}


var styles = StyleSheet.create({
    basicContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer:{
        width:SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        padding:0,
        backgroundColor: '#F5FCFF',
    },
    buttonView:{
        width:SCREEN_WIDTH,
        padding: 8,
        borderTopWidth:0.5,
        borderTopColor:'lightgrey',
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    bottomPicker : {
        width:SCREEN_WIDTH,
    },
    mainBox: {
    }
});
