import React, {useState, useRef} from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated, FlatList } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';



Tab3 = ()=>{
    const {width, height} = Dimensions.get('window')
   
    const _draggedValue = new Animated.Value(50);
   
    return(
        <View style = {{flex:1, alignItems:'center'}}>
            <SlidingUpPanel
            ref = {null}
            draggableRange = {{top: height - 300, bottom: 50}}
            animatedValue = {_draggedValue}
            backdropOpacity = {0}
            snappingPoints = {[0]}
            height = {500}
            friction = {0.9}
            containerStyle = {{width: width-20, marginLeft: 10, backgroundColor: 'red'}}
            >
                <View style = {{flex: 1, backgroundColor: '#0c0c0c0c',borderRadius: 24, padding:14}}>
                    <View style = {styles.PanelHandle}></View>
                </View>

            </SlidingUpPanel>
        </View>

    )
}
export default Tab3

const styles = StyleSheet.create({
    PanelHandle:{
        height: 5,
        width: 50,
        backgroundColor: '#666',
        borderRadius: 6,
        alignSelf:'center',
        margin: 6
    }
})
