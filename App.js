import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainPage from './src/screen/main_page';
import LoginPage from './src/screen/login_page'
import { LogBox } from 'react-native';
import SplashPage from './src/screen/splash_page'
LogBox.ignoreLogs(['Remote debugger'])
LogBox.ignoreLogs(['Setting a timer'])
console.disableYellowBox = true;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




export default class App extends React.Component {
  render(){
    createHomeStack = () =>
    <Stack.Navigator>
        <Stack.Screen name = "SplashPage" component = {SplashPage}  options={() => ({
         header: ({ scene}) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
            },
        })}
       />
       <Stack.Screen name = "LoginPage" component = {LoginPage}  options={() => ({
         header: ({ scene}) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
            },
        })}
       />
       <Stack.Screen name = "MainPage" component = {MainPage}  options={() => ({
         header: ({ scene}) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
            },
        })}
       />
     
      <Stack.Screen name = "Drawer" children = {createDrawer}  options={() => ({
         header: ({ scene, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;
            },
        })}/>      
      
    </Stack.Navigator>

    createDrawer = (props) =>{
      return   <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent  {...props} />} initialRouteName = 'MainPage'>
      <Drawer.Screen name = "MainPage" component = {MainPage} options = {{title: 'Trang chủ'}} />
    </Drawer.Navigator>
    }
  
    return(
        <NavigationContainer>
         {createHomeStack()}
        </NavigationContainer>
     
    );
  }
}

