import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    Alert
} from 'react-native'

import ThongTin from './thongTin'

const dataThongTin = [
    {id: 0, iconLoai: '../../assets/image/icon-an-uong.png', tenLoai:'Ăn uống', noiDung: 'Đi chợ', giaTien: '100,000 vnđ'},
    {id: 1, iconLoai: '../../assets/image/icon-mua-sam.png', tenLoai:'Mua sắm', noiDung: 'Quạt', giaTien: '200,000 vnđ'},
    {id: 2, iconLoai: '../../assets/image/icon-suc-khoe.png', tenLoai:'Sức khỏe', noiDung: 'Thuốc ho', giaTien: '50,000 vnđ'},
]

export default function ItemThongTin(params) {
  
    return <View>
      <View style = {styles.item}>
              <View style = {{height: 130, justifyContent:'space-around'}}>
                <View style = {styles.date}>
                    <View style = {{width: 60, height: 30, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                        <Text style= {{fontSize: 12, fontFamily: 'Segoe UI'}}>Thứ </Text>
                        <Text style= {{fontSize: 25, fontFamily: 'Segoe UI', fontWeight: 'bold'}}>2</Text>
                    </View>
                    <Text style= {{fontSize: 12, fontFamily: 'Segoe UI'}}>3/8</Text>
                    <Text style= {{fontSize: 12, fontFamily: 'Segoe UI', paddingBottom: 3}}>2020</Text>
                </View>
              </View>
              <View style = {{display: 'flex', flexDirection: 'column'}}>
                <View style = {{display: 'flex', flexDirection: 'row'}}>
                    <View style ={{width: 90, alignItems: 'center'}}>
                        <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}} >Loại</Text>
                    </View>
                    <View style ={{width: 90,alignItems: 'center'}}>
                        <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}}>Nội dung</Text>
                    </View>
                    <View style ={{width: 90, alignItems: 'center'}}>
                        <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}}>Giá tiền</Text>
                    </View>
                </View>
                <View>
                    {dataThongTin.map(data =>(
                        <ThongTin key = {data.id} data = {data}/>
                    ))}
                </View>
              </View>
             
          </View>
</View>
}


const styles = StyleSheet.create({
    item:{
        height: 130,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor:'white',
        borderRadius: 20,
        padding: 5
    },
    date:{
        width: 60,
        height:60,
        backgroundColor:'white',
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center'
    }
  
});