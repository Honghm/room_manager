import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    ScrollView,
    Alert,
    FlatList
} from 'react-native'

import ItemKhoanChi from './itemKhoanChi'

const listKhoanChi1 = [
    {id: 1, iconLoai: '1', tenLoai:'Ăn uống', noiDung: 'Đi chợ', giaTien: 100000,},
    {id: 2, iconLoai: '2', tenLoai:'Mua sắm', noiDung: 'Quạt', giaTien: 200000},
    {id: 3, iconLoai: '3', tenLoai:'Sức khỏe', noiDung: 'Thuốc ho', giaTien: 50000},
   
]
const listKhoanChi2 = [
    {id: 1, iconLoai: '1', tenLoai:'Ăn uống', noiDung: 'Đi chợ', giaTien: 100000,},
    {id: 2, iconLoai: '2', tenLoai:'Mua sắm', noiDung: 'Quạt', giaTien: 200000},
    {id: 3, iconLoai: '4', tenLoai:'Khác', noiDung: 'Tiền trọ tháng 8', giaTien: 1200000},
   
]
const listKhoanChi3 = [
    {id: 1, iconLoai: '1', tenLoai:'Ăn uống', noiDung: 'Đi chợ', giaTien: 100000,},
    {id: 2, iconLoai: '2', tenLoai:'Mua sắm', noiDung: 'Quạt', giaTien: 200000},
    {id: 3, iconLoai: '4', tenLoai:'Khác', noiDung: 'Tiền trọ tháng 8', giaTien: 1200000},
    {id: 4, iconLoai: '2', tenLoai:'Mua sắm', noiDung: 'Quạt', giaTien: 200000},
   
]
var tongTien = 0;
var heightContainer;
var listKhoanChi = [];
var day_of_week;
export default function ListKhoanChi(params) {
    var {listData} = params;
    var dd = listData.ngayMua.slice(0,2);
    var mm = listData.ngayMua.slice(3,5);
    var yyyy = listData.ngayMua.slice(6,10);
    day_of_week = get_day(dd, mm, yyyy);
 
    switch (listData.idData) {
        case 1:
            listKhoanChi = listKhoanChi1;
            tongTien = 0;
            heightContainer = 60 + listKhoanChi.length*30;
            break;
        case 2:
            tongTien = 0;
            listKhoanChi = listKhoanChi2;
            heightContainer = 60 + listKhoanChi.length*30;
            break;
        case 3:
            tongTien = 0;
            listKhoanChi = listKhoanChi3;
            heightContainer = 60 + listKhoanChi.length*30;
            break;
        default:
    }
    listKhoanChi.map((data)=>{
        tongTien += data.giaTien;
    });
  
    return  <View style = {{height: heightContainer, 
        display: 'flex', flexDirection: 'row', 
        backgroundColor:'white',
        borderRadius: 20,
        padding: 5,
        flex: 10
        }}>
                  {/* ngày tháng */}
                <View style = {{height: heightContainer, justifyContent:'space-around', flex: 1}}>
                  <View style = {styles.date}>
                      <View style = {{width: 60, height: 30, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                       {
                          day_of_week == 'CN' ? <Text/> :<Text style= {{fontSize: 12, fontFamily: 'Segoe UI'}}> Thứ </Text>
                       } 
                     
                          <Text style= {{fontSize: 24, fontFamily: 'Segoe UI', fontWeight: 'bold'}}>{day_of_week}</Text>
                      </View>
                      <Text style= {{fontSize: 12, fontFamily: 'Segoe UI'}}>{dd}/{mm}</Text>
                      <Text style= {{fontSize: 12, fontFamily: 'Segoe UI', paddingBottom: 3}}>{yyyy}</Text>
                  </View>
                </View>
                
                <View style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 9}}>
       
                    {/* Tiêu đề */}
                  <View style = {{display: 'flex', flexDirection: 'row', flex: 1, paddingBottom: 10}}>
                      <View style ={{width: 90, alignItems: 'center' ,flex: 1}}>
                          <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}} >Loại</Text>
                      </View>
                      <View style ={{width: 90,alignItems: 'center', flex: 1}}>
                          <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}}>Nội dung</Text>
                      </View>
                      <View style ={{width: 90, alignItems: 'center', flex: 1}}>
                          <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',}}>Giá tiền</Text>
                      </View>
                  </View>
                  
                  {/* list Thông tin */}
                  <View style = {{flex: 8}}>
                  <View style = {{justifyContent: 'space-between', flex: 7}}>
                      {listKhoanChi.map(data =>(
                          <ItemKhoanChi key = {data.id} data = {data}/>
                      ))}
                     
                  </View>
                      <View style = {{flexDirection:'row', flex:1, paddingBottom: 10}}>
                          <View style = {{paddingLeft:20, paddingRight: 20}}>
                              <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold',color: 'red'}}>TỔNG CHI: {tongTien} vnđ</Text>
                          </View>
                          <TouchableOpacity>
                              <Text style = {{fontSize: 14, fontFamily: 'Segoe UI', fontWeight: 'bold', color: '#054FFC', textDecorationLine:'underline'}}>Xem chi tiết</Text>
                          </TouchableOpacity>
                      
                      </View>
                  </View>
                
                </View>
               
            </View>
  
}


const styles = StyleSheet.create({
    item:{
        height: heightContainer,
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
    },
   
});

function get_day(dd, mm, yyyy) {
    var JMD = Math.round((Number(dd)  + ((153 * (Number(mm) + 12 * ((14 - Number(mm)) / 12) - 3) + 2) / 5) +
    (365 * (Number(yyyy) + 4800 - ((14 - Number(mm)) / 12))) +
    ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 4) - 
   ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 100) + 
   ((Number(yyyy) + 4800 - ((14 - Number(mm)) / 12)) / 400)  - 32045) % 7);
   switch (JMD) {
    case 0:
        return 'CN';
     case 1:
        return '2';
     case 2:
        return '3';
     case 3:
        return '4';
     case 4:
        return '5';
     case 5:
        return '6';
     case 6:
        return '7';
    }
     
}