import React from 'react'
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import Animated from 'react-native-reanimated';

function TopTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', justifyContent: 'center'}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, {email: route.params.email});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
            <View style = {{height: 40, flex: 1, paddingLeft: 10, paddingRight: 10,justifyContent:'space-between', alignItems: 'center'}}>
                    <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityStates={isFocused ? ['selected'] : []}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flex: 1 }}
                >
                    <View style = {{
                        height: 40, 
                        width: 100, 
                        backgroundColor: isFocused?'#07E459':'white', 
                        borderWidth: 1, 
                        alignItems: 'center', 
                        paddingTop: 5,
                        borderColor: '#04FF2F'
                        }}>
                            <Text style={{ 
                        color: isFocused?'white':'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily:'Segoe UI'
                         }}>
                             {options.title}
                            </Text>
                    </View>
            
                </TouchableOpacity>
            </View>
           
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    buttom:{
        height: 40, 
        width: 100, 
        backgroundColor: 'red', 
        borderWidth: 1, 
        alignItems: 'center', 
        paddingTop: 5
    }
})

export default TopTabBar;