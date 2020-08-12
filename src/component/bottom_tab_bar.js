import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', height:60, justifyContent:'center', alignItems: 'center' }}>
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
         <View style = {{flex: 1, height: 60}}>
             {
                 (route.name =="tabCaNhan")? (<View style = {stytes.tabCaNhan}>
                     <TouchableOpacity onPress = {onPress}>
                         <View style = {stytes.icon}>
                            <Icon 
                            name="account" 
                            color= {!isFocused?'black':'red'} 
                            size= {30}
                            />
                         </View>
                     </TouchableOpacity>
                 </View>)
                 :((route.name =="tabThem")?(<View style = {stytes.tabThem}>
                      <TouchableOpacity onPress = {onPress}>
                      <View style = {{width: 50, height: 50, borderRadius: 25, backgroundColor:!isFocused?'#2CDC07':'#76E65E', alignItems: 'center', paddingTop: 4}}>
                      <Icon 
                            name="plus" 
                            color= {'white'} 
                            size= {40}
                            />
                      </View>
                      </TouchableOpacity>
                 </View>)
                 :(<View style = {stytes.tabNhom}>
                      <TouchableOpacity onPress = {onPress}>
                      <View style = {stytes.icon}>
                      <TouchableOpacity onPress = {onPress}>
                         <View style = {stytes.icon}>
                            <Icon 
                            name="account-multiple" 
                            color= {!isFocused?'black':'red'} 
                            size= {30}
                            />
                         </View>
                     </TouchableOpacity>
                      </View>
                      </TouchableOpacity>
                 </View>))
                 
             }
            
         </View>
        );
      })}
    </View>
  );
}

export default BottomTabBar;

const stytes = StyleSheet.create({
    tabCaNhan:{
        flex: 1, height: 50,  alignItems: 'center', marginTop: 10
    },
    tabThem:{
        flex: 1, height: 50, alignItems: 'center', marginTop: 5
    },
    tabNhom:{
        flex: 1, height: 50, alignItems: 'center', marginTop: 10
    }, 
    icon:{
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor:'white',
        alignItems: 'center',
        paddingTop: 3
    }
})