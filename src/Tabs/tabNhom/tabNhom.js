import * as React from 'react';
import { View, StyleSheet, } from 'react-native';

import TongQuan from './layouts/tongQuan'
import KhoanChi from './layouts/khoanChi'
import ThongKe from './layouts/thongKe'

import TopTabBar from '../../component/top_tab_bar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

export default class TabNhom extends React.Component {
    render(){
        return(
            <View style= {{flex: 1, }}>
            <TopTab.Navigator tabBar={props => <TopTabBar {...props}/>} initialRouteName = "tabKhoanChi">
                <TopTab.Screen name = "tabTongQuan" component = {TongQuan} options = {{title: 'Tổng quan'}}/>
                <TopTab.Screen name = "tabKhoanChi" component = {KhoanChi} options = {{title: 'Khoản chi'}}/>
                <TopTab.Screen name = "tabThongKe" component = {ThongKe} options = {{title: 'Thống kê'}}/>
            </TopTab.Navigator>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    enter: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 10,
        backgroundColor: 'red', 
        flexDirection: "column"
    },
    tile:{
        fontFamily: 'Segoe UI', 
        fontSize: 36,
        marginBottom: 16
    },
})