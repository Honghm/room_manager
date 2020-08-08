import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import ItemThongTin from './src/component/itemThongTin'
import LinearGradient from 'react-native-linear-gradient';
export default class App extends React.Component {
  render(){
    return(
      <LinearGradient 
      colors ={['#42AF3B','#17B6A0']} 
      style = {styles.linearGradient}
      start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}
       >
        <View style = {styles.container}>
          <ItemThongTin/>
        </View>
      </LinearGradient>
    );
  }
};


const styles = StyleSheet.create({
  linearGradient: {
    flex: 5,
  },
});