import React from 'react';
import { Button, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, DrawerActions } from '@react-navigation/native';
import TabCaNhan from '../Tabs/tabCaNhan/tabCaNhan'
import TabNhom from '../Tabs/tabNhom/tabNhom'

import Tab3 from '../Tabs/tab3'
import {styles} from '../styles/styles'
import BottomTabBar from '../component/bottom_tab_bar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator();
let title;

export default class MainPage extends React.Component {

  
  render(){
    console.log(this.props);
    return(
      <LinearGradient 
          colors ={['#42AF3B','#17B6A0']} 
          style = {{flex: 5,}}
          start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
          <View style = {{flex: 1}}>
            <View style = {styles.app_bar}>
              <View paddingLeft = {5}>
              {createDrawer}
                  <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon 
                      name="menu" 
                      color='black'
                      size={30}
                      />
                  </TouchableOpacity>
              </View>
              <Text style = {styles.text_app_bar}>{this.props.route.state == null ?
             "QUẢN LÝ CHI TIÊU CÁ NHÂN"
             :((this.props.route.state.index != 0 ?
             "QUẢN LÝ CHI TIÊU NHÓM":"QUẢN LÝ CHI TIÊU CÁ NHÂN"))}</Text>
            </View>

            <View style = {{flex: 4,}}>
              <BottomTab.Navigator tabBar = {props =><BottomTabBar {...props}/>}>
                  <BottomTab.Screen name = "tabCaNhan" component = {TabCaNhan} />
                  <BottomTab.Screen name = "tabThem" component = {Tab3} />
                  <BottomTab.Screen name = "tabNhom" component = {TabNhom} />
              </BottomTab.Navigator>
            </View>
          
          </View>
         
    </LinearGradient>
      )
  }
};

// const styles = StyleSheet.create({
//     app_bar: {
//         flexDirection: 'row',
//         height: 35,
//         alignItems: 'center',
//         padding: 5,
//         shadowOpacity: 0.3,
//         shadowRadius: 10,
//         shadowOffset: {width: 0, height: 0}
//     },
//     text_app_bar:{
//         fontFamily: 'Segoe UI',
//         fontSize: 18,
//         fontWeight: 'bold',
//         paddingLeft: 30,
//         color: 'white'
//     },
//     image_app_bar:{
//         width: 25,
//         height: 35,
//     },
// })