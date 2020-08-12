import * as React from 'react';
import { View, Text, StyleSheet, ScrollView,FlatList } from 'react-native';
import ListKhoanChi from '../component/listKhoanChi'

const  dataKhoanChi = [
    {id: 1, ngayMua: '03/08/2020', idData: 1},
    {id: 2, ngayMua: '04/08/2020', idData: 2},
    {id: 3, ngayMua: '19/08/2020', idData: 3},
    {id: 4, ngayMua: '09/08/2020', idData: 3}
]

KhoanChi = ()=> <FlatList 
data = {dataKhoanChi}
renderItem = {({item}) => <View style = {{paddingBottom: 10}}>
    <ListKhoanChi listData = {item}/>
    </View>}
keyExtractor = {item =>'${item.id}'}
contentContainerStyle = {{padding: 10}}
/>

export default KhoanChi;

