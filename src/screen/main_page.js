import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {DrawerActions } from '@react-navigation/native';
import TabCaNhan from '../Tabs/tabCaNhan/tabCaNhan'
import TabNhom from '../Tabs/tabNhom/tabNhom'

import {styles} from '../styles/styles'
import BottomTabBar from '../component/bottom_tab_bar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator();


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
         
            <View style = {{flex: 4, }}>
           <View style = {{flex: 1,}}>
           <BottomTab.Navigator tabBar = {props =><BottomTabBar {...props}/>}>
                  <BottomTab.Screen name = "tabCaNhan" component = {TabCaNhan} />
                  <BottomTab.Screen name = "tabNhom" component = {TabNhom} />
              </BottomTab.Navigator>
           </View>
            </View>
          
          </View>
         
    </LinearGradient>
      )
  }
};

