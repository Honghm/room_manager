import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class TongQuan extends React.Component {
    render(){
        return(
            <View style = {{flex: 1}}>
                <Text>Tổng quan nhóm</Text>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    enter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'red'
    },
    tile:{
        fontFamily: 'Segoe UI', 
        fontSize: 36,
        marginBottom: 16
    },
})