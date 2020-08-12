import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';



KhoanThu = ()=><View style = {styles.center}>
    <Text style = {styles.tile}>Khoản thu</Text>
</View>

export default KhoanThu;

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