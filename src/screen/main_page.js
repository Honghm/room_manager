import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {DrawerActions } from '@react-navigation/native';
import TabCaNhan from '../Tabs/tabCaNhan/tabCaNhan'
import TabNhom from '../Tabs/tabNhom/tabNhom'

import BottomTabBar from '../component/bottom_tab_bar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDrawer from 'react-native-side-drawer'
import {firebaseApp} from '../component/FirebaseConfig'
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: props.route.params.taikhoan,
    };
  }
  
  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  render(){
    return(
      <LinearGradient 
          colors ={['#42AF3B','#17B6A0']} 
          style = {{flex: 5,}}
          start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
            <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={50}
          animationTime={250}
          overlay={true}
          opacity={0.5}
        />
        <View style = {{flex: 1}}>
            <View style = {{flexDirection: 'row',
        height: 35,
        alignItems: 'center',
        padding: 5,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 0},}}>
              <View paddingLeft = {5}>
                  <TouchableOpacity onPress={this.toggleOpen}>
                    <Icon 
                      name="menu" 
                      color='black'
                      size={30}
                      />
                  </TouchableOpacity>
              </View>
              <Text style = {{   fontFamily: 'Segoe UI',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 30,
        color: 'white'}}>{this.props.route.state == null ?
             "QUẢN LÝ CHI TIÊU NHÓM"
             :((this.props.route.state.index != 0 ?
             "QUẢN LÝ CHI TIÊU NHÓM":"QUẢN LÝ CHI TIÊU NHÓM"))}</Text>
            </View>
         
            <View style = {{flex: 4 }}>
           <View style = {{flex: 1}}>
           <BottomTab.Navigator tabBar = {props =><BottomTabBar {...props}/>}>
                  {/* <BottomTab.Screen name = "tabCaNhan" component = {TabCaNhan} initialParams = {{email: this.state.email}}/> */}
                  <BottomTab.Screen name = "tabNhom" component = {TabNhom} initialParams = {{email: this.state.email}}/>
              </BottomTab.Navigator>
           </View>
            </View>
          
          </View>
         
    </LinearGradient>
      )
  }
};
const styles = StyleSheet.create({
  
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 0
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  }
})
