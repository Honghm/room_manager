import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import TabNhom from '../Tabs/tabNhom/tabNhom'

import BottomTabBar from '../component/bottom_tab_bar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDrawer from 'react-native-side-drawer'
import AsyncStorage from '@react-native-community/async-storage';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
const BottomTab = createBottomTabNavigator();
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: props.route.params.taikhoan,
    };
  }

  drawerContent = (props) => {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Minh Hồng</Title>
                              <Caption style={styles.caption}>{this.state.email}</Caption>
                            </View>
                            <TouchableOpacity
                            style = {{marginRight: 5}}
                            onPress = {()=>this.toggleOpen()}

                            >
                              <Icon
                              name = "backspace"
                              color = "red"
                              size = {20}
                              />
                            </TouchableOpacity>
                        </View>
                    </View>
                <Drawer.Section style={styles.drawerSection}>
                <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="account-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Trang cá nhân"
                        onPress={() => {}}
                    />
                <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="bookmark-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Nhóm của bạn"
                        onPress={() => {}}
                    />
                 <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="account-check-outline" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Trợ giúp"
                        onPress={() => {}}
                    />
            </Drawer.Section>
            <Drawer.Section title="Giao diện">
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.preference}>
                            <Text>Màu tối</Text>
                            <View pointerEvents="none">
                                <Switch value={0}/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Đăng Xuất"
                onPress={() => {this.dangXuat(props)}}
            />
        </Drawer.Section>
      
        </View>
     
    );
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
 dangXuat = async (props)=>{
  try {
    await AsyncStorage.setItem('@TK:tk', '')
    await AsyncStorage.setItem('@MK:mk', '')
    props.navigation.navigate('LoginPage');
  } catch (e) {
      console.log(e);
    // saving error
  }

 }
  render(){
    return(
      <LinearGradient 
          colors ={['#42AF3B','#17B6A0']} 
          style = {{flex: 5,}}
          start={{x: 2.0, y: 0.25}} end={{x: 1, y: 1.0}}>
            <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent(this.props)}
          drawerPercentage={70}
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
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    fontFamily: 'Segoe UI', 
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Segoe UI', 
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    fontFamily: 'Segoe UI', 
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
