import React from 'react'
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import Klapz from './src/Components/modal'
const App = (porps) => {
  return (
    <View style={{flex:1}}>

      <Klapz 
        title={"Blog titie"}
        kalpz={2}
        key={"xyz"}
        AppName={"BlogShare"}
        preferredKlaps={""}

        onSucess={(su)=>{
          console.log(su);
        }}
        onError={(eu)=>{
          console.log(eu);
        }}
      />

    </View>
  )
}

export default App
