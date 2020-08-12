import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';



KhoanChi = ()=><View style = {styles.center}>
    <Text style = {styles.tile}>Khoản chi nhóm</Text>
</View>

export default KhoanChi;

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