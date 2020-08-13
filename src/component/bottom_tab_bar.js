import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', height:40, justifyContent:'center', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
         <View style = {{flex: 1, height: 40}}>
             {
                 (route.name =="tabCaNhan")? (<View style = {stytes.tabIcon}>
                     <TouchableOpacity onPress = {onPress}>
                         <View style = {stytes.icon}>
                            <Icon 
                            name="account" 
                            color= {!isFocused?'black':'red'} 
                            size= {28}
                            />
                         </View>
                     </TouchableOpacity>
                 </View>)
                 :(<View style = {stytes.tabIcon}>
                  <TouchableOpacity onPress = {onPress}>
                     <View style = {stytes.icon}>
                        <Icon 
                        name="account-multiple" 
                        color= {!isFocused?'black':'red'} 
                        size= {28}
                        />
                     </View>
                 </TouchableOpacity>
             </View>)
             }
         </View>
        );
      })}
    </View>
  );
}

export default BottomTabBar;

const stytes = StyleSheet.create({
    tabIcon:{
        flex: 1, height: 40,  alignItems: 'center', marginTop: 5
    },
    icon:{
        width: 30, 
        height: 30,
        borderRadius: 15, 
        backgroundColor:'white',
        alignItems: 'center',
    }, 
  
})