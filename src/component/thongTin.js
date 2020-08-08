import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    Alert
} from 'react-native'


export default function ThongTin(props){
   var {data} = props;
    return  <View style = {styles.container}>
        <View style = {{flexDirection:'row'}}>
        <Image style = {{width: 20, height: 20}} source = {require(data.iconLoai)}></Image> 
        <Text style = {styles.text}>{data.tenLoai}</Text>
        </View>
        
        <Text style = {styles.text}>{data.noiDung}</Text>
        <Text style = {styles.text}>{data.giaTien}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 270, 
        height: 20, 
        backgroundColor: 'red', 
        display: 'flex', 
        flexDirection:'row',
        justifyContent:'space-between', 
        paddingRight: 10, 
        paddingLeft: 5
    },
    text: {
        fontSize: 14, 
        fontFamily: 'Segoe UI', 
        fontWeight: 'bold',
    }
}
);